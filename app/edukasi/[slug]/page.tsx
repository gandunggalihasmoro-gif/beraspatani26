import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import { articles } from '@/lib/data';
import { formatDate, formatDateShort } from '@/lib/format';

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return { title: 'Artikel tidak ditemukan' };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 2);
  const paragraphs = article.content.split('\n\n');

  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Beranda</Link>
          <span>/</span>
          <Link href="/edukasi" className="hover:text-primary">Edukasi</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate">{article.title}</span>
        </nav>

        <Link href="/edukasi" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Kembali ke edukasi
        </Link>

        {/* Header */}
        <div className="space-y-4 mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-balance">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" /> {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {article.readTime} min baca
            </span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-muted mb-8">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none space-y-4">
          {paragraphs.map((para, idx) => (
            <p key={idx} className="text-foreground/90 leading-relaxed whitespace-pre-line">
              {para}
            </p>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-section-gradient border border-border p-6 text-center space-y-3">
          <BookOpen className="h-8 w-8 mx-auto text-primary" />
          <h3 className="font-bold text-lg">Tertarik dengan Produk Kami?</h3>
          <p className="text-sm text-muted-foreground">Lihat katalog lengkap gabah dan beras berkualitas.</p>
          <Link
            href="/produk"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
          >
            Lihat Produk <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">Artikel Terkait</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((rel) => (
                <Link key={rel.id} href={`/edukasi/${rel.slug}`} className="group">
                  <div className="rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-md">
                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={rel.imageUrl}
                        alt={rel.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="text-xs text-primary font-medium">{rel.category}</span>
                      <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">{rel.title}</h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-3 w-3" /> {formatDateShort(rel.publishedAt)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </SiteLayout>
  );
}
