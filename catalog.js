// ══════════════════════════════════════════════════════
// Xtrudio — Catalogue filaments Bambu Lab + liens store officiels
// Mettre à jour cette ligne quand le catalogue évolue :
const CATALOG_UPDATED = '2026-10-17';

const STORE = {
  'PLA Basic': 'https://eu.store.bambulab.com/products/pla-basic-filament',
  'PLA Matte': 'https://eu.store.bambulab.com/products/pla-matte',
  'PLA HF': 'https://eu.store.bambulab.com/products/pla-hf',
  'PLA Silk': 'https://eu.store.bambulab.com/products/pla-silk-dual-color',
  'PLA Sparkle': 'https://eu.store.bambulab.com/products/pla-sparkle',
  'PLA Tough+': 'https://eu.store.bambulab.com/products/pla-tough',
  'PLA Translucent': 'https://eu.store.bambulab.com/products/pla-translucent',
  'PLA-CF': 'https://eu.store.bambulab.com/products/pla-cf',
  'PETG Basic': 'https://eu.store.bambulab.com/products/petg-basic-filament',
  'PETG HF': 'https://eu.store.bambulab.com/products/petg-hf',
  'PETG-CF': 'https://eu.store.bambulab.com/products/petg-cf',
  'ASA': 'https://eu.store.bambulab.com/products/asa-filament',
  'ASA Aero': 'https://eu.store.bambulab.com/products/asa-aero',
  'ASA-CF': 'https://eu.store.bambulab.com/products/asa-cf',
  'TPU 95A HF': 'https://eu.store.bambulab.com/products/tpu-95a-hf',
  'TPU 90A': 'https://eu.store.bambulab.com/products/tpu-for-ams',
  'PLA Silk+': 'https://eu.store.bambulab.com/search?q=PLA%20Silk%2B',
  'PLA Marble': 'https://eu.store.bambulab.com/search?q=PLA%20Marble',
  'PLA Tough': 'https://eu.store.bambulab.com/search?q=PLA%20Tough',
  'PLA Aero': 'https://eu.store.bambulab.com/search?q=PLA%20Aero',
  'PLA Glow': 'https://eu.store.bambulab.com/search?q=PLA%20Glow',
  'PLA Dynamic': 'https://eu.store.bambulab.com/search?q=PLA%20Dynamic',
  'PLA Galaxy': 'https://eu.store.bambulab.com/search?q=PLA%20Galaxy',
  'PLA Wood': 'https://eu.store.bambulab.com/search?q=PLA%20Wood',
  'PETG Translucent': 'https://eu.store.bambulab.com/search?q=PETG%20Translucent',
  'TPU 95A': 'https://eu.store.bambulab.com/search?q=TPU%2095A',
  'TPU for AMS': 'https://eu.store.bambulab.com/search?q=TPU%20for%20AMS',
  'PLA Lite': 'https://eu.store.bambulab.com/search?q=PLA%20Lite',
  'TPU 85A': 'https://eu.store.bambulab.com/search?q=TPU%2085A',
  'PLA Metal': 'https://eu.store.bambulab.com/search?q=PLA%20Metal',
  'PLA Pure': 'https://eu.store.bambulab.com/search?q=PLA%20Pure',
  'PETG Matte': 'https://eu.store.bambulab.com/search?q=PETG%20Matte',
  'ABS': 'https://eu.store.bambulab.com/search?q=ABS',
  'ABS-GF': 'https://eu.store.bambulab.com/search?q=ABS-GF',
  'PC': 'https://eu.store.bambulab.com/search?q=PC',
  'PC FR': 'https://eu.store.bambulab.com/search?q=PC%20FR',
  'PAHT-CF': 'https://eu.store.bambulab.com/search?q=PAHT-CF',
  'PA6-CF': 'https://eu.store.bambulab.com/search?q=PA6-CF',
  'PPA-CF': 'https://eu.store.bambulab.com/search?q=PPA-CF',
  'PA6-GF': 'https://eu.store.bambulab.com/search?q=PA6-GF',
  'Support for PA/PET': 'https://eu.store.bambulab.com/search?q=Support%20for%20PA%2FPET',
  'PVA': 'https://eu.store.bambulab.com/search?q=PVA',
  'Support for PLA/PETG': 'https://eu.store.bambulab.com/search?q=Support%20for%20PLA%2FPETG',
  'Support for ABS': 'https://eu.store.bambulab.com/search?q=Support%20for%20ABS',
  'PET-CF': 'https://eu.store.bambulab.com/search?q=PET-CF',
  'PPS-CF': 'https://eu.store.bambulab.com/search?q=PPS-CF',
  'Support for PLA': 'https://eu.store.bambulab.com/search?q=Support%20for%20PLA',
};

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
      {n:'Arctic Whisper',hex:'#9CDBD9',f:'g:#9CDBD9,#FFFFFF'},{n:'Solar Breeze',hex:'#E94B3C',f:'g:#E94B3C,#FFFFFF'},{n:'Ocean to Meadow',hex:'#307FE2',f:'g:#307FE2,#54FF9B'},
      {n:'Pink Citrus',hex:'#F78F77',f:'g:#F78F77,#E4505A'},{n:'Mint Lime',hex:'#B6FF43',f:'g:#B6FF43,#4EC939'},{n:'Blueberry Bubblegum',hex:'#6FCAEF',f:'g:#6FCAEF,#8573DD'},
      {n:'Dusk Glare',hex:'#CE4406',f:'g:#CE4406,#ED9558'},{n:'Cotton Candy Cloud',hex:'#E7C1D5',f:'g:#E7C1D5,#8EC9E9'},
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
      {n:'Onyx Black',hex:'#1a1a1a',f:'metallic'},{n:'Diamond White',hex:'#E8E8E8',f:'metallic'},{n:'Silver',hex:'#B0B0B0',f:'metallic'},
      {n:'Gold',hex:'#D4A017',f:'metallic'},{n:'Rose Gold',hex:'#C49070',f:'metallic'},{n:'Scarlet Red',hex:'#CC2200',f:'metallic'},
      {n:'Galaxy Purple',hex:'#6030B0',f:'metallic'},{n:'Peacock Blue',hex:'#006080',f:'metallic'},{n:'Emerald Green',hex:'#007050',f:'metallic'},
      {n:'Champagne',hex:'#D0C060',f:'metallic'},{n:'Copper',hex:'#B06030',f:'metallic'},{n:'Blue',hex:'#147BD1'},
      {n:'Green',hex:'#4CE4A0'},{n:'Pink',hex:'#EEB1C1'},{n:'Purple',hex:'#854CE4'},
      {n:'Gilded Rose',hex:'#FF9425',f:'m:#FF9425,#C16784'},{n:'Midnight Blaze',hex:'#0047BB',f:'m:#0047BB,#7D1B49'},{n:'Neon City',hex:'#0047BB',f:'m:#0047BB,#BB22A3'},
      {n:'Blue Hawaii',hex:'#418FDE',f:'m:#418FDE,#70C884'},{n:'Velvet Eclipse (Black-Red)',hex:'#000000',f:'m:#000000,#A34342'},{n:'White',hex:'#FFFFFF'},
      {n:'South Beach',hex:'#F772A4',f:'g:#F772A4,#00918B'},{n:'Aurora Purple',hex:'#7F3696',f:'g:#7F3696,#006EC9'},{n:'Dawn Radiance',hex:'#EC984C',f:'g:#EC984C,#6CD4BC,#A66EB9,#D87694'},
      {n:'Mystic Magenta',hex:'#720062',f:'m:#720062,#3A913F'},{n:'Phantom Blue',hex:'#00629B',f:'m:#00629B,#000000'},
    ]},
    { name:'PLA Sparkle', note:'Paillettes', colors:[
      {n:'Onyx Black',hex:'#222222'},{n:'Diamond White',hex:'#EEEEEE'},{n:'Ruby Red',hex:'#CC1122'},
      {n:'Sapphire Blue',hex:'#003399'},{n:'Emerald Green',hex:'#006633'},{n:'Amethyst Purple',hex:'#7722AA'},
      {n:'Royal Purple',hex:'#483D8B'},{n:'Slate Gray',hex:'#8E9089'},{n:'Alpine Green',hex:'#3F5443'},
      {n:'Crimson Red',hex:'#792B36'},{n:'Classic Gold',hex:'#CEA629'},
    ]},
    { name:'PLA Tough+', note:'+20% résistance', colors:[
      {n:'White',hex:'#FFFFFF'},{n:'Gray',hex:'#AFB1AE'},{n:'Silver',hex:'#959698'},
      {n:'Black',hex:'#000000'},{n:'Orange',hex:'#DC3A27'},{n:'Yellow',hex:'#F4D53F'},
      {n:'Cyan',hex:'#009BD8'},
    ]},
    { name:'PLA Translucent', note:'Semi-transparent', colors:[
      {n:'Teal',hex:'#009FA1',f:'t'},{n:'Light Jade',hex:'#96D8AF',f:'t'},{n:'Blue',hex:'#0047BB',f:'t'},
      {n:'Mellow Yellow',hex:'#F5DBAB',f:'t'},{n:'Purple',hex:'#7B4F9E',f:'t'},{n:'Pink',hex:'#F2AAAA',f:'t'},
      {n:'Clear',hex:'#F0F0F0',f:'t'},{n:'Red',hex:'#B50011',f:'t'},{n:'Cherry Pink',hex:'#F5B6CD',f:'t'},
      {n:'Orange',hex:'#F74E02',f:'t'},{n:'Ice Blue',hex:'#B8CDE9',f:'t'},{n:'Lavender',hex:'#B8ACD6',f:'t'},
    ]},
    { name:'PLA Silk+', note:'Silk amélioré, brillant', colors:[
      {n:'Baby Blue',hex:'#A8C6EE',f:'metallic'},{n:'Blue',hex:'#008BDA',f:'metallic'},{n:'Titan Gray',hex:'#5F6367',f:'metallic'},
      {n:'Silver',hex:'#C8C8C8',f:'metallic'},{n:'Candy Green',hex:'#018814',f:'metallic'},{n:'Mint',hex:'#96DCB9',f:'metallic'},
      {n:'Purple',hex:'#8671CB',f:'metallic'},{n:'Candy Red',hex:'#D02727',f:'metallic'},{n:'Rose Gold',hex:'#BA9594',f:'metallic'},
      {n:'Pink',hex:'#F7ADA6',f:'metallic'},{n:'White',hex:'#FFFFFF',f:'metallic'},{n:'Champagne',hex:'#F3CFB2',f:'metallic'},
      {n:'Gold',hex:'#F4A925',f:'metallic'},
    ]},
    { name:'PLA Marble', note:'Effet marbre / granit', colors:[
      {n:'White Marble',hex:'#F7F3F0'},{n:'Red Granite',hex:'#AD4E38'},
    ]},
    { name:'PLA Tough', note:'Résistant aux chocs', colors:[
      {n:'Orange',hex:'#FF7F41'},{n:'Light Blue',hex:'#0085AD'},{n:'Lavender Blue',hex:'#6667AB'},
      {n:'Gray',hex:'#515A6C'},{n:'Silver',hex:'#898D8D'},{n:'Pine Green',hex:'#00482B'},
      {n:'Black',hex:'#25282A'},{n:'Vermilion Red',hex:'#DD3C22'},{n:'White',hex:'#F9F7F4'},
      {n:'Yellow',hex:'#FEDB00'},
    ]},
    { name:'PLA Aero', note:'Moussant, très léger', colors:[
      {n:'Gray',hex:'#CDCECA'},{n:'Black',hex:'#000000'},{n:'White',hex:'#FFFFFF'},
    ]},
    { name:'PLA Glow', note:'Phosphorescent', colors:[
      {n:'Glow Orange',hex:'#FF9D5B'},{n:'Glow Blue',hex:'#7AC0E9'},{n:'Glow Green',hex:'#A1FFAC'},
      {n:'Glow Pink',hex:'#F17B8F'},{n:'Glow Yellow',hex:'#F8FF80'},
    ]},
    { name:'PLA Dynamic', note:'Change de couleur aux UV', colors:[
      {n:'UV Color Changing - White to Coral',hex:'#FFFFFF'},
    ]},
    { name:'PLA Galaxy', note:'Reflets scintillants', colors:[
      {n:'Purple',hex:'#594177'},{n:'Green',hex:'#3B665E'},{n:'Nebulae',hex:'#424379'},
      {n:'Brown',hex:'#684A43'},
    ]},
    { name:'PLA Wood', note:'Aspect bois', colors:[
      {n:'Classic Birch',hex:'#918669'},{n:'Black Walnut',hex:'#4F3F24'},{n:'Clay Brown',hex:'#995F11'},
      {n:'Rosewood',hex:'#4C241C'},{n:'White Oak',hex:'#D6CCA3'},{n:'Ochre Yellow',hex:'#C98935'},
    ]},
    { name:'PLA Lite', note:'PLA économique', colors:[
      {n:'Black',hex:'#000000'},{n:'Yellow',hex:'#EFE255'},{n:'White',hex:'#FFFFFF'},
      {n:'Cyan',hex:'#4DAFDA'},{n:'Red',hex:'#C6001A'},{n:'Gray',hex:'#999D9D'},
      {n:'Blue',hex:'#004EA8'},{n:'Sunflower Yellow',hex:'#FFB549'},{n:'Green',hex:'#00BB31'},
      {n:'Orange',hex:'#FF671F'},{n:'Matte Beige',hex:'#ECC3B2'},{n:'Cocoa Brown',hex:'#745335'},
      {n:'Dark Gray',hex:'#8C8B8C'},
    ]},
    { name:'PLA Metal', note:'Aspect métal', colors:[
      {n:'Iron Gray Metallic',hex:'#43403D',f:'metallic'},{n:'Iridium Gold Metallic',hex:'#B39B84',f:'metallic'},{n:'Oxide Green Metallic',hex:'#1D7C6A',f:'metallic'},
      {n:'Cobalt Blue Metallic',hex:'#39699E',f:'metallic'},{n:'Copper Brown Metallic',hex:'#AA6443',f:'metallic'},
    ]},
    { name:'PLA Pure', note:'Teintes pures et douces', colors:[
      {n:'Pure White',hex:'#FFFFFF'},{n:'Absolute Black',hex:'#000000'},{n:'Milky Pink',hex:'#F7CED7'},
      {n:'Baby Blue',hex:'#A4DBE8'},{n:'Apricot',hex:'#FFB673'},
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
      {n:'Dark Brown',hex:'#4F2C1D'},{n:'Green',hex:'#009639'},{n:'Orange',hex:'#FF671F'},
      {n:'Pine Green',hex:'#034638'},{n:'Navy Blue',hex:'#0086D6'},{n:'Misty Blue',hex:'#688197'},
      {n:'Dark Beige',hex:'#DBC8B6'},{n:'Purple',hex:'#8A75D1'},{n:'Sunflower Yellow',hex:'#FFB81C'},
      {n:'Bright Green',hex:'#97D700'},{n:'Hot Pink',hex:'#F277C6'},
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
    { name:'PETG Translucent', note:'PETG translucide', colors:[
      {n:'Translucent Orange',hex:'#FF911A',f:'t'},{n:'Translucent Light Blue',hex:'#61B0FF',f:'t'},{n:'Clear',hex:'#F0F0F0',f:'t'},
      {n:'Translucent Gray',hex:'#8E8E8E',f:'t'},{n:'Translucent Olive',hex:'#748C45',f:'t'},{n:'Translucent Teal',hex:'#77EDD7',f:'t'},
      {n:'Translucent Brown',hex:'#C9A381',f:'t'},{n:'Translucent Purple',hex:'#D6ABFF',f:'t'},{n:'Translucent Pink',hex:'#F9C1BD',f:'t'},
    ]},
    { name:'PETG Matte', note:'PETG finition mate', colors:[
      {n:'White',hex:'#FFFFFF'},{n:'Black',hex:'#000000'},{n:'Lime',hex:'#C0DF16'},
      {n:'Gray',hex:'#7F7E83'},{n:'Pink',hex:'#FABBCB'},{n:'Baby Blue',hex:'#B9D9EB'},
      {n:'Violet',hex:'#A7A4E0'},{n:'Avocado Green',hex:'#BCE194'},
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
      {n:'Frozen',hex:'#40B6E4',f:'g:#40B6E4,#FFFFFF'},{n:'Blaze',hex:'#D21B3C',f:'g:#D21B3C,#F1AAA8'},
    ]},
    { name:'TPU 95A', note:'Flexible classique', colors:[
      {n:'Black',hex:'#000000'},{n:'White',hex:'#FFFFFF'},
    ]},
    { name:'TPU for AMS', note:'TPU compatible AMS', colors:[
      {n:'Blue',hex:'#5898DD'},{n:'Gray',hex:'#939393'},{n:'Neon Green',hex:'#90FF1A'},
      {n:'Black',hex:'#000000'},{n:'Red',hex:'#ED0000'},{n:'White',hex:'#FFFFFF'},
      {n:'Yellow',hex:'#F9EF41'},
    ]},
    { name:'TPU 85A', note:'Très souple', colors:[
      {n:'Neon Orange',hex:'#F68B1B'},{n:'Light Cyan',hex:'#C3E2D6'},{n:'Rose Beige/Flesh',hex:'#F3CFB2'},
      {n:'Black',hex:'#000000'},{n:'Lime Green',hex:'#CDEA80'},
    ]},
  ]},
  { mat:'ABS', color:'#ff6b81', subtypes:[
    { name:'ABS', note:'Robuste, tient la chaleur', colors:[
      {n:'Orange',hex:'#FF6A13'},{n:'Blue',hex:'#0A2CA5'},{n:'Azure',hex:'#489FDF'},
      {n:'Navy Blue',hex:'#0C2340'},{n:'Mint',hex:'#7AE1BF'},{n:'Silver',hex:'#87909A'},
      {n:'Bambu Green',hex:'#00AE42'},{n:'Olive',hex:'#789D4A'},{n:'Black',hex:'#000000'},
      {n:'Lavender',hex:'#7248BD'},{n:'Purple',hex:'#AF1685'},{n:'Red',hex:'#D32941'},
      {n:'White',hex:'#FFFFFF'},{n:'Yellow',hex:'#FCE900'},{n:'Tangerine Yellow',hex:'#FFC72C'},
      {n:'Beige',hex:'#DFD1A7'},
    ]},
    { name:'ABS-GF', note:'Fibre de verre — buse acier trempé', colors:[
      {n:'Orange',hex:'#F48438'},{n:'Blue',hex:'#0C3B95'},{n:'Gray',hex:'#C6C6C6'},
      {n:'Green',hex:'#61BF36'},{n:'Black',hex:'#000000'},{n:'Red',hex:'#E83100'},
      {n:'White',hex:'#FFFFFF'},{n:'Yellow',hex:'#FFE133'},
    ]},
  ]},
  { mat:'PC', color:'#5aa8ff', subtypes:[
    { name:'PC', note:'Très résistant aux chocs et à la chaleur', colors:[
      {n:'Clear Black',hex:'#686865',f:'t'},{n:'Transparent',hex:'#F0F0F0',f:'t'},{n:'Black',hex:'#000000'},
      {n:'White',hex:'#FFFFFF'},
    ]},
    { name:'PC FR', note:'PC ignifugé', colors:[
      {n:'Gray',hex:'#A8A8AA'},{n:'Black',hex:'#000000'},{n:'White',hex:'#FFFFFF'},
    ]},
  ]},
  { mat:'PA', color:'#f0e43a', subtypes:[
    { name:'PAHT-CF', note:'Nylon haute température fibre carbone', colors:[
      {n:'Black',hex:'#000000'},
    ]},
    { name:'PA6-CF', note:'Nylon fibre carbone — buse acier trempé', colors:[
      {n:'Black',hex:'#000000'},
    ]},
    { name:'PA6-GF', note:'Nylon fibre de verre — buse acier trempé', colors:[
      {n:'Blue',hex:'#75AED8'},{n:'White',hex:'#EAEAE4'},{n:'Gray',hex:'#353533'},
      {n:'Lime',hex:'#C5ED48'},{n:'Black',hex:'#000000'},{n:'Brown',hex:'#5B492F'},
      {n:'Orange',hex:'#FF4800'},{n:'Yellow',hex:'#FFCE00'},
    ]},
  ]},
  { mat:'Tech', color:'#ff7ad9', subtypes:[
    { name:'PPA-CF', note:'Haute performance — buse acier trempé', colors:[
      {n:'Black',hex:'#000000'},
    ]},
    { name:'PET-CF', note:'PET fibre carbone — buse acier trempé', colors:[
      {n:'Black',hex:'#000000'},
    ]},
    { name:'PPS-CF', note:'Haute performance — buse acier trempé', colors:[
      {n:'Black',hex:'#000000'},
    ]},
  ]},
  { mat:'Support', color:'#d8dae6', subtypes:[
    { name:'Support for PA/PET', note:'Interface de support détachable', colors:[
      {n:'Green',hex:'#C0DF16'},
    ]},
    { name:'PVA', note:'Support soluble à l’eau', colors:[
      {n:'Clear',hex:'#F0F1A8',f:'t'},
    ]},
    { name:'Support for PLA/PETG', note:'Interface de support détachable', colors:[
      {n:'Nature',hex:'#EDE6D3'},{n:'Black',hex:'#000000'},
    ]},
    { name:'Support for ABS', note:'Interface de support détachable', colors:[
      {n:'White',hex:'#FFFFFF'},
    ]},
    { name:'Support for PLA', note:'Interface de support détachable', colors:[
      {n:'White',hex:'#FFFFFF'},
    ]},
  ]},
];

