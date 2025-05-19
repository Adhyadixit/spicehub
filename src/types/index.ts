
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription?: string;
  image: string;
  additionalImages?: string[];
  rating: number;
  reviewCount: number;
  category: string;
  tags?: string[];
  isNew?: boolean;
  isSale?: boolean;
  stock: number;
  sku: string;
  benefits?: string[];
  ingredients?: string[];
  nutritionalInfo?: {
    [key: string]: string;
  };
  weight?: string;
  dimensions?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  featured?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  addresses?: Address[];
}

export interface Address {
  id: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}
