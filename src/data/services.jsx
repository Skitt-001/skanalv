export const SERVICES = [
  {
    id: 'skana',
    title: 'Apskaņošana',
    short: 'Pro skaņas aparatūra jebkuram pasākumam',
    description: 'Skaņas aparatūras piegāde, uzstādīšana un apkalpošana. Dzīvās skaņas daudzceliņu ieraksts un pēcapstrāde. Skaņu režisora un operatora pakalpojumi.\n\nLūdzu rakstiet uz info@skana.lv - nosūtīsim nomas cenu piedāvājumu.',
    items: ['PA sistēmas', 'Mikrofoni un statīvi', 'Monitors un in-ear', 'Mikserpulti', 'Daudzceliņu ieraksts'],
    accent: 'var(--green)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13M6 15H3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1zm12-2h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1z"/>
      </svg>
    ),
    equipment: {
      sound: [
        'RCF NX 32-A (1.4"/12")',
        'RCF Sub 905-AS II (15\')',
        'RCF Sub 8003 AS MKII (18\')',
        'RCF Art 712-A MK4',
        'JBL EON 15 G-2',
        'JBL EON One Compact (Battery Powered)',
        'QSC HPR122',
        'QSC KW122',
        'QSC K10',
        'QSC HPR153i 3-Way',
        'AmpRack Next-Proaudio 2xMD14000 + MQ10000 Xilica hp4080',
        'Eighteen Sound J-Sub PS 318 Cardioid',
        'DAP audio M-10 Coaxial',
        'LD Systems MAUI 5 Compact WHITE',
        'LD Systems MAUI 5 Compact BLACK',
        'LD Systems MAUI 28 G1 Compact WHITE',
        'LD Systems SAT62A',
        'Adam Audio A7X',
      ],
      microphones: [
        'DPA d:vote 4099 (Hi sens) (viola,gtr,piano)',
        'Shure SM58',
        'Sennheiser E945',
        'Telefunken M80',
        'Shure Beta 53 Skin TAN Headworn (TA4F)',
        'Shure SM48',
        'Shure PG58',
        'Shure PGA58',
        'Shure SM57',
        'Shure SM98 clip',
        'Shure SM 52 Beta',
        'Sennheiser E 904',
        'AudioLine CM3',
        'AGK C 1000 MK2',
        'AKG C411',
        'Gooseneck CM20P',
        'Ovid CC 100',
        'Schaller Oyster S/P',
        'ECM999',
      ],
      mixers: [
        'Allen & Heath SQ-6',
        'Allen & Heath QU-5D',
        'Allen & Heath Qu-16',
        'Allen & Heath ZEDi-10 FX',
        'Allen & Heath ZEDi-6',
        'Yamaha MG16XU',
        'Soundcraft E8',
        'Soundcraft E12',
        'Soundcraft FX16',
        'Soundcraft GB4',
        'Allen & Heath AR2408',
        'Allen & Heath AR84',
        'Allen & Heath DX168',
        'Pioneer DJM400',
        'Behringer X-Touch Compact',
      ],
      wireless: [
        'IEM ausu monitoru sistēma Shure PSM 900 P9T+P9RA (G6E)',
        'Radio Mikrofons Shure QLX D4 SM58 (H51)',
        'Radio Mikrofons Shure QLX D4 SM58 (K51)',
        'HeadSet Mikrofons Shure QLX D4/D1 (H51)',
        'Lavalier Mikrofons Shure QLX D4/D1 (H51)',
        'Radio Mikrofons Shure ULX P4 RQ Beta 58',
        'Radio Mikrofons JBL One Compact Wireless Set',
        'Radio Mikrofons Mipro ACT-52 8B (863-865mhz)',
        'Radiofrekvences signāla distribūcijas sistēma Shure UA844',
      ],
      djEquipment: [
        'Hercules DJ Control Jogvision (Serato)',
        'Pioneer CDJ 200',
        'Pioneer CDJ 400',
        'Pioneer DJM 400',
        'Pioneer 2x CDJ 400 + DJM 400',
        'Sony MDS-JE440 (Mini Disc Player)',
      ],
      audioAccessories: [
        'Allen&Heath M-SQ-SDANTE-A card',
        'Audio Splitter 8ch Art S8 Splitcom Pro8 (Passive)',
        'Audio Splitter 1ch ART Splitcom Pro2 (Passive)',
        'LD Systems HPA1 IEM Headphone amplifier',
        'Behringer Powerplay P2 IEM',
        'Di-box ART Zdirect (Passive)',
        'Di-box ART Xdirect (Active)',
        'Di-box Klark Teknik DI 10A (active)',
        'Di-box LDI02 (active)',
        'Delay module Shark FBQ100',
        '31-Band Hand-Held Spectrum Analyzer PAA3',
      ],
    },
  },
  {
    id: 'gaismas',
    title: 'Gaismu tehnika',
    short: 'Dinamiska gaismu dizaina risinājumi',
    description: 'Gaismu tehnikas piegāde, uzstādīšana un apkalpošana. Apjoma plānošana un saskaņošana ar skaņu. Gaismu mākslinieka pakalpojumi.\n\nLūdzu rakstiet uz info@skana.lv - nosūtīsim nomas cenu piedāvājumu.',
    items: ['LED moving heads', 'PAR un wash gaismas', 'Strob un efektu gaismas', 'Gaismu pults DMX', 'Truss un fermas'],
    accent: 'var(--blue)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
      </svg>
    ),
    equipment: {
      lighting: [
        'ARRI Fresnel 650 Plus Man bk',
        'Source four zoom Profile 25-50',
        'Stairville PAR 64 Short CP88 500W',
        'Stairville PAR 54 WFL 300W',
        'Stairville PAR 64 Short CP88 500W',
        'LED Floodlight 4000K 8000LM',
        'LED Floodlight 3000K 8000LM',
        'Showtec UV400 Gun Blacklight',
        'Showtec Sunstrip Active MKII',
        'Eurolite Blinder Four DWE 4x120V/650W',
        'Imagination LED Beam / Luminus',
        'Imagination LED Wash Zoom / Cree',
        'Martin Imagescan',
        'Eurolite LED Laser Derby MK2',
        'Martin Acrobat',
      ],
      controllers: [
        'ChamSYS MagiQ',
        'Showtec Show Designer',
        'GLP Scan Operator',
      ],
      trussing: [
        'Gravity LS431B',
        'König & Meyer 24630',
        'König & Meyer 24622 Crossbar',
        'Varytec Wind Up 85 kg TÜV',
        'Global Truss 812 Coupler Ø 48 - 51 mm',
        '1m "Fermas Pilārs" ar 60x60 cm grīdas bāzi',
        '2m "Fermas Pilārs" ar 60x60 cm grīdas bāzi',
        '3m "Fermas Pilārs" ar 60x60 cm grīdas bāzi',
        'Coupler Single Ø 50',
        'Alumīnija caurule Ø50mm 275cm',
        'Stand cover K&M 24630 (Black)',
        'Stand cover K&M 24630 (White)',
      ],
      ledLights: [
        'Led PAR 64 RGBWA 18x15w',
        'Led PAR 64 RGBWA+UV 18x18w (Waterproof)',
        'Led PAR 64 RGBWA+UV 18x18w',
        'Led panel RGBWAUV 18x18W 1m',
        'Led panel RGB 36x5W IP65 1m',
        'Led Pixelbar - Washer RGB Edison 1m',
      ],
      accessories: [
        'Spoguļbumba ar motoru 50cm',
        'Ventilators CataC (Analog)',
        'Dūmu ģenerators / Hazer',
        'Showtec dimmer 10A 1ch with fader',
        'Eurolite dimmer 6A 4ch',
        'DMX Splitter Cameo SB8.5 8ch (5 pin)',
        'DMX Splitter/Booster Showtec DB-1-8',
      ],
    },
  },
  {
    id: 'video',
    title: 'Video',
    short: 'Projekcija, ekrāni un tiešraides',
    description: 'Projektoru, ekrānu un LED TV noma, piegāde un uzstādīšana. Video signāla konvertori un komutācija. Video moderatora pakalpojumi. Tiešsaistes pasākumi.\n\nLūdzu rakstiet uz info@skana.lv - nosūtīsim nomas cenu piedāvājumu.',
    items: ['Projektori Full HD/4K', 'LED sienas', 'Liela ekrāna projektori', 'Video switch/konvertori', 'Tiešsaiste & streaming'],
    accent: 'var(--green)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="15" height="14" rx="2"/>
        <path d="M17 9l4-2v12l-4-2"/>
      </svg>
    ),
    equipment: {
      screens: [
        'TV ekrāns Viewsonic 32\' ar statīvu',
        'TV ekrāns NEC V422 42\' ar statīvu H=218cm',
        'TV ekrāns NEC V422 42\' ar zemo sufliera statīvu',
        'Liels TV ekrāns Samsung 65\' ar statīvu',
        'Liels TV ekrāns Samsung UHD 75\' ar statīvu',
      ],
      projectors: [
        'Projektors NEC UM361XG 3600 ANSI Lumens (Ultra tuvās distances)',
        'Projektori Hitachi CP WU8440 4500 ANSI Lumens',
      ],
      stands: [
        'H veida grīdas TV statīvs 218x70cm',
        '1m TV statīvs "Fermas Pilārs" ar 60x60 cm grīdas bāzi',
        '2m TV statīvs "Fermas Pilārs" ar 60x60 cm grīdas bāzi',
        '3m TV statīvs "Fermas Pilārs" ar 60x60 cm grīdas bāzi',
        'Video kameras statīvs Tripod',
      ],
      screensAccessories: [
        '2m x 2m Portatīvs Biroja ekrāns uz statīva',
        '3m x 2,25m Profilveida ekrāns ScreenLine Fast frame (Front)',
        '3m x 2,25m Profilveida ekrāns ScreenLine Fast frame (Rear)',
        '3m x 4m Profilveida ekrāns ScreenLine Fast frame (Rear)',
        '3m x 1,69m Profilveida ekrāns ScreenLine Fast frame 16:9 (Front)',
        '3m x 1,69m Profilveida ekrāns ScreenLine Fast frame 16:9 (Rear)',
      ],
      accessories: [
        'Video signāla konvertors Kramer VP-729',
        'Presenteris - klikeris Logitech R700',
        'VGA signālā spliteris',
        'HDMI signālā spliteris',
        'HDMI Splitteris ar audio 3.5mm izeju',
        'Video Kamera Sony HDR-CX450',
      ],
    },
  },
  {
    id: 'skatuve',
    title: 'Skatuves konstrukcijas',
    short: 'Visi elementi ar TÜV drošības sertifikātu',
    description: 'Skatuves platformu un fermu konstrukciju transportēšana un montāža. Pieejamas dažādu izmēru drapērijas.\n\nLūdzu rakstiet uz info@skana.lv - nosūtīsim nomas cenu piedāvājumu.',
    items: ['Modulāras skatuves', 'Alumīnija fermas', 'Drapērijas un backdropi', 'Transports un montāža'],
    accent: 'var(--blue)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="14" width="20" height="6" rx="1"/>
        <path d="M6 14V9M10 14V9M14 14V9M18 14V9M4 9h16"/>
      </svg>
    ),
    equipment: {
      stage: [
        'Baltic Stages 1x2m modulis',
        'Baltic Stages 1x1m modulis',
        'Baltic Stages 0,50x2m modulis',
        'Baltic Stages 0,50x1m modulis',
        'Alumīnija kāju komplekts 4gb. skatuves podestam Ø48mm 20cm',
        'Alumīnija kāju komplekts 4gb. AluStage Ø50mm 20cm',
        'Alumīnija kāju komplekts 4gb. skatuves podestam Ø48mm 40cm',
        'Alumīnija kāju komplekts 4gb. skatuves podestam Ø48mm 60cm',
        'Alumīnija kāju komplekts 4gb. skatuves podestam Ø48mm 90cm',
        'Alumīnija līste ar auduma lentes lipekli 1m (drapērijas nostiprināšanai)',
        'Savilce Baltic stages BS-ACC-02',
      ],
      accessories: [
        'Telts 3x3m (Tumši zaļa)',
        'Aizslietnis 215x170cm (Tumši pelēks)',
        'Statīva drapērija K&M 24630 (Melna)',
        'Statīva drapērija K&M 24630 (Balta)',
        'Alumīnija caurule Ø50mm 275cm',
        'Alumīnija trepes 9,80 m, 3x14',
        'Coupler Ø 50',
        'Global Truss 812 Coupler Ø 48 - 51 mm',
        '4-point truss HD34 1m',
        '4-point truss HD34 2m',
        '4-point truss HD34 3m',
        '4-point truss HD34 L',
        '4-point truss HD34 T',
        '4-point truss HD34 L90°+down',
        '4-point truss base (60x60cm 25kg)',
      ],
      djTables: [
        'Galds DJ aparatūrai 50cm x 1m H=90cm',
        'Galds DJ aparatūrai 50cm x 2m H=90cm',
        'Galds DJ aparatūrai 1m x 2m H=90cm',
        'DJ Fasāde (Facade) 4x70cm H=120cm (Balta)',
        'DJ Fasāde (Facade) 4x70cm H=120cm (Melna)',
      ],
    },
  },
  {
    id: 'konsultacijas',
    title: 'Tehniskās konsultācijas',
    short: 'No idejas līdz realizācijai',
    description: 'Padalīsimies pieredzē. Atradīsim piemērotāko risinājumu no idejas līdz realizācijai. Tehniskie raideri jauniem mākslinieciskiem kolektīviem. Neatkarīgs viedoklis par aparatūru.',
    items: ['Pasākuma tehniskā plānošana', 'Tehniskā raidera sastādīšana', 'Aparatūras konsultācijas', 'Skaņas/gaismas projekti', 'Vietas apmeklēšana'],
    accent: 'var(--green)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"/>
      </svg>
    ),
  },
  {
    id: 'noma',
    title: 'Aparatūras noma',
    short: 'Komplekti un individuāli risinājumi',
    description: 'Komplekti kāzām un ballītēm. Komplekti dzīvās mūzikas apskaņošanai. Individuāli saskaņoti komplekti — nosaucot pasākuma norises vietu Latvijā.\n\nLūdzu rakstiet uz info@skana.lv - nosūtīsim nomas cenu piedāvājumu.',
    items: ['Kāzu komplekti', 'Ballīšu komplekti', 'Dzīvās mūzikas risinājumi', 'Individuāli komplekti', 'Profesionāļu noma'],
    accent: 'var(--blue)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM1 10h22"/>
      </svg>
    ),
    equipment: {
      all: [
        'Apskaņošanas, gaismas, video un skatuves nomas risinājumi pēc pasākuma vajadzībām',
      ],
    },
  },
]

export const SERVICE_LINKS = SERVICES.map(service => ({
  id: service.id,
  title: service.title,
}))
