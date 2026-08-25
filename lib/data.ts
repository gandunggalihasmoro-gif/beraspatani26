import {
  Product,
  ProcessStep,
  Article,
  FaqItem,
  Partner,
  BuyerLead,
  ContactMessage,
  PartnershipLead,
  ReplyTemplate,
} from './types';

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'beras-premium-setra-ramayana',
    name: 'Beras Premium Setra Ramayana',
    category: 'beras',
    grade: 'Premium',
    pricePerKg: 14500,
    minOrder: 25,
    stockKg: 5000,
    stockStatus: 'tersedia',
    description:
      'Beras premium varietas Setra Ramayana dengan butiran pulen, putih bersih, dan aroma wangi khas. Dipanen langsung dari sawah subur Patani, diolah dengan teknologi modern untuk menjaga kualitas tertinggi.',
    origin: 'Patani, Sulawesi Selatan',
    harvestDate: '2026-07-15',
    shelfLife: '12 bulan',
    packaging: 'Karung 25kg / Sak 5kg',
    imageUrl: 'https://images.pexels.com/photos/7232901/pexels-photo-7232901.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/7232901/pexels-photo-7232901.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/36346840/pexels-photo-36346840.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/164504/pexels-photo-164504.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    specifications: [
      { label: 'Varietas', value: 'Setra Ramayana' },
      { label: 'Tekstur', value: 'Pulen' },
      { label: 'Kadar Air', value: '14% max' },
      { label: 'Keputihan', value: 'Grade 1' },
      { label: 'Broken', value: '< 5%' },
      { label: 'Aroma', value: 'Wangi khas' },
    ],
    featured: true,
    createdAt: '2026-07-20T08:00:00Z',
  },
  {
    id: 'p2',
    slug: 'beras-merah-organik-patani',
    name: 'Beras Merah Organik Patani',
    category: 'beras',
    grade: 'Premium',
    pricePerKg: 18000,
    minOrder: 10,
    stockKg: 800,
    stockStatus: 'terbatas',
    description:
      'Beras merah organik dari sawah tradisional Patani tanpa pestisida. Kaya serat, rendah indeks glikemik, cocok untuk diet sehat. Dibudidayakan dengan sistem pertanian alami.',
    origin: 'Patani, Sulawesi Selatan',
    harvestDate: '2026-06-28',
    shelfLife: '10 bulan',
    packaging: 'Karung 25kg / Sak 5kg',
    imageUrl: 'https://images.pexels.com/photos/18328392/pexels-photo-18328392.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/18328392/pexels-photo-18328392.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/18446086/pexels-photo-18446086.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    specifications: [
      { label: 'Varietas', value: 'Beras Merah Lokal' },
      { label: 'Tekstur', value: 'Pera' },
      { label: 'Kadar Air', value: '13% max' },
      { label: 'Organik', value: 'Ya (tanpa pestisida)' },
      { label: 'Serat', value: 'Tinggi' },
      { label: 'IG', value: 'Rendah (42)' },
    ],
    featured: true,
    createdAt: '2026-07-05T08:00:00Z',
  },
  {
    id: 'p3',
    slug: 'gabah-kering-panen-murni',
    name: 'Gabah Kering Panen Murni',
    category: 'gabah',
    grade: 'Grade A',
    pricePerKg: 7500,
    minOrder: 100,
    stockKg: 15000,
    stockStatus: 'tersedia',
    description:
      'Gabah kering panen murni dengan kadar air rendah, bersih dari kotoran dan hama. Cocok untuk penggilingan atau distributor beras dalam skala besar.',
    origin: 'Patani & sekitarnya',
    harvestDate: '2026-07-10',
    shelfLife: '6 bulan (simpan kering)',
    packaging: 'Karung 50kg',
    imageUrl: 'https://images.pexels.com/photos/18446086/pexels-photo-18446086.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/18446086/pexels-photo-18446086.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/236473/pexels-photo-236473.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    specifications: [
      { label: 'Kadar Air', value: '14% max' },
      { label: 'Kotoran', value: '< 2%' },
      { label: 'Hampa', value: '< 1%' },
      { label: 'Warna', value: 'Kuning keemasan' },
      { label: 'Sortasi', value: 'Bersih' },
    ],
    featured: true,
    createdAt: '2026-07-15T08:00:00Z',
  },
  {
    id: 'p4',
    slug: 'beras-medium-ir-64',
    name: 'Beras Medium IR 64',
    category: 'beras',
    grade: 'Grade A',
    pricePerKg: 12000,
    minOrder: 50,
    stockKg: 8000,
    stockStatus: 'tersedia',
    description:
      'Beras IR 64 kualitas Grade A dengan tekstur sedang, cocok untuk konsumsi harian rumah tangga dan industri catering. Harga terjangkau dengan kualitas terjamin.',
    origin: 'Patani, Sulawesi Selatan',
    harvestDate: '2026-07-01',
    shelfLife: '12 bulan',
    packaging: 'Karung 25kg',
    imageUrl: 'https://images.pexels.com/photos/36346840/pexels-photo-36346840.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/36346840/pexels-photo-36346840.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/7665442/pexels-photo-7665442.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    specifications: [
      { label: 'Varietas', value: 'IR 64' },
      { label: 'Tekstur', value: 'Sedang' },
      { label: 'Kadar Air', value: '14% max' },
      { label: 'Broken', value: '< 10%' },
      { label: 'Keputihan', value: 'Grade 2' },
    ],
    featured: false,
    createdAt: '2026-07-18T08:00:00Z',
  },
  {
    id: 'p5',
    slug: 'beras-ketan-putih-murni',
    name: 'Beras Ketan Putih Murni',
    category: 'beras',
    grade: 'Premium',
    pricePerKg: 16000,
    minOrder: 10,
    stockKg: 1200,
    stockStatus: 'tersedia',
    description:
      'Beras ketan putih murni dengan butiran pendek, lengket saat dimasak, ideal untuk membuat lemang, ketupat, dan kue tradisional.',
    origin: 'Patani, Sulawesi Selatan',
    harvestDate: '2026-06-20',
    shelfLife: '12 bulan',
    packaging: 'Sak 5kg / Karung 25kg',
    imageUrl: 'https://images.pexels.com/photos/7665442/pexels-photo-7665442.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/7665442/pexels-photo-7665442.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/38781904/pexels-photo-38781904.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    specifications: [
      { label: 'Varietas', value: 'Ketan Putih' },
      { label: 'Tekstur', value: 'Lengket' },
      { label: 'Kadar Air', value: '13% max' },
      { label: 'Butiran', value: 'Pendek, bulat' },
    ],
    featured: false,
    createdAt: '2026-07-10T08:00:00Z',
  },
  {
    id: 'p6',
    slug: 'beras-pulen-aroma-melati',
    name: 'Beras Pulen Aroma Melati',
    category: 'beras',
    grade: 'Premium',
    pricePerKg: 15500,
    minOrder: 25,
    stockKg: 0,
    stockStatus: 'habis',
    description:
      'Beras pulen dengan aroma melati yang khas, butiran panjang dan jernih. Pilihan favorit untuk restoran dan hotel berbintang.',
    origin: 'Patani, Sulawesi Selatan',
    harvestDate: '2026-05-30',
    shelfLife: '12 bulan',
    packaging: 'Karung 25kg / Sak 5kg',
    imageUrl: 'https://images.pexels.com/photos/38781904/pexels-photo-38781904.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/38781904/pexels-photo-38781904.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/7232901/pexels-photo-7232901.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    specifications: [
      { label: 'Varietas', value: 'Aroma Melati F1' },
      { label: 'Tekstur', value: 'Sangat Pulen' },
      { label: 'Kadar Air', value: '13% max' },
      { label: 'Broken', value: '< 3%' },
      { label: 'Aroma', value: 'Melati (wangi)' },
    ],
    featured: false,
    createdAt: '2026-06-25T08:00:00Z',
  },
  {
    id: 'p7',
    slug: 'dedak-pakan-ternak',
    name: 'Dedak Pakan Ternak',
    category: 'olahan',
    grade: 'Grade B',
    pricePerKg: 3500,
    minOrder: 50,
    stockKg: 3000,
    stockStatus: 'tersedia',
    description:
      'Dedak hasil samping penggilingan padi, kaya nutrisi untuk pakan ternak ayam, sapi, dan kambing. Dikemas bersih dan kering.',
    origin: 'Penggilingan BerasPatani26',
    harvestDate: '2026-07-22',
    shelfLife: '3 bulan (simpan kering)',
    packaging: 'Karung 50kg',
    imageUrl: 'https://images.pexels.com/photos/164504/pexels-photo-164504.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/164504/pexels-photo-164504.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    specifications: [
      { label: 'Kadar Air', value: '12% max' },
      { label: 'Kandungan', value: 'Serat, protein, lemak' },
      { label: 'Untuk', value: 'Ayam, Sapi, Kambing' },
    ],
    featured: false,
    createdAt: '2026-07-22T08:00:00Z',
  },
  {
    id: 'p8',
    slug: 'meniran-padi-kering',
    name: 'Meniran Padi Kering',
    category: 'gabah',
    grade: 'Grade B',
    pricePerKg: 6000,
    minOrder: 100,
    stockKg: 5000,
    stockStatus: 'tersedia',
    description:
      'Meniran padi kering — gabah yang belum disosoh sempurna, cocok untuk penggiling skala menengah yang ingin mengontrol kualitas sosoh sendiri.',
    origin: 'Patani & sekitarnya',
    harvestDate: '2026-07-12',
    shelfLife: '6 bulan (simpan kering)',
    packaging: 'Karung 50kg',
    imageUrl: 'https://images.pexels.com/photos/236473/pexels-photo-236473.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/236473/pexels-photo-236473.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    specifications: [
      { label: 'Kadar Air', value: '14% max' },
      { label: 'Sosoh', value: 'Sebagian (meniran)' },
      { label: 'Kotoran', value: '< 3%' },
    ],
    featured: false,
    createdAt: '2026-07-14T08:00:00Z',
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: 'ps1',
    step: 1,
    title: 'Penanaman & Budidaya',
    description:
      'Petani mitra menanam bibit unggul di sawah subur Patani. Kami memberikan pendampingan teknis mulai dari pemilihan bibit, pengairan, hingga pemupukan organik untuk memastikan kualitas panen terbaik.',
    imageUrl: 'https://images.pexels.com/photos/13839277/pexels-photo-13839277.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    duration: '90-110 hari',
  },
  {
    id: 'ps2',
    step: 2,
    title: 'Panen',
    description:
      'Padi dipanen pada tingkat kematangan optimal (90-95% bulir menguning). Panen dilakukan dengan alat modern (reaper) maupun tradisional, menjaga bulir tetap utuh dan tidak rusak.',
    imageUrl: 'https://images.pexels.com/photos/33940374/pexels-photo-33940374.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    duration: '1-3 hari',
  },
  {
    id: 'ps3',
    step: 3,
    title: 'Pengeringan Gabah',
    description:
      'Gabah hasil panen dikeringkan hingga kadar air mencapai 14% atau kurang. Kami menggunakan kombinasi jemur dan dryer mekanis untuk menjamin keseragaman dan mencegah pertumbuhan jamur.',
    imageUrl: 'https://images.pexels.com/photos/35544010/pexels-photo-35544010.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    duration: '2-3 hari',
  },
  {
    id: 'ps4',
    step: 4,
    title: 'Sortasi & Penyimpanan',
    description:
      'Gabah kering disortasi untuk memisahkan kotoran, hampa, dan bulir rusak. Lalu disimpan di gudang berventilasi baik dengan suhu terkontrol untuk menjaga kualitas.',
    imageUrl: 'https://images.pexels.com/photos/4712729/pexels-photo-4712729.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    duration: 'Berkelanjutan',
  },
  {
    id: 'ps5',
    step: 5,
    title: 'Penggilingan & Sosoh',
    description:
      'Gabah digiling dan disosoh dengan mesin modern untuk menghasilkan beras putih bersih. Tingkat keputihan dan broken di kontrol sesuai standar grade masing-masing produk.',
    imageUrl: 'https://images.pexels.com/photos/29797010/pexels-photo-29797010.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    duration: '1 hari per batch',
  },
  {
    id: 'ps6',
    step: 6,
    title: 'Quality Control & Pengemasan',
    description:
      'Setiap batch beras melalui quality control: cek kadar air, keputihan, broken, dan aroma. Lalu dikemas dalam karung atau sak sesuai standar, siap didistribusikan.',
    imageUrl: 'https://images.pexels.com/photos/38781904/pexels-photo-38781904.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    duration: '1-2 hari',
  },
  {
    id: 'ps7',
    step: 7,
    title: 'Distribusi',
    description:
      'Beras dikirim ke pelanggan melalui jaringan logistik terpercaya. Pengiriman dilacak dan dijamin sampai dalam kondisi baik, ke seluruh wilayah Nusantara.',
    imageUrl: 'https://images.pexels.com/photos/11053137/pexels-photo-11053137.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    duration: '1-7 hari pengiriman',
  },
];

