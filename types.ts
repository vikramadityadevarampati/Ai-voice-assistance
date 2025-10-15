
export interface MenuItem {
  name: string;
  price: number;
  description: string;
}

export interface Restaurant {
  id: number;
  name:string;
  cuisine: string;
  rating: number;
  imageUrl: string;
  menu: MenuItem[];
}

export interface OrderItem {
  name: string;
  quantity: number;
  notes?: string;
}

export interface ParsedOrder {
  restaurantName: string;
  items: OrderItem[];
}
