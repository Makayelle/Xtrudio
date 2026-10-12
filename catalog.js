// ══════════════════════════════════════════════════════
// Xtrudio — Catalogue filaments Bambu Lab + liens store officiels
// Mettre à jour cette ligne quand le catalogue évolue :
const CATALOG_UPDATED = '2026-10-12';

const STORE = {
  'PLA Basic':       'https://eu.store.bambulab.com/products/pla-basic-filament',
  'PLA Matte':       'https://eu.store.bambulab.com/products/pla-matte',
  'PLA HF':          'https://eu.store.bambulab.com/products/pla-hf',
  'PLA Silk':        'https://eu.store.bambulab.com/products/pla-silk-dual-color',
  'PLA Sparkle':     'https://eu.store.bambulab.com/products/pla-sparkle',
  'PLA Tough+':      'https://eu.store.bambulab.com/products/pla-tough',
  'PLA Translucent': 'https://eu.store.bambulab.com/products/pla-translucent',
  'PLA-CF':          'https://eu.store.bambulab.com/products/pla-cf',
  'PETG Basic':      'https://eu.store.bambulab.com/products/petg-basic-filament',
  'PETG HF':         'https://eu.store.bambulab.com/products/petg-hf',
  'PETG-CF':         'https://eu.store.bambulab.com/products/petg-cf',
  'ASA':             'https://eu.store.bambulab.com/products/asa-filament',
  'ASA Aero':        'https://eu.store.bambulab.com/products/asa-filament',
  'ASA-CF':          'https://eu.store.bambulab.com/products/asa-cf',
  'TPU 95A HF':      'https://eu.store.bambulab.com/products/tpu-95a-hf',
  'TPU 90A':         'https://eu.store.bambulab.com/products/tpu-for-ams',
};