export const articles: Article[] = [
  {
    id: 'a1',
    slug: 'cara-memilih-beras-berkualitas',
    title: 'Cara Memilih Beras Berkualitas: 6 Hal yang Wajib Dicek',
    excerpt:
      'Tidak semua beras di pasaran memiliki kualitas sama. Pelajari 6 kriteria penting untuk memilih beras terbaik untuk keluarga Anda.',
    content:
      'Memilih beras berkualitas bukan sekadar melihat dari harganya. Ada beberapa indikator penting yang perlu diperhatikan...\n\n1. **Keputihan** — Beras berkualitas memiliki warna putih bersih, tidak keruh atau kekuningan (kecuali beras merah/ketan).\n\n2. **Kadar Air** — Idealnya di bawah 14%. Beras terlalu lembap akan cepat berbau dan berjamur.\n\n3. **Broken (bulir pecah)** — Semakin sedikit broken, semakin tinggi kualitas. Beras premium memiliki broken < 5%.\n\n4. **Aroma** — Beras segar berbau wangi khas, tidak apek atau tengik.\n\n5. **Kebersihan** — Bebas dari kotoran, batu, dan hama seperti kutu beras.\n\n6. **Tekstur setelah masak** — Beras baik menghasilkan nasi pulen/pera sesuai varietas, tidak lembek atau keras.',
    category: 'Tips Konsumen',
    author: 'Tim BerasPatani26',
    imageUrl: 'https://images.pexels.com/photos/7232901/pexels-photo-7232901.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    publishedAt: '2026-08-10T08:00:00Z',
    readTime: 4,
  },
  {
    id: 'a2',
    slug: 'manfaat-beras-merah-untuk-kesehatan',
    title: 'Manfaat Beras Merah untuk Kesehatan & Diet',
    excerpt:
      'Beras merah organik kaya serat dan rendah indeks glikemik. Simak manfaatnya untuk kesehatan jantung, gula darah, dan program diet.',
    content:
      'Beras merah telah lama dikenal sebagai sumber karbohidrat kompleks yang lebih sehat dibanding beras putih...\n\n**Rendah Indeks Glikemik** — Beras merah memiliki IG sekitar 42, jauh lebih rendah dari beras putih (73). Cocok untuk penderita diabetes.\n\n**Kaya Serat** — Membantu pencernaan dan memberi rasa kenyang lebih lama.\n\n**Vitamin & Mineral** — Mengandung magnesium, fosfor, dan vitamin B yang baik untuk kesehatan tulang dan saraf.\n\n**Antioksidan** — Antosianin dalam beras merah membantu melawan radikal bebas.',
    category: 'Kesehatan',
    author: 'Tim BerasPatani26',
    imageUrl: 'https://images.pexels.com/photos/18328392/pexels-photo-18328392.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    publishedAt: '2026-08-05T08:00:00Z',
    readTime: 3,
  },
  {
    id: 'a3',
    slug: 'proses-pengeringan-gabah-yang-benar',
    title: 'Proses Pengeringan Gabah yang Benar: Mencegah Susut & Jamur',
    excerpt:
      'Pengeringan gabah adalah tahap krusial yang menentukan kualitas akhir beras. Pahami metode dan standar kadar air yang tepat.',
    content:
      'Pengeringan gabah adalah langkah kritis pasca panen. Kadar air yang terlalu tinggi menyebabkan gabah mudah berjamur, sementara terlalu kering menyebabkan bulir rentan pecah saat digiling...\n\n**Target Kadar Air**: 13-14% untuk penyimpanan jangka panjang.\n\n**Metode Jemur**: Tradisional, membutuhkan 2-3 hari cuaca cerah.\n\n**Metode Dryer Mekanis**: Lebih cepat dan konsisten, 6-8 jam.\n\n**Tips**: Jangan mengeringkan gabah di atas 50°C karena dapat memecahkan bulir.',
    category: 'Pengetahuan Petani',
    author: 'Tim BerasPatani26',
    imageUrl: 'https://images.pexels.com/photos/35544010/pexels-photo-35544010.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    publishedAt: '2026-07-28T08:00:00Z',
    readTime: 5,
  },
  {
    id: 'a4',
    slug: 'kemitraan-tani-menguntungkan',
    title: 'Model Kemitraan Tani: Dari Sawah ke Pasar Bersama BerasPatani26',
    excerpt:
      'Bagaimana kemitraan dengan BerasPatani26 menguntungkan petani? Simak program pendampingan, harga jaminan, dan akses pasar.',
    content:
      'BerasPatani26 membangun ekosistem pertanian yang berkelanjutan melalui kemitraan langsung dengan petani...\n\n**Harga Jaminan** — Kami menetapkan harga pembelian yang adil dan stabil, tidak terpengaruh fluktuasi spekulatif.\n\n**Pendampingan Teknis** — Penyuluhan pertanian, bibit unggul, dan praktik budidaya modern.\n\n**Akses Modal** — Bantuan modal usaha tani dengan skema yang ringan.\n\n**Akses Pasar** — Petani tidak perlu khawatir memasarkan hasil panen — kami yang menyalurkannya.',
    category: 'Kemitraan',
    author: 'Tim BerasPatani26',
    imageUrl: 'https://images.pexels.com/photos/35782264/pexels-photo-35782264.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    publishedAt: '2026-07-20T08:00:00Z',
    readTime: 4,
  },
  {
    id: 'a5',
    slug: 'cara-menyimpan-beras-agar-tidak-kutu',
    title: 'Cara Menyimpan Beras agar Tidak Berkutu dan Tahan Lama',
    excerpt:
      'Kutu beras adalah masalah umum yang mengurangi kualitas. Ikuti tips penyimpanan praktis agar beras tetap segar berbulan-bulan.',
    content:
      'Kutu beras (Sitophilus oryzae) adalah hama yang sering menyerang beras yang disimpan lama...\n\n1. Simpan di wadah kedap udara (toples kaca, kontainer plastik).\n2. Taruh daun salam atau cabai kering di dalam wadah — serangga tak suka aromanya.\n3. Simpan di tempat sejuk dan kering, hindari sinar matahari langsung.\n4. Jangan campur beras baru dengan beras lama.\n5. Periksa secara berkala, jika ada tanda kutu segera pisahkan.',
    category: 'Tips Konsumen',
    author: 'Tim BerasPatani26',
    imageUrl: 'https://images.pexels.com/photos/38781904/pexels-photo-38781904.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    publishedAt: '2026-07-15T08:00:00Z',
    readTime: 3,
  },
  {
    id: 'a6',
    slug: 'varietas-padi-unggul-patani',
    title: 'Varietas Padi Unggul yang Dibudidayakan di Patani',
    excerpt:
      'Kenali varietas padi unggul yang dibudidayakan petani mitra BerasPatani26 — dari Setra Ramayana hingga beras merah lokal.',
    content:
      'Patani memiliki tanah subur dan iklim ideal untuk budidaya padi. Berikut varietas unggul yang kami budidayakan...\n\n**Setra Ramayana** — Pulen, wangi, premium. Masa tanam 95-110 hari.\n\n**IR 64** — Tekstur sedang, produktivitas tinggi. Cocok untuk konsumsi massal.\n\n**Beras Merah Lokal** — Organik, kaya nutrisi. Dibudidayakan tradisional.\n\n**Ketan Putih** — Lengket, untuk kue tradisional dan ketupat.',
    category: 'Pengetahuan Petani',
    author: 'Tim BerasPatani26',
    imageUrl: 'https://images.pexels.com/photos/34203717/pexels-photo-34203717.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    publishedAt: '2026-07-08T08:00:00Z',
    readTime: 4,
  },
];

