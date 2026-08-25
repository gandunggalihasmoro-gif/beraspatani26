import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://beraspatani26.id';
  const staticPages = [
    '', '/tentang', '/produk', '/proses-produksi', '/kemitraan',
    '/edukasi', '/faq', '/kontak', '/minat-pembelian', '/admin',
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
    })),
  ];
}
