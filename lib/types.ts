export type ProductCategory = 'beras' | 'gabah' | 'olahan' | 'lainnya';
export type ProductGrade = 'Premium' | 'Grade A' | 'Grade B' | 'Grade C';
export type StockStatus = 'tersedia' | 'terbatas' | 'habis';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  grade: ProductGrade;
  pricePerKg: number;
  minOrder: number;
  stockKg: number;
  stockStatus: StockStatus;
  description: string;
  origin: string;
  harvestDate: string;
  shelfLife: string;
  packaging: string;
  imageUrl: string;
  gallery: string[];
  specifications: { label: string; value: string }[];
  featured: boolean;
  createdAt: string;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  imageUrl: string;
  publishedAt: string;
  readTime: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Partner {
  id: string;
  name: string;
  type: string;
  location: string;
  joinedAt: string;
  status: 'aktif' | 'pending' | 'nonaktif';
}

export interface BuyerLead {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  productInterest: string;
  quantityKg: number;
  city: string;
  status: 'baru' | 'diproses' | 'selesai' | 'dibatalkan';
  createdAt: string;
  notes: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'belum-dibaca' | 'dibaca' | 'dibalas';
  createdAt: string;
}

export interface PartnershipLead {
  id: string;
  name: string;
  organization: string;
  type: 'petani' | 'distributor' | 'pengepul' | 'toko' | 'lainnya';
  phone: string;
  email: string;
  region: string;
  landArea: string;
  message: string;
  status: 'baru' | 'diproses' | 'selesai';
  createdAt: string;
}

export interface ReplyTemplate {
  id: string;
  title: string;
  subject: string;
  body: string;
  category: string;
}