export const faqItems: FaqItem[] = [
  {
    id: 'f1',
    question: 'Berapa minimal pemesanan beras?',
    answer:
      'Minimal pemesanan bervariasi per produk. Untuk beras premium minimal 25 kg, gabah kering minimal 100 kg, dan produk olahan seperti dedak minimal 50 kg. Detail minimal order tertera di halaman setiap produk.',
    category: 'Pemesanan',
  },
  {
    id: 'f2',
    question: 'Apakah tersedia pengiriman ke seluruh Indonesia?',
    answer:
      'Ya, kami melayani pengiriman ke seluruh wilayah Nusantara. Untuk pengiriman dalam kota gratis untuk minimum 100 kg. Pengiriman luar kota menggunakan ekspedisi terpercaya dengan biaya sesuai tujuan.',
    category: 'Pengiriman',
  },
  {
    id: 'f3',
    question: 'Bagaimana cara membayar?',
    answer:
      'Pembayaran dilakukan via transfer bank atau e-wallet. Untuk pemesanan skala besar, kami menerima pembayaran DP 50% di awal dan pelunasan sebelum pengiriman. Detail rekening akan dikirim setelah konfirmasi pesanan.',
    category: 'Pembayaran',
  },
  {
    id: 'f4',
    question: 'Apakah harga bisa dinegosiasikan?',
    answer:
      'Untuk pemesanan grosir di atas 1 ton, kami terbuka untuk negosiasi harga. Silakan isi Form Minat Pembelian atau hubungi kami langsung untuk mendapatkan penawaran khusus.',
    category: 'Pemesanan',
  },
  {
    id: 'f5',
    question: 'Apakah beras yang dijual sudah bersih dan siap masak?',
    answer:
      'Ya, semua beras kami sudah melalui proses sosoh dan sortasi. Namun kami tetap menyarankan untuk dibilas sebentar sebelum dimasak, seperti praktik standar memasak nasi.',
    category: 'Produk',
  },
  {
    id: 'f6',
    question: 'Bagaimana cara menjadi mitra petani BerasPatani26?',
    answer:
      'Anda bisa mendaftar melalui halaman Kemitraan dengan mengisi formulir. Tim kami akan menghubungi untuk diskusi lebih lanjut mengenai program kemitraan, harga jaminan, dan pendampingan teknis.',
    category: 'Kemitraan',
  },
  {
    id: 'f7',
    question: 'Apakah BerasPatani26 melayani penjualan eceran?',
    answer:
      'Saat ini fokus kami adalah penjualan grosir dan semi-grosir dengan minimal order sesuai produk. Untuk eceran, kami sedang mengembangkan jaringan reseller dan agen di berbagai kota.',
    category: 'Pemesanan',
  },
  {
    id: 'f8',
    question: 'Bagaimana menjaga kualitas beras selama penyimpanan?',
    answer:
      'Simpan beras di wadah kedap udara, tempat sejuk dan kering. Tambahkan daun salam atau cabai kering untuk mencegah kutu. Jangan campur beras baru dengan yang lama, dan periksa secara berkala.',
    category: 'Produk',
  },
];

