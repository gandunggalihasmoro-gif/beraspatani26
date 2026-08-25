import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sprout, Wheat } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import { SectionHeading } from '@/components/site/SectionHeading';
import { processSteps } from '@/lib/data';

export const metadata = {
  title: 'Proses Produksi — BerasPatani26',
  description:
    '7 tahap produksi beras berkualitas: dari penanaman, panen, pengeringan, sortasi, penggilingan, quality control, hingga distribusi.',
};

export default function ProsesProduksiPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-white py-24">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/11053137/pexels-photo-11053137.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Petani di sawah"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm font-medium mb-4">
            Dari Sawah ke Meja Makan
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Proses Produksi 7 Tahap
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Setiap butir beras BerasPatani26 melalui 7 tahap produksi yang terjaga
            kualitasnya — dari penanaman hingga distribusi.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden sm:block" />
            <div className="space-y-12">
              {processSteps.map((step, idx) => (
                <div
                  key={step.id}
                  className={`flex flex-col sm:flex-row gap-6 ${idx % 2 === 1 ? 'sm:flex-row-reverse' : ''}`}
                >
                  {/* Number circle */}
                  <div className="relative shrink-0 z-10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold text-xl shadow-lg">
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="grid sm:grid-cols-2 gap-0">
                      <div className="aspect-video sm:aspect-auto overflow-hidden bg-muted">
                        <img
                          src={step.imageUrl}
                          alt={step.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent-foreground">
                            Tahap {step.step}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> {step.duration}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 bg-section-gradient">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="Quality Control"
            title="Standar Kualitas yang Kami Jaga"
            description="Parameter yang diukur di setiap batch produksi."
          />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Kadar Air', value: '13-14%' },
              { label: 'Broken', value: '< 5%' },
              { label: 'Keputihan', value: 'Grade 1' },
              { label: 'Kotoran', value: '< 1%' },
              { label: 'Hampa', value: '< 1%' },
              { label: 'Aroma', value: 'Wangi khas' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-card border border-border p-4 text-center">
                <p className="text-2xl font-bold text-primary">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Sprout className="h-12 w-12 mx-auto text-primary mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ingin Menjadi Petani Mitra?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Kami memberikan pendampingan teknis, bibit unggul, dan harga jaminan
            untuk petani mitra. Mari bersama membangun pertanian yang berkelanjutan.
          </p>
          <Link
            href="/kemitraan"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
          >
            Daftar Kemitraan <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
