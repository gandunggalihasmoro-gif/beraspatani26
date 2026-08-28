import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  ArrowLeft,
  MapPin,
  Calendar,
  Package,
  Clock,
  Truck,
  ShieldCheck,
  ShoppingCart,
  Phone,
  MessageCircle,
  CheckCircle2,
  Wheat,
} from 'lucide-react';

import SiteLayout from '@/components/site/SiteLayout';
import { ProductCard } from '@/components/site/ProductCard';
import {
  StockBadge,
  GradeBadge,
} from '@/components/site/ProductCard';

import { products } from '@/lib/data';

import {
  formatRupiah,
  formatDate,
  formatNumber,
} from '@/lib/format';

/* =========================================================
   NOMOR KONTAK
========================================================= */

const PHONE_NUMBER = '081572316412';
const WHATSAPP_NUMBER = '6281572316412';

/* =========================================================
   STATIC PARAMS
========================================================= */

export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const product = products.find(
    (p) => p.slug === params.slug
  );

  if (!product) {
    return {
      title: 'Produk tidak ditemukan',
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

/* =========================================================
   PRODUCT DETAIL PAGE
========================================================= */

export default function ProductDetailPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const product = products.find(
    (p) => p.slug === params.slug
  );

  if (!product) {
    notFound();
  }

  /* =======================================================
     PRODUK TERKAIT
  ======================================================= */

  const related = products
    .filter(
      (p) =>
        p.category === product.category &&
        p.id !== product.id
    )
    .slice(0, 3);

  /* =======================================================
     STOCK
  ======================================================= */

  const totalStock = product.stockKg;

  const stockPercent = Math.min(
    (totalStock / 10000) * 100,
    100
  );

  /* =======================================================
     PESAN WHATSAPP
  ======================================================= */

  const whatsappMessage =
    `Halo BerasPatani26, saya ingin bertanya mengenai produk ${product.name}. ` +
    `Mohon informasi mengenai harga, stok, minimum order, dan pengiriman.`;

  const whatsappLink =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">

          <Link
            href="/"
            className="hover:text-primary"
          >
            Beranda
          </Link>

          <span>/</span>

          <Link
            href="/produk"
            className="hover:text-primary"
          >
            Produk
          </Link>

          <span>/</span>

          <span className="truncate font-medium text-foreground">
            {product.name}
          </span>

        </nav>

        {/* =================================================
            KEMBALI KE KATALOG
        ================================================= */}

        <Link
          href="/produk"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke katalog
        </Link>

        {/* =================================================
            PRODUCT DETAIL
        ================================================= */}

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">

          {/* ===============================================
              GALLERY
          =============================================== */}

          <div className="space-y-4">

            <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted">

              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute left-4 top-4 flex gap-2">

                <GradeBadge
                  grade={product.grade}
                />

              </div>

            </div>

            {product.gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">

                {product.gallery.map(
                  (img, idx) => (
                    <div
                      key={idx}
                      className="aspect-square overflow-hidden rounded-lg border border-border bg-muted"
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )
                )}

              </div>
            )}

          </div>

          {/* ===============================================
              PRODUCT INFO
          =============================================== */}

          <div className="space-y-6">

            {/* ---------------------------------------------
                TITLE + CATEGORY
            --------------------------------------------- */}

            <div className="space-y-3">

              <div className="flex items-center gap-2">

                <span className="text-sm font-medium uppercase tracking-wide text-primary/60">
                  {product.category}
                </span>

                <StockBadge
                  status={
                    product.stockStatus
                  }
                />

              </div>

              <h1 className="text-3xl font-bold leading-tight">
                {product.name}
              </h1>

              <p className="text-lg font-semibold text-primary">

                {formatRupiah(
                  product.pricePerKg
                )}

                <span className="text-sm font-normal text-muted-foreground">
                  {' '}
                  /kg
                </span>

              </p>

            </div>

            {/* ---------------------------------------------
                DESCRIPTION
            --------------------------------------------- */}

            <p className="leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* ---------------------------------------------
                STOCK INDICATOR
            --------------------------------------------- */}

            <div className="space-y-2 rounded-xl border border-border bg-card p-4">

              <div className="flex items-center justify-between text-sm">

                <span className="text-muted-foreground">
                  Stok tersedia
                </span>

                <span className="font-semibold">
                  {formatNumber(
                    product.stockKg
                  )}{' '}
                  kg
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-muted">

                <div
                  className={`h-full rounded-full transition-all ${
                    product.stockStatus ===
                    'tersedia'
                      ? 'bg-green-500'
                      : product.stockStatus ===
                        'terbatas'
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                  }`}
                  style={{
                    width: `${stockPercent}%`,
                  }}
                />

              </div>

              <p className="text-xs text-muted-foreground">
                Minimum order:{' '}
                {product.minOrder} kg
              </p>

            </div>

            {/* ---------------------------------------------
                KEY INFO GRID
            --------------------------------------------- */}

            <div className="grid grid-cols-2 gap-4">

              {[
                {
                  icon: MapPin,
                  label: 'Asal',
                  value: product.origin,
                },
                {
                  icon: Calendar,
                  label: 'Panen',
                  value: formatDate(
                    product.harvestDate
                  ),
                },
                {
                  icon: Clock,
                  label: 'Simpan',
                  value:
                    product.shelfLife,
                },
                {
                  icon: Package,
                  label: 'Kemasan',
                  value:
                    product.packaging,
                },
              ].map((item) => (

                <div
                  key={item.label}
                  className="rounded-xl border border-border p-4"
                >

                  <div className="mb-1 flex items-center gap-2 text-muted-foreground">

                    <item.icon className="h-4 w-4" />

                    <span className="text-xs">
                      {item.label}
                    </span>

                  </div>

                  <p className="text-sm font-medium">
                    {item.value}
                  </p>

                </div>

              ))}

            </div>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="grid gap-3 pt-2 sm:grid-cols-3">

              {/* FORM MINAT PEMBELIAN */}

              <Link
                href="/minat-pembelian"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-center font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >

                <ShoppingCart className="h-5 w-5" />

                Form Minat Pembelian

              </Link>

              {/* WHATSAPP */}

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-center font-semibold text-white transition-opacity hover:opacity-90"
              >

                <MessageCircle className="h-5 w-5" />

                Tanya via WhatsApp

              </a>

              {/* TELEPON */}

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-center font-semibold text-foreground transition-colors hover:bg-muted"
              >

                <Phone className="h-5 w-5" />

                Tanya via Telepon

              </a>

            </div>

            {/* =================================================
                TRUST BADGES
            ================================================= */}

            <div className="flex flex-wrap gap-4 border-t border-border pt-4">

              <div className="flex items-center gap-2 text-sm text-muted-foreground">

                <ShieldCheck className="h-4 w-4 text-primary" />

                Kualitas terjamin

              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">

                <Truck className="h-4 w-4 text-primary" />

                Kirim nasional

              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">

                <Wheat className="h-4 w-4 text-primary" />

                Dari petani langsung

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            SPECIFICATIONS
        ================================================= */}

        <div className="mt-16">

          <h2 className="mb-6 text-2xl font-bold">
            Spesifikasi Produk
          </h2>

          <div className="overflow-hidden rounded-2xl border border-border">

            <table className="w-full">

              <tbody>

                {product.specifications.map(
                  (spec, idx) => (

                    <tr
                      key={spec.label}
                      className={
                        idx % 2 === 0
                          ? 'bg-card'
                          : 'bg-muted/30'
                      }
                    >

                      <td className="w-1/3 px-6 py-4 text-sm font-medium text-muted-foreground">
                        {spec.label}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium">
                        {spec.value}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* =================================================
            RELATED PRODUCTS
        ================================================= */}

        {related.length > 0 && (

          <div className="mt-16">

            <h2 className="mb-6 text-2xl font-bold">
              Produk Terkait
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {related.map((p) => (

                <Link
                  key={p.id}
                  href={`/produk/${p.slug}`}
                >

                  <ProductCard
                    product={p}
                  />

                </Link>

              ))}

            </div>

          </div>

        )}

      </div>
    </SiteLayout>
  );
}