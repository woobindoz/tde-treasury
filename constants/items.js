const itemCodeToNameEntries = [
  ['01', 'Thread'],
  ['02', 'Stick'],
  ['03', 'Pelt'],
  ['04', 'Bone'],
  ['05', 'Coal'],
  ['06', 'Charcoal'],
  ['07', 'Powder'],
  ['08', 'Iron ore'],
  ['09', 'Cloth'],
  ['10', 'Silver ore'],
  ['13', 'Magic stone'],
  ['14', 'Wooden shaft'],
  ['15', 'Sapphire'],
  ['16', 'Solvent'],
  ['17', 'Ruby'],
  ['18', 'Hardener'],
  ['19', 'Steel'],
  ['20', 'Leather'],
  ['21', 'Bone powder'],
  ['22', 'String'],
  ['23', 'Coke'],
  ['24', 'Purified powder'],
  ['25', 'Silver alloy'],
  ['27', 'Steel mold'],
  ['28', 'Silver mold'],
  ['31', 'Rope'],
  ['33', 'Metal plate'],
  ['34', 'Metallic fiber'],
  ['35', 'Crafted leather'],
  ['39', 'Stinky Sumac'],
  ['40', 'Mercy Sassafras'],
  ['41', 'Cliff Rue'],
  ['42', 'Love Creeper'],
  ['43', 'Wolf Root'],
  ['44', 'Swamp Lavender'],
  ['45', 'White Blossom'],
  ['46', 'Ilaves'],
  ['47', 'Ephijora'],
  ['48', 'Storm Hyssop'],
  ['49', 'Cave Garlic'],
  ['50', 'Yellow Seed'],
  ['51', 'Tecceagrass'],
  ['52', 'Spring Bay Leaf'],
  ['53', 'Ash Rosemary'],
  ['54', 'Sanguine Parsley'],
  ['55', 'Sun Tarragon'],
  ['56', 'Maccunut'],
  ['57', 'Dragon Seed'],
  ['58', 'Queen\'s Pepper'],
  ['59', 'Plasma of abyss'],
  ['60', 'Ultramarine dust'],
  ['61', 'Ethereal bone'],
  ['62', 'Itacory'],
  ['63', 'Assassin Vine'],
  ['64', 'Kloliarway'],
  ['100', 'Pouch of gold'],
  ['501', 'Wrapping'],
  ['505', 'Wooden arrows pack'],
  ['506', 'Bottle of Remedy'],
  ['508', 'Bottle of Poison'],

  ['a01', 'Cloth jacket'],
  ['a02', 'Leather shirt'],
  ['a03', 'Chain mail'],
  ['a04', 'Silver cuirass'],
  ['a05', 'Mithril armor'],
  ['a06', 'Hat'],
  ['a07', 'Leather hood'],
  ['a08', 'Steel helmet'],
  ['a09', 'Silver helmet'],
  ['a10', 'Mithril helmet'],
  ['a11', 'Sandals'],
  ['a12', 'Leather shoes'],
  ['a13', 'Steel boots'],
  ['a14', 'Silver boots'],
  ['a15', 'Mithril boots'],
  ['a16', 'Gloves'],
  ['a17', 'Leather gloves'],
  ['a18', 'Steel gauntlets'],
  ['a19', 'Silver gauntlets'],
  ['a20', 'Mithril gauntlets'],
  ['a21', 'Wooden shield'],
  ['a22', 'Skeleton Buckler'],
  ['a23', 'Bronze shield'],
  ['a24', 'Silver shield'],
  ['a25', 'Mithril shield'],

  ['k01', 'Champion blade'],
  ['k02', 'Trident blade'],
  ['k04', 'War hammer head'],
  ['k05', 'Hunter blade'],
  ['k06', 'Order Armor piece'],
  ['k07', 'Order Helmet fragment'],
  ['k08', 'Order Boots part'],
  ['k09', 'Order Gauntlets part'],
  ['k10', 'Order shield part'],
  ['k11', 'Hunter Armor part'],
  ['k12', 'Hunter Helmet fragment'],
  ['k15', 'Clarity Robe piece'],
  ['k16', 'Clarity Circlet fragment'],
  ['k17', 'Clarity Shoes part'],
  ['k18', 'Clarity Bracers part'],

  ['p01', 'Vial of Rage'],
  ['p02', 'Potion of Rage'],
  ['p03', 'Bottle of Rage'],
  ['p04', 'Vial of Peace'],
  ['p05', 'Potion of Peace'],
  ['p06', 'Bottle of Peace'],
  ['p07', 'Vial of Greed'],
  ['p08', 'Potion of Greed'],
  ['p09', 'Bottle of Greed'],
  ['p10', 'Vial of Nature'],
  ['p11', 'Potion of Nature'],
  ['p12', 'Bottle of Nature'],
  ['p13', 'Vial of Mana'],
  ['p14', 'Potion of Mana'],
  ['p15', 'Bottle of Mana'],
  ['p16', 'Vial of Twilight'],
  ['p17', 'Potion of Twilight'],
  ['p18', 'Bottle of Twilight'],
  ['p19', 'Vial of Morph'],
  ['p20', 'Potion of Morph'],
  ['p21', 'Bottle of Morph'],
  ['pl1', 'Vial of Oblivion'],
  ['pl3', 'Bottle of Oblivion'],

  ['r01', 'Champion Sword recipe'],
  ['r02', 'Trident recipe'],
  ['r04', 'War hammer recipe'],
  ['r05', 'Hunter Dagger recipe'],
  ['r06', 'Order Armor recipe'],
  ['r07', 'Order Helmet recipe'],
  ['r08', 'Order Boots recipe'],
  ['r09', 'Order Gauntlets recipe'],
  ['r10', 'Order shield recipe'],
  ['r11', 'Hunter Armor recipe'],
  ['r12', 'Hunter Helmet recipe'],
  ['r15', 'Clarity Robe recipe'],
  ['r16', 'Clarity Circlet recipe'],
  ['r17', 'Clarity Shoes recipe'],
  ['r18', 'Clarity Bracers recipe'],

  ['s01', '📕Scroll of Rage'],
  ['s02', '📕Scroll of Peace'],
  ['s03', '📗Scroll of Rage'],
  ['s04', '📗Scroll of Peace'],
  ['er', 'Elder\'s recommendation'],
  ['pol', 'Proof of Loyalty'],
  ['tch', 'Torch'],
  ['tlt', 'Loyalty Trophy'],

  ['w01', 'Wooden sword'],
  ['w02', 'Short sword'],
  ['w03', 'Long sword'],
  ['w04', 'Widow sword'],
  ['w05', 'Knight\'s sword'],
  ['w06', 'Elven sword'],
  ['w07', 'Rapier'],
  ['w08', 'Short spear'],
  ['w09', 'Long spear'],
  ['w10', 'Lance'],
  ['w11', 'Elven spear'], 
  ['w12', 'Halberd'],
  ['w13', 'Kitchen knife'],
  ['w14', 'Battle knife'],
  ['w15', 'Steel dagger'],
  ['w16', 'Silver dagger'],
  ['w17', 'Mithril dagger'], 
  ['w18', 'Short Bow'],
  ['w19', 'Wooden Bow'],
  ['w20', 'Long Bow'],
  ['w21', 'Elven Bow'], 
  ['w22', 'Forest Bow'],
  ['w23', 'Club'],
  ['w24', 'Bone club'],
  ['w25', 'Heavy club'],
  ['w26', 'Steel axe'],
  ['w27', 'Mithril axe'], 
  ['w32', 'Hunter dagger']
];

module.exports = itemCodeToNameEntries;