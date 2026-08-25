'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { HelpCircle, MessageCircle, ArrowRight, ChevronDown } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import { SectionHeading } from '@/components/site/SectionHeading';
import { faqItems } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function FaqPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(faqItems.map((f) => f.category)));
    return ['all', ...cats];
  }, []);

  const filtered = useMemo(() => {
    let result = [...faqItems];
    if (category !== 'all') {
      result = result.filter((f) => f.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, category]);

  return (
    <SiteLayout>
      <section className="bg-hero-gradient text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Pertanyaan yang Sering Diajukan"
            description="Temukan jawaban atas pertanyaan umum seputar produk, pemesanan, dan kemitraan."
            className="[&_h2]:text-white [&_p]:text-white/70 [&_span]:text-accent"
          />
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="mb-6 relative">
            <HelpCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari pertanyaan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
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

          {/* FAQ List */}
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground">Tidak ada pertanyaan yang cocok.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((faq) => (
                <div
                  key={faq.id}
                  className="rounded-xl border border-border bg-card overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                        {faq.category}
                      </span>
                      <span className="font-medium text-sm sm:text-base">{faq.question}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 text-muted-foreground shrink-0 transition-transform',
                        openId === faq.id && 'rotate-180'
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-300',
                      openId === faq.id ? 'max-h-96' : 'max-h-0'
                    )}
                  >
                    <p className="px-5 pb-4 pt-0 text-sm text-muted-foreground leading-relaxed pl-12">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-section-gradient border border-border p-6 text-center space-y-3">
            <MessageCircle className="h-8 w-8 mx-auto text-primary" />
            <h3 className="font-bold text-lg">Masih Ada Pertanyaan?</h3>
            <p className="text-sm text-muted-foreground">Hubungi tim kami untuk informasi lebih lanjut.</p>
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
            >
              Hubungi Kami <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
