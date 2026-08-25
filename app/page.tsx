import Link from 'next/link';
import {
  Wheat, Sprout, Truck, ShieldCheck, Users, BookOpen,
  ArrowRight, Quote, TrendingUp, Package, MapPin, Award,
} from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import { SectionHeading } from '@/components/site/SectionHeading';
import { ProductCard } from '@/components/site/ProductCard';
import { products, articles, partners } from '@/lib/data';
import { formatRupiah } from '@/lib/format';

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 3);
  const latestArticles = articles.slice(0, 3);

  const stats = [
    { label: 'Petani Mitra', value: '120+', icon: Users },
    { label: 'Ton Gabah/Tahun', value: '3.500', icon: Wheat },
    { label: 'Kota Terlayani', value: '45+', icon: MapPin },
    { label: 'Tahun Pengalaman', value: '8', icon: Award },
  ];

  const features = [
    { icon: Sprout, title: 'Dari Petani Langsung', desc: 'Dibudidayakan oleh petani mitra di sawah subur Patani tanpa perantara.' },
    { icon: ShieldCheck, title: 'Kualitas Terjamin', desc: 'Setiap batch melalui quality control ketat — kadar air, keputihan, broken.' },
    { icon: Truck, title: 'Distribusi Nasional', desc: 'Pengiriman terlacak ke seluruh Nusantara dengan logistik terpercaya.' },
    { icon: TrendingUp, title: 'Harga Adil', desc: 'Harga jaminan untuk petani, harga kompetitif untuk pembeli. Win-win.' },
  ];

  const processHighlights = [
    { step: '01', title: 'Budidaya', desc: 'Bibit unggul & pendampingan teknis' },
    { step: '02', title: 'Panen', desc: 'Panen pada kematangan optimal' },
    { step: '03', title: 'Pengeringan', desc: 'Kadar air 14% atau kurang' },
    { step: '04', title: 'Penggilingan', desc: 'Sosoh bersih, grade terkontrol' },
    { step: '05', title: 'Distribusi', desc: 'Ke seluruh Nusantara' },
  ];

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/5353980/pexels-photo-5353980.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Sawah Patani"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl space-y-6 animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm font-medium">
              <Wheat className="h-4 w-4 text-accent" />
              Bisnis Pertanian Aktif Sejak 2018
            </span>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-balance">
              Gabah & Beras Berkualitas dari{' '}
              <span className="text-accent">Sawah Patani</span> ke Seluruh Nusantara
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-xl">
              BerasPatani26 menyalurkan gabah kering, beras premium, dan hasil panen
              terbaik dari petani mitra langsung ke tangan Anda. Kualitas terjamin,
              harga adil, distribusi terpercaya.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/produk"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all hover:scale-105"
              >
                Lihat Produk <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/minat-pembelian"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/30 font-semibold hover:bg-white/20 transition-all"
              >
                Form Minat Pembelian
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-accent" />
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-section-gradient">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="Mengapa BerasPatani26"
            title="Kualitas yang Bisa Anda Percaya"
            description="Dari sawah hingga ke meja makan Anda, setiap tahap dijaga kualitasnya."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className="group rounded-2xl bg-card border border-border p-6 transition-all hover:shadow-lg hover:border-primary/20"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <SectionHeading
              eyebrow="Produk Unggulan"
              title="Beras & Gabah Pilihan"
              description="Produk terbaik dari hasil panen terkini."
            />
            <Link
              href="/produk"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
            >
              Lihat semua <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/produk/${product.slug}`}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Highlights */}
      <section className="py-20 bg-hero-gradient text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="Proses Produksi"
            title="Dari Sawah ke Meja Makan Anda"
            description="7 tahap produksi yang setiap langkahnya dijaga kualitasnya."
            className="[&_h2]:text-white [&_p]:text-white/70 [&_span]:text-accent"
          />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {processHighlights.map((ph) => (
              <div key={ph.step} className="rounded-xl bg-white/10 backdrop-blur border border-white/10 p-5 transition-all hover:bg-white/15">
                <p className="text-3xl font-bold text-accent mb-2">{ph.step}</p>
                <h4 className="font-semibold mb-1">{ph.title}</h4>
                <p className="text-xs text-white/60">{ph.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/proses-produksi"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all"
            >
              Lihat Detail Proses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="Jaringan Mitra"
            title="Dipercaya oleh Petani & Distributor"
            description="Ekosistem pertanian yang berkelanjutan bersama mitra terpercaya."
          />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {partners.slice(0, 6).map((partner) => (
              <div
                key={partner.id}
                className="rounded-xl border border-border bg-card p-4 text-center transition-all hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-2">
                  <Users className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium line-clamp-1">{partner.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{partner.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-20 bg-section-gradient">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <SectionHeading
              eyebrow="Edukasi & Konten"
              title="Wawasan Pertanian Terbaru"
              description="Tips, pengetahuan, dan informasi seputar beras dan pertanian."
            />
            <Link
              href="/edukasi"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
            >
              Semua artikel <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <Link key={article.id} href={`/edukasi/${article.slug}`} className="group">
                <article className="rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg hover:border-primary/20">
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 space-y-3">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {article.category}
                    </span>
                    <h3 className="font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2 border-t border-border">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{article.readTime} min baca</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-hero-gradient text-white p-8 sm:p-12 lg:p-16 overflow-hidden">
            <Quote className="absolute top-8 right-8 h-24 w-24 text-white/5" />
            <div className="relative space-y-6">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-lg sm:text-xl leading-relaxed text-white/90">
                &ldquo;Sebagai restoran, konsistensi kualitas beras sangat penting.
                BerasPatani26 selalu memberikan beras premium yang pulen dan wangi,
                pengiriman tepat waktu. Mitra terbaik untuk bisnis kami.&rdquo;
              </blockquote>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold">
                  AF
                </div>
                <div>
                  <p className="font-semibold">Ahmad Fauzi</p>
                  <p className="text-sm text-white/60">Resto Nusantara, Makassar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-section-gradient">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-primary text-primary-foreground p-8 sm:p-12 lg:p-16 text-center overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="relative space-y-6 max-w-2xl mx-auto">
              <Package className="h-12 w-12 mx-auto text-accent" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Siap Memesan Gabah & Beras Berkualitas?
              </h2>
              <p className="text-white/80 leading-relaxed">
                Isi Form Minat Pembelian dan tim kami akan menghubungi Anda dengan
                penawaran terbaik. Untuk grosir 1 ton+, harga spesial menanti.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/minat-pembelian"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all hover:scale-105"
                >
                  Isi Form Sekarang <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/kontak"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/30 font-semibold hover:bg-white/20 transition-all"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
