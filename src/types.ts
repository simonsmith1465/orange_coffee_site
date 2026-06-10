export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'matcha' | 'milk-tea' | 'pastries' | 'desserts';
  image: string;
  tags?: string[];
  popular: boolean;
  isCustomizable?: boolean;
}

export interface OrderCartItem {
  id: string; // unique cart entry id, combining item ID and customization options
  item: MenuItem;
  quantity: number;
  size: '16oz' | '20oz' | 'Standard';
  iceLevel?: 'No Ice' | 'Less' | 'Regular' | 'Extra';
  sweetness?: 'None (0%)' | 'Less (50%)' | 'Regular (100%)' | 'Extra (120%)';
  milkOption?: 'Whole Milk' | 'Oat Milk (+ $0.75)' | 'Almond Milk (+ $0.75)' | 'No Milk';
  notes?: string;
  priceAtOrder: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  drinkOrdered?: string;
  verifiedPurchase?: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: 'interior' | 'drinks' | 'pastries';
}

export type ViewType = 'home' | 'menu' | 'reviews' | 'gallery' | 'contact' | 'order-now';
