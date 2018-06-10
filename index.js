const { isEmpty, isNil } = require('lodash');
const { map, filter } = require('rxjs/operators');
const DatabaseService = require('./services/database');
const TelegramService = require('./services/telegram');
const Item = require('./models/item');

const commonPoolId = 0;
const itemCodeToNameMap = new Map(require('./constants/items'));

const databaseService = new DatabaseService();
const telegramService = new TelegramService();

const sendTelegramMessage = async (chatId, text) => {
  const message = { chat_id: chatId, text };
  return telegramService.sendMessage({ message });
};

const telegramMessageSubject = telegramService.getMessageSubject();
const relevantMessages = telegramMessageSubject.pipe(
  map((request) => {
    const update = request.body;
    const { message } = update;
    return message;
  }),
  filter((message) => {
    const { forward_date, forward_from, from, chat, text } = message;
    return !isEmpty(text);
  })
);

const warehouseUpdates = relevantMessages.pipe(
  filter((message) => {
    const { forward_date, forward_from, from, chat, text } = message;
    return !isNil(forward_from) && text.startsWith("Guild Warehouse:\n");
  }),
  filter((message) => {
    const { forward_date, forward_from, from, chat, text } = message;
    const { is_bot, username } = forward_from;
    return is_bot && !isNil(username) && username === 'chtwrsbot';
  }),
  map((message) => {
    const { forward_date, forward_from, from, chat, text } = message;
    const stockStatuses = text.split("\n").slice(1);

    const stockRegex = /(.+?) (.+?) x (\d+)/;
    return stockStatuses
    .map((stockStatus) => stockStatus.match(stockRegex))
    .filter((stockMatches) => !isNil(stockMatches));
  })
);

const summaryRequests = relevantMessages.pipe(
  filter((message) => {
    const { forward_date, forward_from, from, chat, text } = message;
    return text.startsWith('/summary ') && !isNil(from);
  })
);

const updateRequests = relevantMessages.pipe(
  filter((message) => {
    const { forward_date, forward_from, from, chat, text } = message;
    const isValidCommand = text.startsWith('/g_deposit ') || text.startsWith('/g_withdraw ')
    return !isNil(from) && isValidCommand;
  })
);

warehouseUpdates.subscribe(async (matches) => {
  matches.forEach(async (match) => {
    const [stockStatus, itemCode, itemName, quantity, ...rest] = match;
    const ownedQuantity = await Item.countQuantity((builder) => {
      return builder.where('itemCode', itemCode).andWhere('telegramId', '!=', commonPoolId);
    });

    const commonQuantity = quantity - ownedQuantity;
    const commonItemEntry = await Item.fetchOrCreate(itemCode, commonPoolId);
    await commonItemEntry.patch({ quantity: commonQuantity });
  });
  sendTelegramMessage(chat.id, 'Updated guild warehouse state!');
});

summaryRequests.subscribe(async (message) => {
  const { forward_date, forward_from, from, chat, text } = message;

  const summaryRegex = /^\/summary (.+)$/;
  const [request, searchTerm, ...rest] = text.match(summaryRegex);

  const isExact = itemCodeToNameMap.has(searchTerm);
  const itemCodes = isExact ? [searchTerm] : [...itemCodeToNameMap.entries()].filter(([itemCode, itemName]) => itemName.toLowerCase().includes(searchTerm.toLowerCase())).map(([itemCode, itemName]) => itemName);
  const summaryLines = await Promise.all(itemCodes.map(async (itemCode) => {
    const personalCount = await Item.countQuantity((builder) => {
      return builder.where('itemCode', itemCode).andWhere('telegramId', from.id);
    });
    const commonCount = await Item.countQuantity((builder) => {
      return builder.where('itemCode', itemCode).andWhere('telegramId', commonPoolId);
    });
    return `${itemCodeToNameMap.get(itemCode)}: ${personalCount} personal, ${commonCount} common`;
  }));
  const summaryText = summaryLines.join('\n');
  sendTelegramMessage(chat.id, summaryText);
});

updateRequests.subscribe(async (message) => {
  const { forward_date, forward_from, from, chat, text } = message;

  const commandRegex = /^\/g_(deposit|withdraw) (.+?) (\d+)$/;
  const [request, action, itemCode, quantityText, ...rest] = text.match(commandRegex);
  const multiplier = action === 'deposit' ? 1 : -1;

  const itemName = itemCodeToNameMap.has(itemCode) ? itemCodeToNameMap.get(itemCode) : `Mystery Item ${itemCode}`;
  const quantity = parseInt(quantityText);

  const personalItemEntry = await Item.fetchOrCreate(itemCode, from.id);
  const commonItemEntry = await Item.fetchOrCreate(itemCode, commonPoolId);

  const availableQuantity = personalItemEntry.quantity + commonItemEntry.quantity;
  const finalQuantity = availableQuantity + quantity;
  if (finalQuantity < 0) {
    const updateText = `Can only withdraw up to ${availableQuantity} ${itemName}:
Personal: ${personalItemEntry.quantity} ${itemName}
Common: ${commonItemEntry.quantity} ${itemName}`;
    sendTelegramMessage(chat.id, updateText);
    return;
  }

  const newPersonalQuantity = Math.max(personalItemEntry.quantity + quantity, 0);
  const newCommonQuantity = commonItemEntry.quantity + Math.min(personalItemEntry.quantity + quantity, 0);
  const newPersonalItemEntry = await personalItemEntry.patch({ quantity: newPersonalQuantity });
  const newCommonItemEntry = await commonItemEntry.patch({ quantity: newCommonQuantity });

  const updateText = `Processed ${quantity > 0 ? 'deposit' : 'withdrawal'} for ${Math.abs(quantity)} ${itemName}.
Personal: ${newPersonalItemEntry.quantity} (${newPersonalItemEntry.quantity < personalItemEntry.quantity ? '-' : '+'}${Math.abs(newPersonalItemEntry.quantity - personalItemEntry.quantity)})
Common: ${newCommonItemEntry.quantity} (${newCommonItemEntry.quantity < commonItemEntry.quantity ? '-' : '+'}${Math.abs(newCommonItemEntry.quantity - commonItemEntry.quantity)})`;
  sendTelegramMessage(chat.id, updateText);
});

