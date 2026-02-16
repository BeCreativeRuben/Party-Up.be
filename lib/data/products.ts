import { Product, Category } from "@/types";

// WebP only: image paths from optimized folder (e.g. 9635 -> /ProductImages/optimized/dsc_9635.webp)
function dsc(...nums: number[]) {
  return nums.map((n) => `/ProductImages/optimized/dsc_${n}.webp`);
}

// All product images: WebP only. Index 0 = dsc_9635, 1 = dsc_9636, ... 69 = dsc_9704
export const productImagePaths = Array.from(
  { length: 70 },
  (_, i) => `/ProductImages/optimized/dsc_${9635 + i}.webp`
);

export const products: Product[] = [
  {
    id: "wc-wagen",
    name: "VIP WC-wagen",
    description: "Luxe VIP toiletwagen met 1 afgesloten damestoilet en 1 afgesloten herentoilet met urinoir. Uitgerust met porseleinen opbouw wasbakken, grote spiegels en stijlvolle LED verlichting. Ieder toilet heeft een eigen vermaalpomp (Grundfos) voor optimale hygiëne. Geschikt voor circa 100 personen.",
    category: "facilities",
    price: 285,
    image: "/ProductImages/optimized/WhatsApp Image 2026-02-10 at 18.44.05.jpeg",
    images: [
      "/ProductImages/optimized/WhatsApp Image 2026-02-10 at 18.44.05.jpeg",
      "/ProductImages/optimized/WhatsApp Image 2026-02-10 at 18.44.05 (1).jpeg",
      "/ProductImages/optimized/WhatsApp Image 2026-02-10 at 18.44.05 (2).jpeg",
      "/ProductImages/optimized/WhatsApp Image 2026-02-10 at 18.44.05 (3).jpeg",
      "/ProductImages/optimized/WhatsApp Image 2026-02-10 at 18.44.05 (4).jpeg",
      "/ProductImages/optimized/WhatsApp Image 2026-02-10 at 18.44.05 (5).jpeg",
      "/ProductImages/optimized/WhatsApp Image 2026-02-10 at 18.44.05 (6).jpeg",
      "/ProductImages/optimized/WhatsApp Image 2026-02-10 at 18.44.05 (7).jpeg",
      "/ProductImages/optimized/WhatsApp Image 2026-02-10 at 18.44.05 (8).jpeg",
      "/ProductImages/optimized/WhatsApp Image 2026-02-10 at 18.44.05 (9).jpeg",
    ],
    available: true,
    availabilityCount: 1,
    popular: true,
    minimumRentalPeriod: 3,
    deposit: 300,
  },
  {
    id: "tafels-hoog",
    name: "Tafels hoog",
    description: "Hoge tafels, 7 stuks. Zwarte hoezen zitten er bij. Diameter blad 85cm. Transporthoogte 1.45m. Bladhoogte 1.10m.",
    category: "tables-chairs",
    price: 6,
    image: productImagePaths[52], // dsc_9687.webp
    images: dsc(9687, 9688, 9689, 9690, 9691),
    imageClassName: "-rotate-90",
    available: true,
    availabilityCount: 7,
    popular: true,
  },
  {
    id: "tafels-laag",
    name: "Tafels laag",
    description: "Lage tafels, 10 stuks. Afmetingen: 1.82m × 76cm. Perfect voor buffetten en zitplaatsen.",
    category: "tables-chairs",
    price: 6,
    image: productImagePaths[46], // dsc_9681.webp
    images: dsc(9681, 9684),
    imageClassNames: ["-rotate-90"], // alleen eerste beeld (dsc_9681)
    available: true,
    availabilityCount: 10,
    popular: true,
  },
  {
    id: "hoge-stoelen",
    name: "Hoge stoelen",
    description: "Hoge stoelen (bar stools), 25 stuks. Perfect voor gebruik bij hoge tafels.",
    category: "tables-chairs",
    price: 3,
    image: productImagePaths[50], // dsc_9685.webp
    images: dsc(9685, 9686),
    imageClassName: "-rotate-90",
    available: true,
    availabilityCount: 25,
    popular: true,
  },
  {
    id: "normale-stoelen",
    name: "Normale stoelen",
    description: "Normale stoelen met armleuningen, 20 stuks. Perfect voor gebruik bij lage tafels.",
    category: "tables-chairs",
    price: 2,
    image: productImagePaths[47], // dsc_9682.webp
    images: dsc(9682, 9683),
    available: true,
    availabilityCount: 20,
    popular: true,
  },
  {
    id: "bakplaat-gas",
    name: "Bakplaat op gas",
    description: "Bakplaat op gas werkt met 2 warmtezones. Gasfles is zelf te voorzien of apart te verrekenen. Meer informatie hierover na contact.",
    category: "catering",
    price: 30,
    image: productImagePaths[21],
    images: dsc(9656, 9657),
    available: true,
    availabilityCount: 1,
  },
  {
    id: "pannenkoeken",
    name: "Pannekoeken bakplaat",
    description: "Pannekoeken bakplaat. 220V. Diameter 40cm. 3600 WATT.",
    category: "catering",
    price: 40,
    image: productImagePaths[19],
    images: dsc(9654, 9655),
    available: true,
    availabilityCount: 1,
  },
  {
    id: "wafels",
    name: "Wafelijzer",
    description: "Voor 2 luikse wafels. 14.8cm x 10.7cm x 3.10cm. 4x5 ruitjes. 1400W.",
    category: "catering",
    price: 35,
    image: productImagePaths[7],
    images: dsc(9642, 9643, 9644),
    available: true,
    availabilityCount: 1,
  },
  {
    id: "borden",
    name: "Borden",
    description: "Borden per 24 stuks:\ngroot Ø 25 cm\nsoep Ø 22 cm.",
    category: "catering",
    price: 5,
    image: productImagePaths[40],
    images: dsc(9675, 9676, 9677, 9678, 9679, 9680),
    available: true,
    availabilityCount: 3, // 90 borden totaal = 3 sets van 24
  },
  {
    id: "bestek",
    name: "Bestek",
    description: "Bestek per 24 stuks.",
    category: "catering",
    price: 5,
    image: "/ProductImages/optimized/dsc_9679.webp",
    images: dsc(9679, 9675, 9676, 9677, 9678, 9680),
    available: true,
    availabilityCount: 3, // totaal aantal sets van 24 (zoals borden)
  },
  {
    id: "oven",
    name: "Heteluchtoven",
    description: "0-300 graden. Met grillfunctie.\n3 niveau's",
    category: "catering",
    price: 45,
    image: productImagePaths[5],
    images: dsc(9640, 9641),
    available: true,
    availabilityCount: 1,
    imageClassName: "-rotate-90",
  },
  {
    id: "ofyr",
    name: "Ofyr",
    description: "Ofyr vuurgrill op hout voor buitenshuis koken in kortenstaal.\nDiameter 1 meter.",
    category: "catering",
    price: 200,
    image: "/ProductImages/optimized/filtersquality75.webp",
    images: ["/ProductImages/optimized/filtersquality75.webp"],
    available: true,
    availabilityCount: 1,
  },
  {
    id: "percolator-verwarmer",
    name: "Warme dranken koker 9 liter",
    description: "Goed voor 60 tassen. 2200W. Verwarmen van water, warme wijn, chocolademelk.",
    category: "catering",
    price: 15,
    image: productImagePaths[2], // dsc_9637.webp
    images: dsc(9637, 9638), // dsc_9639 verwijderd van de site
    imageClassName: "-rotate-90",
    available: true,
    availabilityCount: 1,
  },
  {
    id: "grill-panini",
    name: "Contactgrill",
    description: "Contactgrill 2200W 230V.\nGeschikt voor panini's en allerhande grill-toepassingen.",
    category: "catering",
    price: 25,
    image: productImagePaths[27],
    images: dsc(9662, 9663, 9664),
    available: true,
    availabilityCount: 1,
  },
  {
    id: "licht-slingers",
    name: "Licht slingers",
    description: "Lichtslingers, 3x 10 meter.",
    category: "decoration",
    price: 15,
    image: productImagePaths[37],
    images: dsc(9672, 9673, 9674),
    available: true,
    availabilityCount: 3,
  },
  {
    id: "glazen-6",
    name: "Champagne glazen (per 6)",
    description: "Champagne glazen, 48 stuks. 19 cl per glas.",
    category: "catering",
    price: 2.7,
    image: "/ProductImages/optimized/dsc_9661.webp",
    images: dsc(9661, 9658, 9659, 9660),
    available: true,
    availabilityCount: 8, // 8 dozen beschikbaar
  },
  {
    id: "glazen-wegwerp-12",
    name: "Wijnglazen (per 12)",
    description: "Wijnglazen, 60 stuks. 30cl per glas.",
    category: "catering",
    price: 5,
    image: productImagePaths[30], // dsc_9665.webp
    images: dsc(9665, 9666),
    available: true,
    availabilityCount: 5, // 5 dozen beschikbaar
  },
  {
    id: "waterglazen",
    name: "Waterglazen (per 6)",
    description: "Waterglazen, 30 stuks. 37 cl per glas.",
    category: "catering",
    price: 2.7,
    image: productImagePaths[32], // dsc_9667.webp
    images: dsc(9667),
    available: true,
    availabilityCount: 5, // 5 dozen beschikbaar
  },
  {
    id: "koffie-tassen",
    name: "Koffie tassen (per 24)",
    description: "Koffie tassen, 48 stuks. 30cl per tas.",
    category: "catering",
    price: 2.7,
    image: productImagePaths[33], // dsc_9668.webp
    images: dsc(9668, 9669),
    available: true,
    availabilityCount: 2, // 2 dozen beschikbaar
  },
  {
    id: "koffieglazen",
    name: "Koffieglazen (per 2)",
    description: "Koffieglazen, 30 stuks. 33cl per glas.",
    category: "catering",
    price: 2.7,
    image: productImagePaths[10], // dsc_9645.webp
    images: dsc(9645, 9646),
    available: true,
    availabilityCount: 15, // 15 dozen beschikbaar
  },
  {
    id: "waterkaraffen",
    name: "Waterkaraffen (per 6)",
    description: "Waterkaraffen, 6 stuks. 1.3L per karaf.",
    category: "catering",
    price: 5,
    image: productImagePaths[35], // dsc_9670.webp
    images: dsc(9670, 9671),
    imageClassNames: [undefined, "-rotate-90"], // eerste 0°, tweede -90°
    available: true,
    availabilityCount: 1, // 1 doos beschikbaar
  },
  {
    id: "generator",
    name: "Generator",
    description: "Honda generator 7 KW voor stroomvoorziening tijdens evenementen.",
    category: "facilities",
    price: 150,
    image: productImagePaths[66], // dsc_9701.webp
    images: dsc(9701, 9702, 9703, 9704),
    available: true,
    availabilityCount: 1,
  },
  {
    id: "handenwas-set",
    name: "Handenwas set",
    description: "Alleenstaande handenwas set voor hygiëne tijdens evenementen. Water input en output zit erin.",
    category: "facilities",
    price: 50,
    image: undefined, // placeholder only
    available: true,
    availabilityCount: 1,
  },
  {
    id: "gasvuurtjes",
    name: "Terrasverwarmers",
    description: "Terrasverwarmers, 13KW. Hoogte wanneer opgezet: 2.25m. Gedemonteerd voor transport. Uitsluitend buiten te gebruiken. Exclusief gasfles.",
    category: "facilities",
    price: 40,
    image: productImagePaths[57], // dsc_9692.webp
    images: dsc(9692, 9693),
    imageClassName: "-rotate-90",
    available: true,
    availabilityCount: 2,
  },
  {
    id: "tent-6x4",
    name: "Tent 6 × 4 m met wanden",
    description: "Feesttent 6 × 4 m met zijwanden. Weerbestendig. Compact verpakt. Plooitent. Eenvoudig opzetten met 2 personen. Countergewichten beschikbaar. Professionele kwaliteit.",
    category: "tents",
    price: 250,
    image: "/ProductImages/optimized/tent6x4.gif",
    available: true,
    availabilityCount: 2,
    popular: true,
    minimumRentalPeriod: 3,
    deposit: 500,
  },
  {
    id: "jbl-box",
    name: "JBL Partybox",
    description: "JBL draagbare box voor muziek en omroep.",
    category: "sound-light",
    price: 20,
    image: productImagePaths[60],
    images: dsc(9695, 9696, 9697, 9698, 9699, 9700),
    imageClassName: "-rotate-90",
    available: true,
    availabilityCount: 1,
  },
  {
    id: "bain-marie",
    name: "Bain marie",
    description: "Bain marie om eten warm te houden. 15 € excl. gel. Gel: 3 €/st.",
    category: "catering",
    price: 15,
    image: productImagePaths[17],
    available: true,
    availabilityCount: 1,
  },
  {
    id: "bain-marie-gel",
    name: "Bain marie gel",
    description: "Gel voor bain marie. Per stuk.",
    category: "catering",
    price: 3,
    image: productImagePaths[18],
    available: true,
    availabilityCount: 20,
  },
];

export const categories: { id: Category; name: string; description: string; displayName: string }[] = [
  {
    id: "tents",
    name: "Tents",
    displayName: "Tents",
    description: "Weatherproof party tents",
  },
  {
    id: "tables-chairs",
    name: "Tafels",
    displayName: "Tafels",
    description: "Tables for buffets and seating",
  },
  {
    id: "sound-light",
    name: "Sound & Light",
    displayName: "Sound",
    description: "Audio and lighting equipment",
  },
  {
    id: "decoration",
    name: "Decoration",
    displayName: "Decoratie",
    description: "Light garlands and bar accessories",
  },
  {
    id: "catering",
    name: "Catering",
    displayName: "Catering",
    description: "Kitchen equipment, tableware and food service",
  },
  {
    id: "facilities",
    name: "Faciliteiten",
    displayName: "Faciliteiten",
    description: "WC and event facilities",
  },
];

export function getCategoryDisplayName(categoryId: Category): string {
  const category = categories.find(c => c.id === categoryId);
  return category?.displayName || category?.name || categoryId;
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((product) => product.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

