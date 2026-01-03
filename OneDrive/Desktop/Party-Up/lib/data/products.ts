import { Product, Category } from "@/types";

export const products: Product[] = [
  {
    id: "tent-3x3",
    name: "3x3m Party Tent",
    description: "Waterproof party tent perfect for garden events. Easy setup, includes side walls.",
    category: "tents",
    price: 75,
    available: true,
  },
  {
    id: "tent-4x4",
    name: "4x4m Party Tent",
    description: "Spacious party tent for larger gatherings. Includes side walls and groundsheet.",
    category: "tents",
    price: 100,
    available: true,
  },
  {
    id: "table-round-8",
    name: "Round Table (8 persons)",
    description: "Sturdy round table seating 8 people. Easy to clean surface.",
    category: "tables-chairs",
    price: 15,
    available: true,
  },
  {
    id: "table-rect-10",
    name: "Rectangular Table (10 persons)",
    description: "Long rectangular table perfect for buffets or seating arrangements.",
    category: "tables-chairs",
    price: 18,
    available: true,
  },
  {
    id: "chair-folding",
    name: "Folding Chair",
    description: "Comfortable folding chair. Stackable for easy storage and transport.",
    category: "tables-chairs",
    price: 3,
    available: true,
  },
  {
    id: "sound-system-basic",
    name: "Basic Sound System",
    description: "Portable sound system with microphone. Perfect for speeches and background music.",
    category: "sound-light",
    price: 50,
    available: true,
  },
  {
    id: "sound-system-premium",
    name: "Premium Sound System",
    description: "Professional sound system with DJ setup. Includes speakers, mixer, and microphone.",
    category: "sound-light",
    price: 120,
    available: true,
  },
  {
    id: "lighting-basic",
    name: "Basic Lighting Set",
    description: "LED lighting set with stands. Creates perfect party atmosphere.",
    category: "sound-light",
    price: 30,
    available: true,
  },
  {
    id: "decoration-banner",
    name: "Custom Banner",
    description: "Personalized banner for your event. Various sizes available.",
    category: "decoration",
    price: 25,
    available: true,
  },
  {
    id: "decoration-centerpiece",
    name: "Table Centerpieces",
    description: "Elegant table centerpieces. Set of 10 pieces.",
    category: "decoration",
    price: 20,
    available: true,
  },
  {
    id: "package-basic",
    name: "Basic Party Package",
    description: "Complete package for 20-30 guests: tent, tables, chairs, basic sound system.",
    category: "packages",
    price: 250,
    available: true,
  },
  {
    id: "package-premium",
    name: "Premium Party Package",
    description: "Complete package for 50-80 guests: large tent, all tables/chairs, premium sound, lighting, decoration.",
    category: "packages",
    price: 500,
    available: true,
  },
];

export const categories: { id: Category; name: string; description: string }[] = [
  {
    id: "tents",
    name: "Tents",
    description: "Weatherproof party tents in various sizes",
  },
  {
    id: "tables-chairs",
    name: "Tables & Chairs",
    description: "Tables and seating for your guests",
  },
  {
    id: "sound-light",
    name: "Sound & Light",
    description: "Audio systems and lighting equipment",
  },
  {
    id: "decoration",
    name: "Decoration",
    description: "Banners, centerpieces, and party decorations",
  },
  {
    id: "packages",
    name: "Packages",
    description: "Complete party packages for easy planning",
  },
];

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((product) => product.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

