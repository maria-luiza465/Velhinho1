export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  active: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  name: string;
  phone: string;
  email: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    zipCode: string;
  };
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  total: number;
  paymentMethod: 'credit' | 'pix' | 'cash';
  status: 'pending' | 'accepted' | 'rejected' | 'production' | 'delivery' | 'delivered';
  createdAt: string;
}

export type ViewType = 'home' | 'catalog' | 'cart' | 'checkout' | 'admin' | 'login';