export const partners: Partner[] = [
  { id: 'pt1', name: 'Kelompok Tani Makmur Jaya', type: 'Petani', location: 'Patani, Sulsel', joinedAt: '2024-01-15', status: 'aktif' },
  { id: 'pt2', name: 'Distributor Pangan Sejahtera', type: 'Distributor', location: 'Makassar', joinedAt: '2024-03-20', status: 'aktif' },
  { id: 'pt3', name: 'Koperasi Sawah Subur', type: 'Petani', location: 'Bone, Sulsel', joinedAt: '2024-06-10', status: 'aktif' },
  { id: 'pt4', name: 'PT Sembako Nusantara', type: 'Distributor', location: 'Surabaya', joinedAt: '2025-01-05', status: 'aktif' },
  { id: 'pt5', name: 'Pengepul Gabah Sentosa', type: 'Pengepul', location: 'Parepare', joinedAt: '2025-04-12', status: 'pending' },
  { id: 'pt6', name: 'Toko Beras Berkah', type: 'Toko', location: 'Jeneponto', joinedAt: '2025-08-01', status: 'aktif' },
];

export const buyerLeads: BuyerLead[] = [
  { id: 'bl1', name: 'Ahmad Fauzi', company: 'Resto Nusantara', phone: '081234567890', email: 'ahmad@restaurantus.id', productInterest: 'Beras Premium Setra Ramayana', quantityKg: 500, city: 'Makassar', status: 'baru', createdAt: '2026-08-20T10:00:00Z', notes: 'Penggunaan untuk restoran, pengiriman mingguan' },
  { id: 'bl2', name: 'Siti Nurhaliza', company: 'Catering Berkah', phone: '081298765432', email: 'siti@cateringberkah.com', productInterest: 'Beras Medium IR 64', quantityKg: 300, city: 'Surabaya', status: 'diproses', createdAt: '2026-08-18T14:00:00Z', notes: 'Catering harian 2000 pax' },
  { id: 'bl3', name: 'Budi Santoso', company: 'PT Sembako Jaya', phone: '081377889900', email: 'budi@sembakojaya.co.id', productInterest: 'Gabah Kering Panen Murni', quantityKg: 5000, city: 'Surabaya', status: 'selesai', createdAt: '2026-08-10T09:00:00Z', notes: 'Penggilingan sendiri' },
  { id: 'bl4', name: 'Dewi Lestari', company: '', phone: '081255566778', email: 'dewi.l@gmail.com', productInterest: 'Beras Merah Organik Patani', quantityKg: 50, city: 'Jakarta', status: 'baru', createdAt: '2026-08-22T16:00:00Z', notes: 'Konsumsi rumah tangga' },
];

