'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, PackageX, Grid2x2 } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import { SectionHeading } from '@/components/site/SectionHeading';
import { ProductCard } from '@/components/site/ProductCard';
import { EmptyState, useLoading } from '@/components/site/States';
import { products } from '@/lib/data';
import { ProductCategory, StockStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

const categories: { value: ProductCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'beras', label: 'Beras' },
  { value: 'gabah', label: 'Gabah' },
  { value: 'olahan', label: 'Olahan' },
];

const sortOptions = [
  { value: 'newest', label: 'Terbaru' },
  { value: 'price-low', label: 'Harga Terendah' },
  { value: 'price-high', label: 'Harga Tertinggi' },
  { value: 'stock', label: 'Stok Terbanyak' },
];

export default function ProdukPage() {
  const loading = useLoading();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ProductCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState('newest');
  const [stockFilter, setStockFilter] = useState<StockStatus | 'all'>('all');

  const filtered = useMemo(() => {
    let result = [...products];

    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    if (stockFilter !== 'all') {
      result = result.filter((p) => p.stockStatus === stockFilter);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.pricePerKg - b.pricePerKg);
        break;
      case 'price-high':
        result.sort((a, b) => b.pricePerKg - a.pricePerKg);
        break;
      case 'stock':
        result.sort((a, b) => b.stockKg - a.stockKg);
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [search, category, sortBy, stockFilter]);

  return (
    <SiteLayout>
      <section className="bg-hero-gradient text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Katalog Produk"
            title="Gabah, Beras & Hasil Panen"
            description="Pilihan produk berkualitas dari sawah Patani, siap didistribusikan."
            className="[&_h2]:text-white [&_p]:text-white/70 [&_span]:text-accent"
          />
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search & Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari produk, varietas, asal..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      category === cat.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border hover:bg-muted'
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="ml-auto flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <SlidersHorizontal className="h-4 w-4" />
                </div>
                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value as StockStatus | 'all')}
                  className="px-3 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">Semua Stok</option>
                  <option value="tersedia">Tersedia</option>
                  <option value="terbatas">Terbatas</option>
                  <option value="habis">Habis</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Grid2x2 className="h-4 w-4" />
              <span>{filtered.length} produk ditemukan</span>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-border overflow-hidden">
                  <div className="aspect-[4/3] animate-shimmer" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 w-20 rounded animate-shimmer" />
                    <div className="h-5 w-full rounded animate-shimmer" />
                    <div className="h-4 w-3/4 rounded animate-shimmer" />
                    <div className="flex justify-between pt-2">
                      <div className="h-6 w-24 rounded animate-shimmer" />
                      <div className="h-6 w-16 rounded animate-shimmer" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={PackageX}
              title="Produk tidak ditemukan"
              description="Coba ubah kata kunci pencarian atau filter kategori."
              action={
                <button
                  onClick={() => { setSearch(''); setCategory('all'); setStockFilter('all'); }}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
                >
                  Reset filter
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <Link key={product.id} href={`/produk/${product.slug}`} className="animate-fade-in">
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
