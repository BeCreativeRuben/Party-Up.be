import { Product, Category } from "@/types";

export const products: Product[] = [
  {
    id: "tent-3x3",
    name: "3x3m Party Tent",
    description: "Waterproof party tent perfect for garden events. Easy setup, includes side walls.",
    category: "tents",
    price: 75,
    available: true,
    availabilityCount: 5,
    popular: true,
  },
  {
    id: "tent-4x4",
    name: "4x4m Party Tent",
    description: "Spacious party tent for larger gatherings. Includes side walls and groundsheet.",
    category: "tents",
    price: 100,
    available: true,
    availabilityCount: 3,
  },
  {
    id: "table-round-8",
    name: "Round Table (8 persons)",
    description: "Sturdy round table seating 8 people. Easy to clean surface.",
    category: "tables-chairs",
    price: 15,
    available: true,
    availabilityCount: 12,
    popular: true,
  },
  {
    id: "table-rect-10",
    name: "Rectangular Table (10 persons)",
    description: "Long rectangular table perfect for buffets or seating arrangements.",
    category: "tables-chairs",
    price: 18,
    available: true,
    availabilityCount: 8,
  },
  {
    id: "chair-folding",
    name: "Folding Chair",
    description: "Comfortable folding chair. Stackable for easy storage and transport.",
    category: "tables-chairs",
    price: 3,
    available: true,
    availabilityCount: 80,
    popular: true,
  },
  {
    id: "sound-system-basic",
    name: "Basic Sound System",
    description: "Portable sound system with microphone. Perfect for speeches and background music.",
    category: "sound-light",
    price: 50,
    available: true,
    availabilityCount: 4,
  },
  {
    id: "sound-system-premium",
    name: "Premium Sound System",
    description: "Professional sound system with DJ setup. Includes speakers, mixer, and microphone.",
    category: "sound-light",
    price: 120,
    available: true,
    availabilityCount: 2,
  },
  {
    id: "lighting-basic",
    name: "LED Stage Lighting",
    description: "LED lighting set with stands. Creates perfect party atmosphere.",
    category: "sound-light",
    price: 30,
    available: true,
    availabilityCount: 6,
    popular: true,
  },
  {
    id: "decoration-banner",
    name: "Custom Banner",
    description: "Personalized banner for your event. Various sizes available.",
    category: "decoration",
    price: 25,
    available: true,
    availabilityCount: 10,
  },
  {
    id: "decoration-centerpiece",
    name: "Table Centerpieces",
    description: "Elegant table centerpieces. Set of 10 pieces.",
    category: "decoration",
    price: 20,
    available: true,
    availabilityCount: 15,
  },
  {
    id: "package-basic",
    name: "Basic Party Package",
    description: "Complete package for 20-30 guests: tent, tables, chairs, basic sound system.",
    category: "packages",
    price: 250,
    available: true,
    availabilityCount: 3,
  },
  {
    id: "package-premium",
    name: "Premium Party Package",
    description: "Complete package for 50-80 guests: large tent, all tables/chairs, premium sound, lighting, decoration.",
    category: "packages",
    price: 500,
    available: true,
    availabilityCount: 2,
  },
];

export const categories: { id: Category; name: string; description: string; displayName: string }[] = [
  {
    id: "tents",
    name: "Tents",
    displayName: "Tents",
    description: "Weatherproof party tents in various sizes",
  },
  {
    id: "tables-chairs",
    name: "Tables & Chairs",
    displayName: "Tables",
    description: "Tables and seating for your guests",
  },
  {
    id: "sound-light",
    name: "Sound & Light",
    displayName: "Lighting",
    description: "Audio systems and lighting equipment",
  },
  {
    id: "decoration",
    name: "Decoration",
    displayName: "Decorations",
    description: "Banners, centerpieces, and party decorations",
  },
  {
    id: "packages",
    name: "Packages",
    displayName: "Packages",
    description: "Complete party packages for easy planning",
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

