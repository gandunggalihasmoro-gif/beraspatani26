import Link from 'next/link';

import {
  Wheat,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react';

const footerLinks = {
  navigasi: [
    {
      href: '/',
      label: 'Beranda',
    },
    {
      href: '/tentang',
      label: 'Tentang',
    },
    {
      href: '/produk',
      label: 'Produk',
    },
    {
      href: '/proses-produksi',
      label: 'Proses Produksi',
    },
  ],

  layanan: [
    {
      href: '/kemitraan',
      label: 'Kemitraan',
    },
    {
      href: '/minat-pembelian',
      label: 'Form Minat Pembelian',
    },
    {
      href: '/edukasi',
      label: 'Edukasi',
    },
    {
      href: '/faq',
      label: 'FAQ',
    },
  ],

  kontak: [
    {
      href: '/kontak',
      label: 'Hubungi Kami',
    },
    {
      href: '/kontak',
      label: 'Lokasi & Peta',
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* BRAND */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-800">
                <Wheat className="h-6 w-6 text-amber-400" />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  BerasPatani26
                </h2>

                <p className="text-sm text-emerald-200">
                  Gabah • Beras • Hasil Panen
                </p>
              </div>
            </div>

            <p className="max-w-md leading-7 text-emerald-100">
              Menyalurkan gabah dan beras berkualitas dari
              petani Patani ke seluruh Nusantara. Bisnis
              pertanian yang aktif, terpercaya, dan
              berkelanjutan.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Facebook BerasPatani26"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-900 transition hover:bg-emerald-800"
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href="#"
                aria-label="Instagram BerasPatani26"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-900 transition hover:bg-emerald-800"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="#"
                aria-label="YouTube BerasPatani26"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-900 transition hover:bg-emerald-800"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* NAVIGASI + LAYANAN */}
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-5 font-bold text-amber-400">
                Navigasi
              </h3>

              <ul className="space-y-3">
                {footerLinks.navigasi.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-emerald-100 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-5 font-bold text-amber-400">
                Layanan
              </h3>

              <ul className="space-y-3">
                {footerLinks.layanan.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-emerald-100 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* KONTAK */}
          <div>
            <h3 className="mb-5 font-bold text-amber-400">
              Kontak
            </h3>

            <div className="space-y-4 text-emerald-100">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-none text-amber-400" />

                <p>
                  Kp Cikeris, Ds. Simpen Kidul,
                  <br />
                  Kab. Garut, Jawa Barat
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-none text-amber-400" />

                <a
                  href="tel:+6281572316412"
                  className="transition hover:text-white"
                >
                  081572316412
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-none text-amber-400" />

                <a
                  href="mailto:info@beraspatani26.id"
                  className="transition hover:text-white"
                >
                  info@beraspatani26.id
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-1 h-5 w-5 flex-none text-amber-400" />

                <p>
                  Senin–Sabtu: 08.00–17.00 WIB
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-emerald-800 pt-6">
          <div className="flex flex-col gap-3 text-sm text-emerald-300 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} BerasPatani26.
              Seluruh hak cipta dilindungi.
            </p>

            <p>
              Gabah • Beras • Hasil Panen
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}