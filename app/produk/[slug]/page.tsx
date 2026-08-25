import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft, MapPin, Calendar, Package, Clock, Truck,
  ShieldCheck, ShoppingCart, Phone, CheckCircle2, Wheat,
} from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import { ProductCard } from '@/components/site/ProductCard';
import { StockBadge, GradeBadge } from '@/components/site/ProductCard';
import { products } from '@/lib/data';
import { formatRupiah, formatDate, formatNumber } from '@/lib/format';

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return { title: 'Produk tidak ditemukan' };
  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const totalStock = product.stockKg;
  const stockPercent = Math.min((totalStock / 10000) * 100, 100);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Beranda</Link>
          <span>/</span>
          <Link href="/produk" className="hover:text-primary">Produk</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </nav>

        <Link href="/produk" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Kembali ke katalog
        </Link>

        {/* Product Detail */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-border bg-muted">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <GradeBadge grade={product.grade} />
              </div>
            </div>
            {product.gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.gallery.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-border bg-muted">
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium uppercase tracking-wide text-primary/60">
                  {product.category}
                </span>
                <StockBadge status={product.stockStatus} />
              </div>
              <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>
              <p className="text-lg text-primary font-semibold">
                {formatRupiah(product.pricePerKg)}
                <span className="text-sm font-normal text-muted-foreground"> /kg</span>
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Stock indicator */}
            <div className="rounded-xl border border-border bg-card p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Stok tersedia</span>
                <span className="font-semibold">{formatNumber(product.stockKg)} kg</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    product.stockStatus === 'tersedia' ? 'bg-green-500' :
                    product.stockStatus === 'terbatas' ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${stockPercent}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Minimum order: {product.minOrder} kg
              </p>
            </div>

            {/* Key info grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MapPin, label: 'Asal', value: product.origin },
                { icon: Calendar, label: 'Panen', value: formatDate(product.harvestDate) },
                { icon: Clock, label: 'Simpan', value: product.shelfLife },
                { icon: Package, label: 'Kemasan', value: product.packaging },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <item.icon className="h-4 w-4" />
                    <span className="text-xs">{item.label}</span>
                  </div>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/minat-pembelian"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
              >
                <ShoppingCart className="h-5 w-5" /> Form Minat Pembelian
              </Link>
              <a
                href="tel:+6281234567890"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border font-semibold hover:bg-muted transition-all"
              >
                <Phone className="h-5 w-5" /> Tanya via Telepon
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" /> Kualitas terjamin
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4 text-primary" /> Kirim nasional
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wheat className="h-4 w-4 text-primary" /> Dari petani langsung
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Spesifikasi Produk</h2>
          <div className="rounded-2xl border border-border overflow-hidden">
            <table className="w-full">
              <tbody>
                {product.specifications.map((spec, idx) => (
                  <tr key={spec.label} className={idx % 2 === 0 ? 'bg-card' : 'bg-muted/30'}>
                    <td className="px-6 py-4 text-sm font-medium text-muted-foreground w-1/3">{spec.label}</td>
                    <td className="px-6 py-4 text-sm font-medium">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Produk Terkait</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/produk/${p.slug}`}>
                  <ProductCard product={p} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
