import { Product } from './types';

export interface MockDb {
  products: Product[];
}

/**
 * Data access layer — structured to mirror a future Supabase integration.
 * Currently returns static mock data; swap these functions for Supabase queries
 * when the backend is connected. Function signatures are designed to match
 * Supabase's select/filter pattern for easy migration.
 */
export async function getProducts(): Promise<Product[]> {
  const { products } = await import('./data');
  return products;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { products } = await import('./data');
  return products.filter((p) => p.featured);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { products } = await import('./data');
  return products.find((p) => p.slug === slug) || null;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const { products } = await import('./data');
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string, products: Product[]): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.origin.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}
