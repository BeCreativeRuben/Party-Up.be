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
    name: "WC-wagen",
    description: "Verplaatsbare toiletwagen voor je evenement.",
    category: "facilities",
    price: 285,
    image: productImagePaths[0],
    available: true,
    availabilityCount: 2,
    popular: true,
  },
  {
    id: "tafels-75x180",
    name: "Tafels hoog & laag (75 × 180 cm)",
    description: "Hoge en lage tafels, 75 × 180 cm. Perfect voor buffetten en zitplaatsen.",
    category: "tables-chairs",
    price: 6,
    image: productImagePaths[46],
    images: dsc(9681, 9682, 9683, 9684, 9685, 9686, 9687, 9688, 9689, 9690, 9691),
    available: true,
    availabilityCount: 20,
    popular: true,
  },
  {
    id: "staafleen",
    name: "Staafleen (bar towel)",
    description: "Staafdoek, ideale aanvulling voor je bar. Per stuk.",
    category: "decoration",
    price: 3,
    image: productImagePaths[2],
    available: true,
    availabilityCount: 50,
  },
  {
    id: "bakplaat-gas",
    name: "Bakplaat op gas",
    description: "Bakplaat op gas voor buitenshuis koken.",
    category: "catering",
    price: 30,
    image: productImagePaths[21],
    images: dsc(9656, 9657),
    available: true,
    availabilityCount: 4,
  },
  {
    id: "pannenkoeken",
    name: "Pannenkoeken",
    description: "Pannenkoekservice voor je evenement.",
    category: "catering",
    price: 40,
    image: productImagePaths[19],
    images: dsc(9654, 9655),
    available: true,
    availabilityCount: 3,
  },
  {
    id: "wafels",
    name: "Wafels",
    description: "Wafelservice voor je evenement.",
    category: "catering",
    price: 35,
    image: productImagePaths[7],
    images: dsc(9642, 9643, 9644),
    available: true,
    availabilityCount: 3,
  },
  {
    id: "borden",
    name: "Borden (groot Ø 25, soep Ø 22)",
    description: "Bordenset: groot Ø 25 cm, soep Ø 22 cm. Per weekend.",
    category: "catering",
    price: 50,
    image: productImagePaths[40],
    images: dsc(9675, 9676, 9677, 9678, 9679, 9680),
    available: true,
    availabilityCount: 10,
  },
  {
    id: "bekers",
    name: "Bekers (10 stuks)",
    description: "Bekers, 10 stuks. Excl. BTW.",
    category: "catering",
    price: 40,
    image: productImagePaths[7],
    available: true,
    availabilityCount: 20,
  },
  {
    id: "oven",
    name: "Oven",
    description: "Oven om te bakken en op te warmen.",
    category: "catering",
    price: 45,
    image: productImagePaths[5],
    images: dsc(9640, 9641),
    available: true,
    availabilityCount: 2,
  },
  {
    id: "ofyr",
    name: "Ofyr",
    description: "Ofyr vuurgrill voor buitenshuis koken.",
    category: "catering",
    price: 180,
    image: productImagePaths[9],
    available: true,
    availabilityCount: 1,
  },
  {
    id: "percolator-verwarmer",
    name: "Percolator + 8 L verwarmer",
    description: "Percolator met 8 L verwarmer voor koffie.",
    category: "catering",
    price: 15,
    image: productImagePaths[12],
    images: dsc(9647, 9648, 9649, 9650, 9651, 9652),
    available: true,
    availabilityCount: 4,
  },
  {
    id: "grill-panini",
    name: "Grill panini",
    description: "Paninigrill voor broodjes.",
    category: "catering",
    price: 25,
    image: productImagePaths[27],
    images: dsc(9662, 9663),
    available: true,
    availabilityCount: 3,
  },
  {
    id: "licht-slingers",
    name: "Licht slingers",
    description: "Lichtslingers. Per stuk.",
    category: "decoration",
    price: 15,
    image: productImagePaths[37],
    images: dsc(9672, 9673, 9674),
    available: true,
    availabilityCount: 15,
  },
  {
    id: "glazen-6",
    name: "Glazen (6 st.)",
    description: "Set van 6 glazen. Water & champagne.",
    category: "catering",
    price: 2.7,
    image: productImagePaths[23],
    images: dsc(9658, 9659, 9660, 9661),
    available: true,
    availabilityCount: 30,
  },
  {
    id: "glazen-wegwerp-12",
    name: "Glazen wegwerp (12 st.)",
    description: "Wegwerpglazen, 12 stuks. Water & champagne.",
    category: "catering",
    price: 5,
    image: productImagePaths[14],
    available: true,
    availabilityCount: 50,
  },
  {
    id: "tent-6x4",
    name: "Tent 6 × 4 m met wanden",
    description: "Feesttent 6 × 4 m met zijwanden. Weerbestendig.",
    category: "tents",
    price: 250,
    image: productImagePaths[15],
    available: true,
    availabilityCount: 2,
    popular: true,
  },
  {
    id: "jbl-box",
    name: "JBL box",
    description: "JBL draagbare box voor muziek en omroep.",
    category: "sound-light",
    price: 20,
    image: productImagePaths[60],
    images: dsc(9695, 9696, 9697, 9698, 9699, 9700),
    available: true,
    availabilityCount: 4,
  },
  {
    id: "bain-marie",
    name: "Bain marie",
    description: "Bain marie om eten warm te houden. 15 € excl. gel. Gel: 3 €/st.",
    category: "catering",
    price: 15,
    image: productImagePaths[17],
    available: true,
    availabilityCount: 6,
  },
  {
    id: "bain-marie-gel",
    name: "Bain marie gel",
    description: "Gel voor bain marie. Per stuk.",
    category: "catering",
    price: 3,
    image: productImagePaths[18],
    available: true,
    availabilityCount: 30,
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

