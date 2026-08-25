'use client';

import Link from 'next/link';
import {
  MapPin, Phone, Mail, Clock, Send, CheckCircle2,
  Facebook, Instagram, Youtube,
} from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import { SectionHeading } from '@/components/site/SectionHeading';
import { useFormSubmit } from '@/hooks/use-form-submit';

const contactInfo = [
  { icon: MapPin, label: 'Alamat', value: 'Jl. Sawah Subur No. 26, Patani, Sulawesi Selatan', href: '#' },
  { icon: Phone, label: 'Telepon', value: '+62 812-3456-7890', href: 'tel:+6281234567890' },
  { icon: Mail, label: 'Email', value: 'info@beraspatani26.id', href: 'mailto:info@beraspatani26.id' },
  { icon: Clock, label: 'Jam Operasional', value: 'Senin–Sabtu: 08.00–17.00 WTA', href: null },
];

export default function KontakPage() {
  const { status, message, submit } = useFormSubmit();

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
            eyebrow="Kontak"
            title="Hubungi Kami"
            description="Ada pertanyaan? Tim kami siap membantu Anda."
            className="[&_h2]:text-white [&_p]:text-white/70 [&_span]:text-accent"
          />
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                {contactInfo.map((info) => {
                  const content = (
                    <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                        <info.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                        <p className="font-medium">{info.value}</p>
                      </div>
                    </div>
                  );
                  return info.href ? (
                    <a key={info.label} href={info.href} className="block">{content}</a>
                  ) : (
                    <div key={info.label}>{content}</div>
                  );
                })}
              </div>

              {/* Map placeholder */}
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="aspect-[16/10] bg-hero-gradient flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                  <div className="relative text-center space-y-2">
                    <MapPin className="h-12 w-12 mx-auto text-accent" />
                    <p className="text-white font-medium">Patani, Sulawesi Selatan</p>
                    <p className="text-white/60 text-sm">Peta lokasi akan tersedia segera</p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="flex gap-3">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="YouTube">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              {status === 'success' ? (
                <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center space-y-4 animate-scale-in">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800">Pesan Terkirim!</h3>
                  <p className="text-green-700">{message}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Kirim pesan lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-card border border-border p-6 sm:p-8">
                  <h3 className="text-xl font-bold">Kirim Pesan</h3>

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

                  <div className="grid sm:grid-cols-2 gap-4">
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
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Subjek *</label>
                    <input
                      required
                      name="subject"
                      type="text"
                      placeholder="Topik pesan Anda"
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Pesan *</label>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      placeholder="Tulis pesan Anda..."
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
                        <Send className="h-4 w-4" /> Kirim Pesan
                      </>
                    )}
                  </button>
                  <p className="text-xs text-center text-muted-foreground">
                    * Data dikirim secara simulasi (belum tersimpan ke database)
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
