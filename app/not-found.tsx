import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-section-gradient px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto">
          <Search className="h-10 w-10" />
        </div>
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-xl font-semibold">Halaman Tidak Ditemukan</h2>
        <p className="text-muted-foreground">
          Maaf, halaman yang Anda cari tidak tersedia. Mungkin telah dipindahkan atau tidak ada.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
          >
            <Home className="h-4 w-4" /> Ke Beranda
          </Link>
          <Link
            href="/produk"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border font-semibold hover:bg-muted transition-all"
          >
            <ArrowLeft className="h-4 w-4" /> Lihat Produk
          </Link>
        </div>
      </div>
    </div>
  );
}
