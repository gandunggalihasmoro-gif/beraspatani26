import Link from 'next/link';
import { Target, Eye, Leaf, Users, Award, TrendingUp, ArrowRight, Sprout, Heart, Globe } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import { SectionHeading } from '@/components/site/SectionHeading';

export const metadata = {
  title: 'Tentang Kami — BerasPatani26',
  description:
    'BerasPatani26 adalah bisnis pertanian yang menyalurkan gabah dan beras berkualitas dari petani Patani. Pelajari visi, misi, dan nilai kami.',
};

export default function TentangPage() {
  const values = [
    { icon: Leaf, title: 'Kualitas', desc: 'Setiap butir beras melalui kontrol kualitas ketat untuk memastikan standar terbaik.' },
    { icon: Users, title: 'Kemitraan', desc: 'Membangun hubungan jangka panjang yang saling menguntungkan dengan petani mitra.' },
    { icon: Heart, title: 'Kejujuran', desc: 'Transparansi dalam harga, kualitas, dan proses. Tidak ada yang disembunyikan.' },
    { icon: Globe, title: 'Keberlanjutan', desc: 'Praktik pertanian berkelanjutan yang menjaga kesuburan tanah dan lingkungan.' },
  ];

  const milestones = [
    { year: '2018', title: 'Awal Mula', desc: 'Dimulai sebagai penggilingan kecil dengan 5 petani mitra di Patani.' },
    { year: '2020', title: 'Ekspansi', desc: 'Memperluas jaringan ke 30 petani mitra dan mulai distribusi antar pulau.' },
    { year: '2023', title: 'Modernisasi', desc: 'Investasi mesin pengeringan dan sortasi modern untuk meningkatkan kapasitas.' },
    { year: '2026', title: 'Saat Ini', desc: '120+ petani mitra, 45+ kota terlayani, 3.500 ton gabah per tahun.' },
  ];

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-white py-24">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/15994341/pexels-photo-15994341.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Sawah"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm font-medium mb-4">
            Tentang BerasPatani26
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Dari Petani, Untuk Nusantara
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            BerasPatani26 lahir dari kepedulian terhadap kesejahteraan petani dan
            kualitas pangan nasional. Kami menghubungkan sawah subur Patani dengan
            meja makan keluarga Indonesia.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <SectionHeading
                eyebrow="Kisah Kami"
                title="Dari Penggilingan Kecil ke Bisnis Pertanian Terpercaya"
              />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  BerasPatani26 bermula pada tahun 2018 sebagai sebuah penggilingan
                  padi kecil di Patani, Sulawesi Selatan. Berawal dari kegelisahan
                  melihat petani yang kesulitan memasarkan hasil panen dengan harga
                  yang adil, pendiri kami memulai dengan 5 petani mitra.
                </p>
                <p>
                  Dengan komitmen pada kualitas dan kejujuran, kami bertumbuh
                  secara organik. Setiap tahun, jaringan petani mitra kami
                  bertambah, kapasitas produksi meningkat, dan wilayah distribusi
                  meluas hingga ke seluruh Nusantara.
                </p>
                <p>
                  Kini, dengan 120+ petani mitra dan teknologi modern, kami bangga
                  menjadi jembatan antara kesuburan tanah Patani dan kebutuhan
                  pangan masyarakat Indonesia.
                </p>
              </div>
              <Link
                href="/kemitraan"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                Pelajari program kemitraan <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <img
                src="https://images.pexels.com/photos/35782264/pexels-photo-35782264.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Petani di sawah Patani"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-section-gradient">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl bg-card border border-border p-8 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Visi</h3>
              <p className="text-muted-foreground leading-relaxed">
                Menjadi bisnis pertanian terpercaya yang menyalurkan gabah dan beras
                berkualitas dari petani Patani ke seluruh Nusantara, serta meningkatkan
                kesejahteraan petani melalui kemitraan yang adil dan berkelanjutan.
              </p>
            </div>
            <div className="rounded-2xl bg-card border border-border p-8 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Misi</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary">•</span> Memberdayakan petani melalui pendampingan teknis dan akses pasar</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Menjamin kualitas produk dari sawah hingga distribusi</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Membangun ekosistem pertanian berkelanjutan</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Memberikan harga adil bagi petani dan pembeli</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Nilai Kami" title="Prinsip yang Kami Pegang" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="text-center space-y-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-lg">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-section-gradient">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Perjalanan Kami" title="Tonggak Sejarah BerasPatani26" />
          <div className="mt-12 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden lg:block" />
            <div className="space-y-8">
              {milestones.map((m, idx) => (
                <div
                  key={m.year}
                  className={`flex flex-col lg:flex-row gap-6 items-center ${
                    idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1 lg:text-right">
                    {idx % 2 === 0 ? (
                      <div className="rounded-xl bg-card border border-border p-6 inline-block">
                        <span className="text-2xl font-bold text-primary">{m.year}</span>
                        <h4 className="font-semibold mt-1">{m.title}</h4>
                        <p className="text-sm text-muted-foreground mt-2">{m.desc}</p>
                      </div>
                    ) : (
                      <div className="hidden lg:block" />
                    )}
                  </div>
                  <div className="flex h-4 w-4 rounded-full bg-primary ring-4 ring-background z-10 shrink-0" />
                  <div className="flex-1">
                    {idx % 2 !== 0 ? (
                      <div className="rounded-xl bg-card border border-border p-6 inline-block">
                        <span className="text-2xl font-bold text-primary">{m.year}</span>
                        <h4 className="font-semibold mt-1">{m.title}</h4>
                        <p className="text-sm text-muted-foreground mt-2">{m.desc}</p>
                      </div>
                    ) : (
                      <div className="lg:hidden">
                        <div className="rounded-xl bg-card border border-border p-6">
                          <span className="text-2xl font-bold text-primary">{m.year}</span>
                          <h4 className="font-semibold mt-1">{m.title}</h4>
                          <p className="text-sm text-muted-foreground mt-2">{m.desc}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Sprout className="h-12 w-12 mx-auto text-primary mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Bergabung dengan Ekosistem Kami</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Apakah Anda petani, distributor, atau pembeli? Mari berkolaborasi
            untuk pertanian Indonesia yang lebih baik.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/kemitraan"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
            >
              Jadi Mitra <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/produk"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border font-semibold hover:bg-muted transition-all"
            >
              Lihat Produk
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
