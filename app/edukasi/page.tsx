'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, BookOpen, BookX, Clock, ArrowRight } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import { SectionHeading } from '@/components/site/SectionHeading';
import { EmptyState } from '@/components/site/States';
import { articles } from '@/lib/data';
import { formatDateShort } from '@/lib/format';
import { cn } from '@/lib/utils';

export default function EdukasiPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(articles.map((a) => a.category)));
    return ['all', ...cats];
  }, []);

  const filtered = useMemo(() => {
    let result = [...articles];
    if (category !== 'all') {
      result = result.filter((a) => a.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, category]);

  return (
    <SiteLayout>
      <section className="bg-hero-gradient text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Edukasi & Konten"
            title="Wawasan Pertanian & Tips Beras"
            description="Pelajari tips memilih beras, manfaat kesehatan, dan pengetahuan pertanian."
            className="[&_h2]:text-white [&_p]:text-white/70 [&_span]:text-accent"
          />
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search & Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    category === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border hover:bg-muted'
                  )}
                >
                  {cat === 'all' ? 'Semua' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles */}
          {filtered.length === 0 ? (
            <EmptyState
              icon={BookX}
              title="Artikel tidak ditemukan"
              description="Coba ubah kata kunci pencarian atau pilih kategori lain."
              action={
                <button
                  onClick={() => { setSearch(''); setCategory('all'); }}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
                >
                  Reset filter
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article) => (
                <Link key={article.id} href={`/edukasi/${article.slug}`} className="group">
                  <article className="rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg hover:border-primary/20 h-full flex flex-col">
                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5 space-y-3 flex-1 flex flex-col">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary w-fit">
                        {article.category}
                      </span>
                      <h3 className="font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                        <span>{formatDateShort(article.publishedAt)}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {article.readTime} min
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
