export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  popular?: boolean;
  icon: string; // Emoji representing the fruit/drink
  image?: string; // Optional custom image URL
  benefits?: string[]; // Pointwise benefits
}

export interface CartItem {
  id: string; // unique cart id (can be same as menuItem.id for standard, or unique for custom)
  menuItem: MenuItem;
  customIngredients?: string[]; // customization or custom recipe ingredients
  quantity: number;
  finalPrice: number;
  isCustomRecipe?: boolean;
}

export interface PromoCoupon {
  id: string;
  code: string;
  label: string;
  discountPercentage: number;
  discountAmount?: number;
  description: string;
  tag: string;
}

export interface Order {
  id: string;
  customerName: string;
  address: string;
  phone: string;
  email: string;
  items: CartItem[];
  promoApplied?: PromoCoupon;
  totalBeforePromo: number;
  discountValue: number;
  payableAmount: number;
  deliveryNotes?: string;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  puneLocation: string; // Shivaji Nagar, Kalyani Nagar, Kothrud, etc.
  timestamp: string;
}