export const contactMessages: ContactMessage[] = [
  { id: 'cm1', name: 'Rudi Hartono', email: 'rudi.h@gmail.com', phone: '081211122233', subject: 'Tanya harga grosir', message: 'Halo, saya ingin tahu harga grosir untuk beras premium jika beli 2 ton. Apakah ada diskon?', status: 'belum-dibaca', createdAt: '2026-08-21T11:00:00Z' },
  { id: 'cm2', name: 'Maya Sari', email: 'maya.sari@email.com', phone: '081344455566', subject: 'Kerja sama distributor', message: 'Saya memiliki jaringan distribusi di Kalimantan, tertarik menjadi distributor beras BerasPatani26.', status: 'dibaca', createdAt: '2026-08-19T08:30:00Z' },
  { id: 'cm3', name: 'Joko Widodo', email: 'joko.w@email.com', phone: '081277788899', subject: 'Info varietas padi', message: 'Saya petani di Lumajang, ingin tahu varietas padi yang cocok untuk iklim di sana.', status: 'dibalas', createdAt: '2026-08-15T13:00:00Z' },
];

export const partnershipLeads: PartnershipLead[] = [
  { id: 'pl1', name: 'Hasanuddin', organization: 'Poktan Sawah Makmur', type: 'petani', phone: '081211100011', email: 'hasan@poktan.id', region: 'Patani, Sulsel', landArea: '5 hektar', message: 'Ingin bergabung sebagai mitra petani, punya 5 hektar sawah aktif.', status: 'baru', createdAt: '2026-08-20T10:00:00Z' },
  { id: 'pl2', name: 'Linda Wijaya', organization: 'CV Pangan Utama', type: 'distributor', phone: '081322200022', email: 'linda@panganutama.com', region: 'Medan', landArea: '-', message: 'Tertarik menjadi distributor di wilayah Sumatera Utara.', status: 'diproses', createdAt: '2026-08-17T15:00:00Z' },
  { id: 'pl3', name: 'Rahmat Hidayat', organization: 'Pengepul Hidayat', type: 'pengepul', phone: '081333300033', email: 'rahmat@hidayat.com', region: 'Bone', landArea: '-', message: 'Pengepul gabah di Bone, ingin supply gabah kering ke BerasPatani26.', status: 'selesai', createdAt: '2026-08-10T09:00:00Z' },
];

