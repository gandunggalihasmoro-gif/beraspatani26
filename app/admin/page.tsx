import Link from 'next/link';
import {
  Package, ShoppingCart, Users, Mail, FileText, HelpCircle,
  MessageSquare, ArrowRight, TrendingUp, Clock, CheckCircle2, AlertCircle,
} from 'lucide-react';
import {
  products, buyerLeads, partners, contactMessages, partnershipLeads,
  articles, faqItems, replyTemplates,
} from '@/lib/data';
import { formatRupiah, formatNumber, formatDateTime } from '@/lib/format';

export default function AdminDashboard() {
  const totalStock = products.reduce((sum, p) => sum + p.stockKg, 0);
  const lowStock = products.filter((p) => p.stockStatus === 'terbatas' || p.stockStatus === 'habis');
  const newBuyers = buyerLeads.filter((b) => b.status === 'baru').length;
  const newPartnerships = partnershipLeads.filter((p) => p.status === 'baru').length;
  const unreadMessages = contactMessages.filter((m) => m.status === 'belum-dibaca').length;

  const stats = [
    { label: 'Total Produk', value: products.length, icon: Package, color: 'bg-blue-100 text-blue-600', href: '/admin/produk' },
    { label: 'Total Stok (kg)', value: formatNumber(totalStock), icon: TrendingUp, color: 'bg-green-100 text-green-600', href: '/admin/produk' },
    { label: 'Calon Pembeli', value: buyerLeads.length, icon: ShoppingCart, color: 'bg-amber-100 text-amber-600', href: '/admin/pembeli' },
    { label: 'Mitra Aktif', value: partners.filter(p => p.status === 'aktif').length, icon: Users, color: 'bg-purple-100 text-purple-600', href: '/admin/mitra' },
    { label: 'Pesan Belum Dibaca', value: unreadMessages, icon: Mail, color: 'bg-red-100 text-red-600', href: '/admin/pesan' },
    { label: 'Artikel', value: articles.length, icon: FileText, color: 'bg-indigo-100 text-indigo-600', href: '/admin/konten' },
  ];

  const recentBuyers = buyerLeads.slice(0, 4);
  const recentMessages = contactMessages.slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Ringkasan aktivitas bisnis BerasPatani26</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-xl bg-card border border-border p-4 hover:shadow-md transition-shadow"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg mb-3 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Alerts */}
      <div className="grid lg:grid-cols-2 gap-4">
        {newBuyers > 0 && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-800">{newBuyers} calon pembeli baru menunggu</p>
              <Link href="/admin/pembeli" className="text-xs text-amber-600 hover:underline">Lihat detail →</Link>
            </div>
          </div>
        )}
        {lowStock.length > 0 && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">{lowStock.length} produk stok terbatas/habis</p>
              <Link href="/admin/produk" className="text-xs text-red-600 hover:underline">Kelola stok →</Link>
            </div>
          </div>
        )}
        {newPartnerships > 0 && (
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 flex items-center gap-3">
            <FileText className="h-5 w-5 text-blue-600 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-800">{newPartnerships} pendaftar kemitraan baru</p>
              <Link href="/admin/kemitraan" className="text-xs text-blue-600 hover:underline">Lihat detail →</Link>
            </div>
          </div>
        )}
        {unreadMessages > 0 && (
          <div className="rounded-xl bg-green-50 border border-green-200 p-4 flex items-center gap-3">
            <Mail className="h-5 w-5 text-green-600 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">{unreadMessages} pesan kontak belum dibaca</p>
              <Link href="/admin/pesan" className="text-xs text-green-600 hover:underline">Baca pesan →</Link>
            </div>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Buyers */}
        <div className="rounded-xl bg-card border border-border overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold">Calon Pembeli Terbaru</h3>
            <Link href="/admin/pembeli" className="text-sm text-primary hover:underline flex items-center gap-1">
              Semua <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentBuyers.map((buyer) => (
              <div key={buyer.id} className="flex items-center gap-3 p-4 hover:bg-muted/30">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
                  {buyer.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{buyer.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{buyer.productInterest} • {buyer.quantityKg} kg</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${
                  buyer.status === 'baru' ? 'bg-blue-100 text-blue-700' :
                  buyer.status === 'diproses' ? 'bg-amber-100 text-amber-700' :
                  buyer.status === 'selesai' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {buyer.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="rounded-xl bg-card border border-border overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold">Pesan Kontak Terbaru</h3>
            <Link href="/admin/pesan" className="text-sm text-primary hover:underline flex items-center gap-1">
              Semua <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="flex items-center gap-3 p-4 hover:bg-muted/30">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
                  {msg.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{msg.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{msg.subject}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${
                  msg.status === 'belum-dibaca' ? 'bg-red-100 text-red-700' :
                  msg.status === 'dibaca' ? 'bg-amber-100 text-amber-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {msg.status === 'belum-dibaca' ? 'Baru' : msg.status === 'dibaca' ? 'Dibaca' : 'Dibalas'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { href: '/admin/produk', label: 'Kelola Produk', icon: Package, count: products.length },
          { href: '/admin/faq', label: 'Edit FAQ', icon: HelpCircle, count: faqItems.length },
          { href: '/admin/konten', label: 'Tulis Artikel', icon: FileText, count: articles.length },
          { href: '/admin/template', label: 'Template Balasan', icon: MessageSquare, count: replyTemplates.length },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="rounded-xl bg-card border border-border p-4 hover:shadow-md hover:border-primary/20 transition-all"
          >
            <action.icon className="h-6 w-6 text-primary mb-2" />
            <p className="text-sm font-medium">{action.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{action.count} item</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