// ─── CATALOG ─────────────────────────────────────────
const CATALOG = [
  { mat:'PLA', color:'#c8f03a', subtypes:[
    { name:'PLA Basic', colors:[
      {n:'Jade White',hex:'#FFFFFF'},{n:'Light Gray',hex:'#D1D3D5'},{n:'Gray',hex:'#8E9089'},
      {n:'Dark Gray',hex:'#545454'},{n:'Blue Grey',hex:'#5B6579'},{n:'Silver',hex:'#A6A9AA'},
      {n:'Black',hex:'#000000'},{n:'Red',hex:'#C12E1F'},{n:'Maroon Red',hex:'#9D2235'},
      {n:'Hot Pink',hex:'#F5547C'},{n:'Pink',hex:'#F55A74'},{n:'Magenta',hex:'#EC008C'},
      {n:'Orange',hex:'#FF6A13'},{n:'Pumpkin Orange',hex:'#FF9016'},{n:'Yellow',hex:'#F4EE2A'},
      {n:'Sunflower Yellow',hex:'#FEC600'},{n:'Gold',hex:'#E4BD68'},{n:'Beige',hex:'#F7E6DE'},
      {n:'Bambu Green',hex:'#00AE42'},{n:'Mistletoe Green',hex:'#3F8E43'},{n:'Bright Green',hex:'#BECF00'},
      {n:'Turquoise',hex:'#00B1B7'},{n:'Cyan',hex:'#0086D6'},{n:'Cobalt Blue',hex:'#0056B8'},
      {n:'Blue',hex:'#0A2989'},{n:'Indigo Purple',hex:'#482960'},{n:'Purple',hex:'#5E43B7'},
      {n:'Brown',hex:'#9D432C'},{n:'Cocoa Brown',hex:'#6F5034'},{n:'Bronze',hex:'#847D48'},
    ]},
    { name:'PLA Matte', colors:[
      {n:'Ivory White',hex:'#FFFFFF'},{n:'Bone White',hex:'#CBC6B8'},{n:'Ash Gray',hex:'#9B9EA0'},
      {n:'Nardo Gray',hex:'#757575'},{n:'Charcoal',hex:'#000000'},{n:'Scarlet Red',hex:'#DE4343'},
      {n:'Dark Red',hex:'#BB3D43'},{n:'Plum',hex:'#950051'},{n:'Sakura Pink',hex:'#E8AFCF'},
      {n:'Lilac Purple',hex:'#AE96D4'},{n:'Mandarin Orange',hex:'#F99963'},{n:'Lemon Yellow',hex:'#F7D959'},
      {n:'Desert Tan',hex:'#E8DBB7'},{n:'Latte Brown',hex:'#D3B7A7'},{n:'Caramel',hex:'#AE835B'},
      {n:'Terracotta',hex:'#B15533'},{n:'Dark Brown',hex:'#7D6556'},{n:'Dark Chocolate',hex:'#4D3324'},
      {n:'Dark Green',hex:'#68724D'},{n:'Grass Green',hex:'#61C680'},{n:'Apple Green',hex:'#C2E189'},
      {n:'Ice Blue',hex:'#A3D8E1'},{n:'Sky Blue',hex:'#56B7E6'},{n:'Marine Blue',hex:'#0078BF'},
      {n:'Dark Blue',hex:'#042F56'},
    ]},
    { name:'PLA HF', note:'High Flow', colors:[
      {n:'Jade White',hex:'#FFFFFF'},{n:'Gray',hex:'#8E9089'},{n:'Black',hex:'#000000'},
      {n:'Red',hex:'#C12E1F'},{n:'Yellow',hex:'#F4EE2A'},{n:'Bambu Green',hex:'#00AE42'},
      {n:'Cyan',hex:'#0086D6'},{n:'Blue',hex:'#0A2989'},
    ]},
    { name:'PLA Silk', note:'Finition nacrée brillante', colors:[
      {n:'Onyx Black',hex:'#1a1a1a',f:'metallic'},{n:'Diamond White',hex:'#E8E8E8',f:'metallic'},
      {n:'Silver',hex:'#B0B0B0',f:'metallic'},{n:'Gold',hex:'#D4A017',f:'metallic'},
      {n:'Rose Gold',hex:'#C49070',f:'metallic'},{n:'Scarlet Red',hex:'#CC2200',f:'metallic'},
      {n:'Galaxy Purple',hex:'#6030B0',f:'metallic'},{n:'Peacock Blue',hex:'#006080',f:'metallic'},
      {n:'Emerald Green',hex:'#007050',f:'metallic'},{n:'Champagne',hex:'#D0C060',f:'metallic'},
      {n:'Copper',hex:'#B06030',f:'metallic'},
    ]},
    { name:'PLA Sparkle', note:'Paillettes', colors:[
      {n:'Onyx Black',hex:'#222222'},{n:'Diamond White',hex:'#EEEEEE'},{n:'Ruby Red',hex:'#CC1122'},
      {n:'Sapphire Blue',hex:'#003399'},{n:'Emerald Green',hex:'#006633'},{n:'Amethyst Purple',hex:'#7722AA'},
    ]},
    { name:'PLA Tough+', note:'+20% résistance', colors:[
      {n:'White',hex:'#FFFFFF'},{n:'Gray',hex:'#AFB1AE'},{n:'Silver',hex:'#959698'},{n:'Black',hex:'#000000'},
    ]},
    { name:'PLA Translucent', note:'Semi-transparent', colors:[
      {n:'Teal',hex:'#009FA1',f:'t'},{n:'Light Jade',hex:'#96D8AF',f:'t'},{n:'Blue',hex:'#0047BB',f:'t'},
      {n:'Mellow Yellow',hex:'#F5DBAB',f:'t'},{n:'Purple',hex:'#7B4F9E',f:'t'},
      {n:'Pink',hex:'#F2AAAA',f:'t'},{n:'Clear',hex:'#F0F0F0',f:'t'},
    ]},
  ]},
  { mat:'PLA-CF', color:'#9698b8', subtypes:[
    { name:'PLA-CF', note:'Fibre carbone — buse acier trempé obligatoire', colors:[
      {n:'Burgundy Red',hex:'#951e23'},{n:'Iris Purple',hex:'#69398E'},{n:'Matcha Green',hex:'#5c9748'},
      {n:'Jeans Blue',hex:'#6e88bc'},{n:'Royal Blue',hex:'#2842AD'},{n:'Lava Gray',hex:'#4d5054'},
      {n:'Black',hex:'#000000'},
    ]},
  ]},
  { mat:'PETG', color:'#ff9d4d', subtypes:[
    { name:'PETG Basic', colors:[
      {n:'White',hex:'#FFFFFF'},{n:'Gray',hex:'#7F7E83'},{n:'Black',hex:'#000000'},
      {n:'Red',hex:'#D6001C'},{n:'Yellow',hex:'#FCE300'},{n:'Reflex Blue',hex:'#001489'},
      {n:'Dark Brown',hex:'#4F2C1D'},
    ]},
    { name:'PETG HF', note:'High Flow — 2× plus rapide', colors:[
      {n:'White',hex:'#FFFFFF'},{n:'Cream',hex:'#F9DFB9'},{n:'Gray',hex:'#ADB1B2'},
      {n:'Dark Gray',hex:'#515151'},{n:'Black',hex:'#000000'},{n:'Red',hex:'#EB3A3A'},
      {n:'Orange',hex:'#F75403'},{n:'Yellow',hex:'#FFD00B'},{n:'Peanut Brown',hex:'#875718'},
      {n:'Green',hex:'#00AE42'},{n:'Lime Green',hex:'#6EE53C'},{n:'Forest Green',hex:'#39541A'},
      {n:'Blue',hex:'#002E96'},{n:'Lake Blue',hex:'#1F79E5'},
    ]},
    { name:'PETG-CF', note:'Renforcé fibre de carbone', colors:[
      {n:'Brick Red',hex:'#9f332a'},{n:'Violet Purple',hex:'#583061'},{n:'Indigo Blue',hex:'#324585'},
      {n:'Malachite Green',hex:'#16b08e'},{n:'Titan Gray',hex:'#6a6a6a'},{n:'Black',hex:'#000000'},
    ]},
  ]},
  { mat:'ASA', color:'#3af0c8', subtypes:[
    { name:'ASA', note:'UV & intempéries — usage extérieur', colors:[
      {n:'White',hex:'#FFFFFF'},{n:'Gray',hex:'#7F7E83'},{n:'Black',hex:'#000000'},
      {n:'Red',hex:'#C12E1F'},{n:'Green',hex:'#00AE42'},{n:'Blue',hex:'#0A2989'},
    ]},
    { name:'ASA Aero', note:'Auto-moussant, allégé', colors:[
      {n:'White',hex:'#F0F0F0'},
    ]},
    { name:'ASA-CF', note:'Fibre carbone + UV', colors:[
      {n:'Black',hex:'#1a1a1a'},{n:'Gray',hex:'#555555'},
    ]},
  ]},
  { mat:'TPU', color:'#b06bff', subtypes:[
    { name:'TPU 95A HF', note:'Flexible — 3× plus rapide · Non compatible AMS', colors:[
      {n:'White',hex:'#FFFFEE'},{n:'Gray',hex:'#9EA2A2'},{n:'Black',hex:'#000000'},
      {n:'Red',hex:'#EB3A3A'},{n:'Yellow',hex:'#FFD00B'},{n:'Blue',hex:'#002E96'},
    ]},
    { name:'TPU 90A', note:'Pour AMS — très flexible', colors:[
      {n:'White',hex:'#FFFFEE'},{n:'Black',hex:'#000000'},{n:'Grape Jelly',hex:'#D6ABFF'},
      {n:'Crystal Blue',hex:'#7EB4E1'},{n:'Cocoa Brown',hex:'#5C4738'},{n:'Quicksilver',hex:'#9EA2A2'},
    ]},
  ]},
];
