'use client';

import { useState, useMemo } from 'react';
import { Search, Plus, Edit2, Eye, Trash2, FileText } from 'lucide-react';
import { AdminPageHeader, AdminTable, AdminButton, type Column } from '@/components/admin/AdminUI';
import { articles } from '@/lib/data';
import { Article } from '@/lib/types';
import { formatDateShort } from '@/lib/format';

export default function AdminKontenPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    let result = [...articles];
    if (filter !== 'all') result = result.filter((a) => a.category === filter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q));
    }
    return result;
  }, [search, filter]);

  const categories = Array.from(new Set(articles.map((a) => a.category)));

  const columns: Column<Article>[] = [
    {
      key: 'title',
      label: 'Judul',
      render: (a) => (
        <div className="flex items-center gap-3">
          <img src={a.imageUrl} alt={a.title} className="h-10 w-10 rounded-lg object-cover shrink-0" />
          <div className="min-w-0">
            <p className="font-medium truncate max-w-xs">{a.title}</p>
            <p className="text-xs text-muted-foreground">{a.author}</p>
          </div>
        </div>
      ),
    },
    { key: 'category', label: 'Kategori', render: (a) => <span className="text-sm px-2 py-1 rounded-full bg-primary/10 text-primary">{a.category}</span> },
    { key: 'readTime', label: 'Baca', render: (a) => <span className="text-sm text-muted-foreground">{a.readTime} min</span> },
    { key: 'publishedAt', label: 'Dipublikasi', render: (a) => <span className="text-xs text-muted-foreground">{formatDateShort(a.publishedAt)}</span> },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Konten & Edukasi"
        description="Kelola artikel edukasi dan konten website"
        action={<AdminButton variant="default"><Plus className="h-4 w-4" /> Tulis Artikel</AdminButton>}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Artikel', value: articles.length, icon: FileText },
          { label: 'Kategori', value: categories.length },
          { label: 'Total Min Baca', value: articles.reduce((s, a) => s + a.readTime, 0) },
          { label: 'Rata-rata', value: Math.round(articles.reduce((s, a) => s + a.readTime, 0) / articles.length) },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-card border border-border p-4">
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Cari artikel..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="all">Semua Kategori</option>
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <AdminTable
        columns={columns}
        data={filtered}
        actions={() => (
          <>
            <AdminButton variant="ghost" className="px-2"><Eye className="h-4 w-4" /></AdminButton>
            <AdminButton variant="ghost" className="px-2"><Edit2 className="h-4 w-4" /></AdminButton>
            <AdminButton variant="ghost" className="px-2 text-destructive"><Trash2 className="h-4 w-4" /></AdminButton>
          </>
        )}
      />
    </div>
  );
}