// ─── Fiches info par type de filament (bulle ⓘ dans l'onglet Stock) ───
const SUBTYPE_INFO = {
  'PLA Basic': {
    usages: ['Prototypes et maquettes', 'Objets déco, figurines', "Pièces d'intérieur peu sollicitées"],
    pros: ['Le plus facile à imprimer', 'Très peu de déformation (warping)', 'Détails précis, large choix de couleurs', 'Quasi sans odeur'],
    cons: ['Ramollit vers 55-60 °C (voiture au soleil = déformation)', 'Plutôt cassant', "Vieillit mal en extérieur (UV, humidité)"],
  },
  'PLA Matte': {
    usages: ['Objets déco et cadeaux', 'Figurines, cosplay', 'Pièces visibles au rendu soigné'],
    pros: ['Aspect mat qui masque les lignes de couche', 'Rendu « premium » sans post-traitement', 'Aussi facile que le PLA Basic'],
    cons: ['Un peu plus cassant que le PLA Basic', 'Mêmes limites en chaleur et en extérieur'],
  },
  'PLA HF': {
    usages: ['Production en série', 'Grosses pièces à imprimer vite'],
    pros: ['Haut débit : impressions nettement plus rapides', 'Qualité conservée à grande vitesse'],
    cons: ['Mêmes limites mécaniques et thermiques que le PLA', 'Palette de couleurs plus réduite'],
  },
  'PLA Silk': {
    usages: ['Vases, objets décoratifs', 'Cadeaux, trophées, pièces « bijou »'],
    pros: ['Effet brillant soyeux / métallisé', 'Lignes de couche peu visibles'],
    cons: ['Adhésion entre couches plus faible : pièces moins solides', 'Surplombs et petits détails moins nets', 'Plus sensible aux réglages'],
  },
  'PLA Sparkle': {
    usages: ['Objets déco à effet pailleté', 'Boîtes, coques, cadeaux'],
    pros: ['Paillettes qui masquent les lignes de couche', 'Effet visuel original sans peinture'],
    cons: ["Rendu très dépendant de l'éclairage", 'Peu adapté aux pièces techniques'],
  },
  'PLA Tough+': {
    usages: ['Pièces fonctionnelles légères', 'Gabarits, supports, clips'],
    pros: ['Bien plus résistant aux chocs que le PLA Basic', 'Garde la facilité du PLA'],
    cons: ['Plus cher', 'Tenue en chaleur toujours limitée (type PLA)'],
  },
  'PLA Translucent': {
    usages: ['Abat-jour, lampes, veilleuses', 'Effets lumineux, diffuseurs'],
    pros: ['Laisse passer et diffuse la lumière', 'Facile à imprimer comme un PLA'],
    cons: ['Pas vraiment transparent (lignes visibles)', 'Les défauts internes se voient davantage'],
  },
  'PLA-CF': {
    usages: ['Pièces rigides : gabarits, supports, drones', 'Pièces à bonne stabilité dimensionnelle'],
    pros: ['Très rigide et léger', 'Bel aspect mat technique', 'Peu de déformation'],
    cons: ['Abrasif : buse en acier trempé obligatoire', 'Plus cassant aux chocs', 'Plus cher'],
  },
  'PETG Basic': {
    usages: ['Pièces fonctionnelles, supports muraux, outillage', 'Contenants, pièces exposées à l’humidité'],
    pros: ['Plus solide et moins cassant que le PLA', 'Tient la chaleur (~70-80 °C)', 'Bonne résistance chimique et à l’humidité'],
    cons: ['Tendance aux fils (stringing)', 'Accroche très fort au plateau (prévoir colle/agent démoulant)', 'Absorbe l’humidité : à stocker au sec'],
  },
  'PETG HF': {
    usages: ['Production rapide de pièces fonctionnelles', 'Supports, fixations, petites séries'],
    pros: ['Haut débit : impressions bien plus rapides', 'Propriétés du PETG conservées'],
    cons: ['Mêmes défauts que le PETG (stringing, humidité)'],
  },
  'PETG-CF': {
    usages: ['Pièces techniques rigides', 'Outillage, gabarits, pièces mécaniques'],
    pros: ['Rigide avec peu de déformation', 'Finition mate qui masque les couches', 'Bonne résistance chimique'],
    cons: ['Abrasif : buse en acier trempé obligatoire', 'À sécher avant impression', 'Plus cher'],
  },
  'ASA': {
    usages: ['Pièces extérieures : jardin, voiture, boîtiers', 'Pièces exposées au soleil et à la chaleur'],
    pros: ['Excellente résistance aux UV et intempéries', 'Tient la chaleur (~95-100 °C)', 'Couleurs stables dans le temps'],
    cons: ['Émet des fumées : imprimante fermée + filtration/aération', 'Tendance au warping sur les grandes pièces', 'Moins facile que PLA/PETG'],
  },
  'ASA Aero': {
    usages: ['Pièces très légères : aéromodélisme, drones'],
    pros: ['Moussant : densité réduite, pièces légères', 'Garde la résistance UV de l’ASA'],
    cons: ['Réglages spécifiques', 'Moins résistant mécaniquement', 'Finition de surface irrégulière'],
  },
  'ASA-CF': {
    usages: ['Pièces techniques extérieures rigides'],
    pros: ['Rigidité + résistance UV et chaleur', 'Très bonne stabilité dimensionnelle'],
    cons: ['Abrasif : buse en acier trempé obligatoire', 'Fumées comme l’ASA', 'Plus cher'],
  },
  'TPU 95A HF': {
    usages: ['Pièces souples : joints, pieds, protections', 'Coques, amortisseurs, poignées'],
    pros: ['Flexible et absorbe les chocs', 'Très résistant à l’usure et à l’abrasion', 'Version HF plus rapide que les TPU classiques'],
    cons: ['Impression plus lente qu’un PLA', 'Tendance aux fils', 'Absorbe l’humidité'],
  },
  'TPU 90A': {
    usages: ['Pièces très souples : grips, joints, objets déformables'],
    pros: ['Plus souple que le 95A', 'Très bonne élasticité et résistance à la déchirure'],
    cons: ['Plus délicat à imprimer (filament mou)', 'Moins précis sur les détails', 'Lent à imprimer'],
  },
};