export const replyTemplates: ReplyTemplate[] = [
  { id: 'rt1', title: 'Balasan Harga Grosir', subject: 'Re: Informasi Harga Grosir', body: 'Halo,\n\nTerima kasih telah menghubungi BerasPatani26. Untuk pemesanan grosir, berikut penawaran kami:\n\n- Minimal order 500 kg\n- Harga spesial untuk pembelian di atas 1 ton\n- Pengiriman ke seluruh Indonesia\n\nSilakan isi Form Minat Pembelian di website kami untuk mendapatkan penawaran detail.\n\nSalam,\nTim BerasPatani26', category: 'Harga' },
  { id: 'rt2', title: 'Balasan Kemitraan', subject: 'Re: Kemitraan BerasPatani26', body: 'Halo,\n\nTerima kasih atas minat Anda menjadi mitra BerasPatani26. Kami sangat antusias untuk berkolaborasi.\n\nTim kami akan menghubungi Anda dalam 2x24 jam untuk diskusi lebih lanjut mengenai program kemitraan.\n\nSalam,\nTim Kemitraan BerasPatani26', category: 'Kemitraan' },
  { id: 'rt3', title: 'Konfirmasi Pemesanan', subject: 'Konfirmasi Pemesanan Anda', body: 'Halo,\n\nKami telah menerima pemesanan Anda dan sedang memprosesnya. Detail pesanan akan dikirim dalam 1x24 jam.\n\nTerima kasih atas kepercayaan Anda kepada BerasPatani26.\n\nSalam,\nTim BerasPatani26', category: 'Pemesanan' },
  { id: 'rt4', title: 'Info Pengiriman', subject: 'Informasi Status Pengiriman', body: 'Halo,\n\nPesanan Anda telah dikirim melalui ekspedisi terpercaya. Anda dapat melacak pengiriman dengan nomor resi yang terlampir.\n\nEstimasi sampai: 2-5 hari kerja.\n\nSalam,\nTim BerasPatani26', category: 'Pengiriman' },
];
