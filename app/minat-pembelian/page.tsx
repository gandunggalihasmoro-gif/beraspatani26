'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CheckCircle2, ShoppingCart, ArrowRight, Package, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import { SectionHeading } from '@/components/site/SectionHeading';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { products } from '@/lib/data';
import { formatRupiah } from '@/lib/format';

const trustItems = [
  { icon: Package, title: 'Min. Order Fleksibel', desc: 'Mulai dari 10 kg untuk beras premium' },
  { icon: Truck, title: 'Kirim Nasional', desc: 'Ke seluruh wilayah Nusantara' },
  { icon: ShieldCheck, title: 'Kualitas Terjamin', desc: 'Setiap batch melalui QC ketat' },
];

export default function MinatPembelianPage() {
  const { status, message, submit } = useFormSubmit();
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const handleProductChange = (productName: string) => {
    setSelectedProduct(productName);
    const product = products.find((p) => p.name === productName);
    if (product && quantity) {
      setEstimatedPrice(product.pricePerKg * parseInt(quantity));
    }
  };

  const handleQuantityChange = (qty: string) => {
    setQuantity(qty);
    const product = products.find((p) => p.name === selectedProduct);
    if (product && qty) {
      setEstimatedPrice(product.pricePerKg * parseInt(qty) || 0);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    submit(data);
  };

  return (
    <SiteLayout>
      <section className="bg-hero-gradient text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Form Minat Pembelian"
            title="Ajukan Ketertarikan Pembelian"
            description="Isi formulir ini dan tim kami akan menghubungi dengan penawaran terbaik."
            className="[&_h2]:text-white [&_p]:text-white/70 [&_span]:text-accent"
          />
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {trustItems.map((item) => (
              <div key={item.title} className="text-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto">
                  <item.icon className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-semibold">{item.title}</h4>
                <p className="text-xs text-muted-foreground hidden sm:block">{item.desc}</p>
              </div>
            ))}
          </div>

          {status === 'success' ? (
            <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center space-y-4 animate-scale-in">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800">Permintaan Terkirim!</h3>
              <p className="text-green-700">{message}</p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link
                  href="/produk"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Lihat produk lain <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 rounded-lg border border-green-300 text-green-700 text-sm font-medium hover:bg-green-100 transition-colors"
                >
                  Isi lagi
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-card border border-border p-6 sm:p-8">
              <Link href="/produk" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                <ArrowLeft className="h-4 w-4" /> Kembali ke katalog
              </Link>

              <div className="pt-2 border-t border-border">
                <h3 className="text-lg font-bold pt-4">Data Diri</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Nama Lengkap *</label>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Nama Anda"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Nama Perusahaan/Usaha</label>
                  <input
                    name="company"
                    type="text"
                    placeholder="Resto, Catering, Toko, dll"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">No. Telepon *</label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Email *</label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="email@anda.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Kota Tujuan Pengiriman *</label>
                <input
                  required
                  name="city"
                  type="text"
                  placeholder="Kota/Kabupaten, Provinsi"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="pt-4 border-t border-border">
                <h3 className="text-lg font-bold pt-4">Detail Pembelian</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Produk yang Diminati *</label>
                <select
                  required
                  name="productInterest"
                  value={selectedProduct}
                  onChange={(e) => handleProductChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Pilih produk</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.name}>
                      {product.name} — {formatRupiah(product.pricePerKg)}/kg
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Jumlah (kg) *</label>
                  <input
                    required
                    name="quantityKg"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    placeholder="contoh: 500"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Estimasi Harga</label>
                  <div className="px-4 py-2.5 rounded-lg border border-border bg-muted text-sm font-semibold text-primary">
                    {estimatedPrice > 0 ? formatRupiah(estimatedPrice) : '—'}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Catatan/Tambahan</label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Frekuensi pembelian, jadwal pengiriman, pertanyaan..."
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" /> Kirim Minat Pembelian
                  </>
                )}
              </button>
              <p className="text-xs text-center text-muted-foreground">
                * Data dikirim secara simulasi (belum tersimpan ke database)
              </p>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
