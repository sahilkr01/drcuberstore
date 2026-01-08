export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  originalPrice?: number;
  category: 'cube' | 'puzzle' | 'toy' | 'accessory';
  image: string;
  images?: string[];
  stock: number;
  rating: number;
  reviews: number;
  featured: boolean;
  badge?: string;
  specifications?: {
    brand?: string;
    model?: string;
    dimensions?: string;
    weight?: string;
    material?: string;
    mechanism?: string;
    magnetized?: boolean;
    difficulty?: string;
    ageGroup?: string;
    color?: string;
  };
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: Address;
  role: 'user' | 'admin';
  createdAt: string;
  password?: string; // Only used during registration, never stored in context
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Order Types
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface OrderTrackingStep {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp?: string;
  completed: boolean;
  current: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  userPhone?: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: Address;
  status: OrderStatus;
  paymentMethod: 'cod' | 'online' | 'upi';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
}
