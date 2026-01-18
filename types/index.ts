export type Product = {
  id: string;
  name: string;
  description: string;
  category: Category;
  price: number;
  image?: string;
  available: boolean;
  availabilityCount?: number;
  popular?: boolean;
};

export type Category = "tents" | "tables-chairs" | "sound-light" | "decoration" | "packages";

export type BookingFormData = {
  eventDate: string;
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
};
