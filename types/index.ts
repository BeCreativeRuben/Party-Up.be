export type Product = {
  id: string;
  name: string;
  description: string;
  category: Category;
  price: number;
  image?: string;
  available: boolean;
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