// ─── Fiches ajoutées le 14/10/2026 (nouveaux types du catalogue officiel) ───
Object.assign(SUBTYPE_INFO, {
  'PLA Lite': {
    usages: ['Prototypes, essais de réglages', 'Grandes séries où le coût prime'],
    pros: ['Moins cher que le PLA Basic', 'Aussi facile à imprimer'],
    cons: ['Palette de couleurs réduite', 'Mêmes limites que le PLA (chaleur, extérieur)'],
  },
  'PLA Silk+': {
    usages: ['Objets déco brillants, vases, cadeaux'],
    pros: ['Effet soyeux brillant', 'Version améliorée du PLA Silk, plus agréable à imprimer'],
    cons: ['Plus cher que le PLA Basic', 'Tenue en chaleur limitée (type PLA)'],
  },
  'PLA Tough': {
    usages: ['Pièces fonctionnelles légères', 'Clips, gabarits, supports'],
    pros: ['Plus résistant aux chocs que le PLA Basic', 'Garde la facilité du PLA'],
    cons: ['Tenue en chaleur limitée (type PLA)', 'Plus cher que le PLA Basic'],
  },
  'PLA Metal': {
    usages: ['Objets déco à aspect métal', 'Figurines, pièces de présentation'],
    pros: ['Rendu métallisé sans peinture', 'Imprime comme un PLA'],
    cons: ['Plus cher', 'Aucune propriété mécanique du métal : reste du PLA'],
  },
  'PLA Marble': {
    usages: ['Vases, pots, objets déco minéraux'],
    pros: ['Effet pierre / marbre naturel', 'Masque bien les lignes de couche'],
    cons: ['Effet variable selon la pièce', 'Limites mécaniques et thermiques du PLA'],
  },
  'PLA Galaxy': {
    usages: ['Objets déco scintillants, cadeaux'],
    pros: ['Microbilles de verre : reflets selon l’angle', 'Finition brillante et lisse', 'Aussi facile que le PLA Basic'],
    cons: ['Buse 0,2 mm déconseillée', 'Peu adapté aux pièces techniques'],
  },
  'PLA Wood': {
    usages: ['Objets déco aspect bois, cadres, figurines'],
    pros: ['Rendu et toucher proches du bois', 'Masque les lignes de couche'],
    cons: ['Buses fines déconseillées (risque de bouchage)', 'Tendance aux fils', 'Moins solide que le PLA Basic'],
  },
  'PLA Glow': {
    usages: ['Objets phosphorescents : veilleuses, repères, jeux'],
    pros: ['Brille dans le noir après exposition à la lumière'],
    cons: ['Particules abrasives : buse en acier trempé recommandée', 'Couleur pâle en plein jour'],
  },
  'PLA Pure': {
    usages: ['Objets du quotidien et déco aux teintes douces'],
    pros: ['Couleurs nettes et douces', 'Imprime comme un PLA'],
    cons: ['Mêmes limites que le PLA (chaleur, extérieur)'],
  },
  'PLA Aero': {
    usages: ['Pièces très légères : aéromodélisme, drones'],
    pros: ['Moussant : densité réduite, pièces légères'],
    cons: ['Réglages spécifiques (température, débit)', 'Moins solide, surface irrégulière'],
  },
  'PLA Dynamic': {
    usages: ['Objets ludiques qui changent de couleur au soleil'],
    pros: ['Effet de surprise : la couleur change sous UV'],
    cons: ['Effet visible seulement au soleil / sous lampe UV', 'Limites du PLA'],
  },
  'PETG Matte': {
    usages: ['Pièces fonctionnelles visibles, supports, boîtiers'],
    pros: ['Solidité du PETG avec une finition mate', 'Masque mieux les lignes que le PETG brillant'],
    cons: ['Stringing et sensibilité à l’humidité comme tout PETG'],
  },
  'PETG Translucent': {
    usages: ['Luminaires, diffuseurs, contenants translucides'],
    pros: ['Translucide et plus solide qu’un PLA translucide', 'Bonne tenue à la chaleur et à l’humidité'],
    cons: ['Pas parfaitement transparent', 'Stringing, défauts internes visibles'],
  },
  'TPU 95A': {
    usages: ['Pièces souples : joints, protections, pieds'],
    pros: ['Flexible, absorbe les chocs', 'Très résistant à l’usure'],
    cons: ['Impression lente', 'Tendance aux fils, absorbe l’humidité'],
  },
  'TPU for AMS': {
    usages: ['Pièces souples en multicolore via l’AMS'],
    pros: ['Passe dans l’AMS : combinable avec d’autres filaments', 'Flexible et résistant'],
    cons: ['Moins souple que les TPU 85A / 90A', 'Plus cher'],
  },
  'TPU 85A': {
    usages: ['Pièces très souples : grips, joints, objets déformables'],
    pros: ['Très grande souplesse', 'Excellente élasticité'],
    cons: ['Le plus délicat à imprimer (filament très mou)', 'Très lent, détails moins nets'],
  },
});

