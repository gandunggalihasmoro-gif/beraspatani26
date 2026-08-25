'use client';

import { useState, useMemo } from 'react';
import { Search, Plus, Edit2, Trash2, HelpCircle } from 'lucide-react';
import { AdminPageHeader, AdminTable, AdminButton, type Column } from '@/components/admin/AdminUI';
import { faqItems } from '@/lib/data';
import { FaqItem } from '@/lib/types';

export default function AdminFaqPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    let result = [...faqItems];
    if (filter !== 'all') result = result.filter((f) => f.category === filter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
    }
    return result;
  }, [search, filter]);

  const categories = Array.from(new Set(faqItems.map((f) => f.category)));

  const columns: Column<FaqItem>[] = [
    {
      key: 'question',
      label: 'Pertanyaan',
      render: (f) => <span className="font-medium max-w-md block">{f.question}</span>,
      className: 'max-w-md',
    },
    {
      key: 'answer',
      label: 'Jawaban',
      render: (f) => <span className="text-sm text-muted-foreground line-clamp-2 max-w-lg block">{f.answer}</span>,
      className: 'max-w-lg',
    },
    { key: 'category', label: 'Kategori', render: (f) => <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{f.category}</span> },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="FAQ"
        description="Kelola pertanyaan dan jawaban untuk halaman FAQ"
        action={<AdminButton variant="default"><Plus className="h-4 w-4" /> Tambah FAQ</AdminButton>}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total FAQ', value: faqItems.length, icon: HelpCircle },
          { label: 'Kategori', value: categories.length },
          { label: 'Rata Jawaban', value: `${Math.round(faqItems.reduce((s, f) => s + f.answer.length, 0) / faqItems.length)} char` },
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
          <input type="text" placeholder="Cari FAQ..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
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
            <AdminButton variant="ghost" className="px-2"><Edit2 className="h-4 w-4" /></AdminButton>
            <AdminButton variant="ghost" className="px-2 text-destructive"><Trash2 className="h-4 w-4" /></AdminButton>
          </>
        )}
      />
    </div>
  );
}
