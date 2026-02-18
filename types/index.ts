export type Product = {
  id: string;
  name: string;
  description: string;
  category: Category;
  price: number;
  image?: string;
  images?: string[];
  /** Optional Tailwind class for the product image (e.g. -rotate-90) */
  imageClassName?: string;
  /** Optional per-image rotation: one entry per images[] (e.g. ["-rotate-90"] = first only) */
  imageClassNames?: (string | undefined)[];
  available: boolean;
  availabilityCount?: number;
  popular?: boolean;
  /** Minimum rental period in days */
  minimumRentalPeriod?: number;
  /** Deposit/waarborg amount */
  deposit?: number;
};

export type Category = "tents" | "tables-chairs" | "sound-light" | "decoration" | "catering" | "facilities";

export type BookingFormData = {
  rentalPeriodType: "standard" | "custom";
  startDate: string;
  endDate: string;
  eventLocation: string;
  numberOfGuests: number;
  selectedItems: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  additionalNotes?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  event: string;
  rating: number;
  comment: string;
  image?: string;
};


export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartContextType = {
  items: CartItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
  /** Timestamp when a *new* item was last added (not quantity change). Used for cart icon animation. */
  lastNewItemAddedAt: number | null;
};
