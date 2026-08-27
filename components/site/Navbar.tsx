'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  Menu,
  X,
  Wheat,
  Phone,
  UserRound,
  LogIn,
} from 'lucide-react';

import type { User } from '@supabase/supabase-js';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { supabase } from '../../lib/supabase';

const navLinks = [
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
  {
    href: '/kemitraan',
    label: 'Kemitraan',
  },
  {
    href: '/edukasi',
    label: 'Edukasi',
  },
  {
    href: '/faq',
    label: 'FAQ',
  },
  {
    href: '/kontak',
    label: 'Kontak',
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  const [user, setUser] =
    useState<User | null>(null);

  const [authLoading, setAuthLoading] =
    useState(true);

  /*
   * Mendeteksi scroll navbar.
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener(
      'scroll',
      handleScroll
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );
    };
  }, []);

  /*
   * Tutup menu mobile saat pindah halaman.
   */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /*
   * Cek status login Supabase.
   */
  useEffect(() => {
    let mounted = true;

    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (mounted) {
        setUser(user);
        setAuthLoading(false);
      }
    }

    checkUser();

    const {
      data: {
        subscription,
      },
    } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (!mounted) {
            return;
          }

          setUser(
            session?.user ?? null
          );

          setAuthLoading(false);
        }
      );

    return () => {
      mounted = false;

      subscription.unsubscribe();
    };
  }, []);

  const isActive = (
    href: string
  ) => {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname.startsWith(
      href
    );
  };

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-300',

          scrolled
            ? 'border-b border-border bg-background/95 shadow-md backdrop-blur-md'
            : 'bg-background/80 backdrop-blur-sm'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="flex h-16 items-center justify-between">

            {/* LOGO */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-105">
                <Wheat className="h-5 w-5" />
              </div>

              <div className="flex flex-col">

                <span className="text-lg font-bold leading-tight text-primary">
                  BerasPatani26
                </span>

                <span className="text-[10px] leading-tight text-muted-foreground">
                  Gabah • Beras • Hasil Panen
                </span>

              </div>
            </Link>

            {/* MENU DESKTOP */}
            <nav className="hidden items-center gap-1 lg:flex">

              {navLinks.map(
                (link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors',

                      isActive(
                        link.href
                      )
                        ? 'text-primary'
                        : 'text-foreground/70 hover:bg-primary/5 hover:text-primary'
                    )}
                  >
                    {link.label}

                    {isActive(
                      link.href
                    ) && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary" />
                    )}
                  </Link>
                )
              )}

            </nav>

            {/* TOMBOL DESKTOP */}
            <div className="hidden items-center gap-2 lg:flex">

              <Button
                asChild
                size="sm"
                className="bg-primary hover:bg-primary/90"
              >
                <Link href="/minat-pembelian">
                  Form Minat Pembelian
                </Link>
              </Button>

              {!authLoading && (
                <>
                  {user ? (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="gap-2"
                    >
                      <Link href="/akun">
                        <UserRound className="h-4 w-4" />
                        Akun Saya
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="gap-2"
                    >
                      <Link href="/login">
                        <LogIn className="h-4 w-4" />
                        Masuk
                      </Link>
                    </Button>
                  )}
                </>
              )}

            </div>

            {/* TOMBOL MENU MOBILE */}
            <button
              type="button"
              className="rounded-lg p-2 transition-colors hover:bg-muted lg:hidden"
              onClick={() =>
                setMobileOpen(
                  !mobileOpen
                )
              }
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

          </div>

        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">

          {/* OVERLAY */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() =>
              setMobileOpen(false)
            }
          />

          <div className="absolute left-0 right-0 top-16 animate-fade-in border-b border-border bg-background shadow-lg">

            <nav className="flex flex-col gap-1 px-4 py-4">

              {navLinks.map(
                (link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'rounded-lg px-4 py-3 text-sm font-medium transition-colors',

                      isActive(
                        link.href
                      )
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground/80 hover:bg-muted'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}

              {/* FORM MINAT PEMBELIAN */}
              <Link
                href="/minat-pembelian"
                className="mt-2 rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                Form Minat Pembelian
              </Link>

              {/* LOGIN / AKUN */}
              {!authLoading && (
                <>
                  {user ? (
                    <Link
                      href="/akun"
                      className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                      <UserRound className="h-4 w-4" />
                      Akun Saya
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                      <LogIn className="h-4 w-4" />
                      Masuk
                    </Link>
                  )}
                </>
              )}

              {/* TELEPON */}
              <a
                href="tel:+6281572316412"
                className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Phone className="h-4 w-4" />
                081572316412
              </a>

            </nav>

          </div>

        </div>
      )}
    </>
  );
}