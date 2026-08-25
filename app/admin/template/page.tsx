'use client';

import { useState, useMemo } from 'react';
import { Search, Plus, Copy, Edit2, Trash2, MessageSquare, Check } from 'lucide-react';
import { AdminPageHeader, AdminButton, type Column } from '@/components/admin/AdminUI';
import { AdminTable } from '@/components/admin/AdminUI';
import { replyTemplates } from '@/lib/data';
import { ReplyTemplate } from '@/lib/types';

export default function AdminTemplatePage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = [...replyTemplates];
    if (filter !== 'all') result = result.filter((t) => t.category === filter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q));
    }
    return result;
  }, [search, filter]);

  const categories = Array.from(new Set(replyTemplates.map((t) => t.category)));

  const handleCopy = (template: ReplyTemplate) => {
    const text = `Subjek: ${template.subject}\n\n${template.body}`;
    navigator.clipboard.writeText(text);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const columns: Column<ReplyTemplate>[] = [
    {
      key: 'title',
      label: 'Template',
      render: (t) => (
        <div>
          <p className="font-medium">{t.title}</p>
          <p className="text-xs text-muted-foreground">{t.subject}</p>
        </div>
      ),
    },
    {
      key: 'body',
      label: 'Isi',
      render: (t) => <span className="text-sm text-muted-foreground line-clamp-2 max-w-md block whitespace-pre-line">{t.body}</span>,
      className: 'max-w-md',
    },
    { key: 'category', label: 'Kategori', render: (t) => <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{t.category}</span> },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Template Balasan"
        description="Template pesan siap pakai untuk membalas calon pembeli dan pesan kontak"
        action={<AdminButton variant="default"><Plus className="h-4 w-4" /> Tambah Template</AdminButton>}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Template', value: replyTemplates.length, icon: MessageSquare },
          { label: 'Kategori', value: categories.length },
          { label: 'Kategori Aktif', value: categories.join(', '), isText: true },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-card border border-border p-4">
            <p className="text-2xl font-bold">{s.isText ? <span className="text-sm">{s.value}</span> : s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Cari template..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="all">Semua Kategori</option>
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <AdminTable
        columns={columns}
        data={filtered}
        actions={(item) => (
          <>
            <AdminButton variant="ghost" className="px-2" onClick={() => handleCopy(item)}>
              {copiedId === item.id ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
            </AdminButton>
            <AdminButton variant="ghost" className="px-2"><Edit2 className="h-4 w-4" /></AdminButton>
            <AdminButton variant="ghost" className="px-2 text-destructive"><Trash2 className="h-4 w-4" /></AdminButton>
          </>
        )}
      />

      <p className="text-xs text-muted-foreground">
        Klik tombol copy untuk menyalin template ke clipboard. Siap digunakan untuk membalas email atau WhatsApp.
      </p>
    </div>
  );
}