// ─── Fiches ajoutées le 16/10/2026 (ABS, PC, PA, techniques, supports) ───
Object.assign(SUBTYPE_INFO, {
  'ABS': {
    usages: ['Pièces fonctionnelles, boîtiers', 'Pièces d’intérieur auto, pièces chaudes'],
    pros: ['Tient la chaleur (~90-100 °C)', 'Robuste et résistant aux chocs', 'Se ponce et se lisse facilement'],
    cons: ['Fumées et odeur : imprimante fermée + filtration/aération', 'Warping sur les grandes pièces', 'Vieillit mal aux UV (préférer l’ASA dehors)'],
  },
  'ABS-GF': {
    usages: ['Pièces techniques rigides et stables', 'Outillage, gabarits, boîtiers'],
    pros: ['Fibre de verre : plus rigide, moins de warping que l’ABS', 'Bonne stabilité dimensionnelle'],
    cons: ['Abrasif : buse en acier trempé obligatoire', 'Fumées comme l’ABS', 'Plus cher'],
  },
  'PC': {
    usages: ['Pièces très sollicitées : chocs, chaleur', 'Protections, pièces mécaniques, boîtiers'],
    pros: ['Très grande résistance aux chocs', 'Tient la chaleur (~110 °C et plus)', 'Existe en version transparente'],
    cons: ['Températures élevées (buse et plateau)', 'Warping, imprimante fermée nécessaire', 'Très sensible à l’humidité : à sécher'],
  },
  'PC FR': {
    usages: ['Boîtiers électroniques, pièces près de sources de chaleur'],
    pros: ['Retardateur de flamme', 'Garde la résistance du PC'],
    cons: ['Mêmes contraintes que le PC (chaleur, warping, séchage)', 'Palette très réduite'],
  },
  'PA6-CF': {
    usages: ['Pièces mécaniques : engrenages, supports, fixations'],
    pros: ['Nylon + carbone : très résistant et rigide', 'Bonne tenue en chaleur et à l’usure'],
    cons: ['Absorbe très vite l’humidité : séchage obligatoire', 'Abrasif : buse en acier trempé', 'Imprimante fermée recommandée'],
  },
  'PA6-GF': {
    usages: ['Pièces mécaniques robustes, outillage'],
    pros: ['Nylon + verre : solide et tenace', 'Plus de couleurs que les versions carbone'],
    cons: ['Séchage obligatoire (très hygroscopique)', 'Abrasif : buse en acier trempé', 'Warping possible'],
  },
  'PAHT-CF': {
    usages: ['Pièces mécaniques exposées à la chaleur', 'Pièces moteur, outillage technique'],
    pros: ['Nylon haute température : excellente tenue thermique', 'Moins sensible à l’humidité que le PA6'],
    cons: ['Abrasif : buse en acier trempé', 'Séchage recommandé', 'Cher'],
  },
  'PET-CF': {
    usages: ['Pièces techniques rigides et précises'],
    pros: ['Très rigide, très stable', 'Absorbe peu l’humidité', 'Bonne tenue en chaleur'],
    cons: ['Abrasif : buse en acier trempé', 'Séchage avant impression conseillé', 'Cher'],
  },
  'PPA-CF': {
    usages: ['Pièces haute performance : chaleur et efforts importants'],
    pros: ['Rigidité et tenue en chaleur de très haut niveau', 'Bonne résistance chimique'],
    cons: ['Très cher', 'Abrasif : buse en acier trempé', 'Séchage obligatoire, réglages exigeants'],
  },
  'PPS-CF': {
    usages: ['Pièces exposées aux produits chimiques et à la chaleur'],
    pros: ['Résistance chimique et thermique exceptionnelle', 'Ne s’enflamme pas facilement'],
    cons: ['Très cher', 'Températures d’impression très élevées', 'Abrasif : buse en acier trempé'],
  },
  'PVA': {
    usages: ['Supports solubles pour géométries complexes'],
    pros: ['Se dissout dans l’eau : supports sans traces', 'Permet des formes impossibles autrement'],
    cons: ['Absorbe énormément l’humidité : stockage au sec', 'Cher et lent', 'Compatibilité à vérifier selon le filament principal'],
  },
  'Support for PLA': {
    usages: ['Interface entre la pièce PLA et ses supports'],
    pros: ['Supports qui se détachent proprement', 'Surface inférieure plus nette'],
    cons: ['Usage dédié au PLA', 'Ajoute des changements de filament (temps, purge)'],
  },
  'Support for PLA/PETG': {
    usages: ['Interface de support pour pièces PLA ou PETG'],
    pros: ['Fonctionne avec le PLA et le PETG', 'Détachement propre des supports'],
    cons: ['Ajoute des changements de filament (temps, purge)'],
  },
  'Support for ABS': {
    usages: ['Interface de support pour pièces ABS / ASA'],
    pros: ['Supports qui se retirent proprement', 'Meilleur état de surface sous les surplombs'],
    cons: ['Usage dédié', 'Ajoute des changements de filament (temps, purge)'],
  },
  'Support for PA/PET': {
    usages: ['Interface de support pour nylons et PET-CF'],
    pros: ['Facilite le retrait des supports sur matériaux techniques'],
    cons: ['Usage dédié', 'À stocker au sec comme les nylons'],
  },
});
