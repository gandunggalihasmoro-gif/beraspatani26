'use client';

import { useState, useMemo } from 'react';
import { Search, Eye, Reply, Mail } from 'lucide-react';
import { AdminPageHeader, AdminTable, AdminButton, StatusBadge, type Column } from '@/components/admin/AdminUI';
import { contactMessages } from '@/lib/data';
import { ContactMessage } from '@/lib/types';
import { formatDateTime } from '@/lib/format';

export default function AdminPesanPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    let result = [...contactMessages];
    if (filter !== 'all') result = result.filter((m) => m.status === filter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((m) => m.name.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q) || m.email.toLowerCase().includes(q));
    }
    return result;
  }, [search, filter]);

  const columns: Column<ContactMessage>[] = [
    {
      key: 'name',
      label: 'Pengirim',
      render: (m) => (
        <div>
          <p className="font-medium flex items-center gap-2">
            {m.name}
            {m.status === 'belum-dibaca' && <span className="h-2 w-2 rounded-full bg-red-500" />}
          </p>
          <p className="text-xs text-muted-foreground">{m.email}</p>
        </div>
      ),
    },
    { key: 'subject', label: 'Subjek', render: (m) => <span className="text-sm">{m.subject}</span> },
    { key: 'phone', label: 'Telepon', render: (m) => <span className="text-sm text-muted-foreground">{m.phone}</span> },
    { key: 'status', label: 'Status', render: (m) => <StatusBadge status={m.status} /> },
    { key: 'createdAt', label: 'Tanggal', render: (m) => <span className="text-xs text-muted-foreground">{formatDateTime(m.createdAt)}</span> },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Pesan Kontak" description="Kelola pesan masuk dari form kontak website" />

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Belum Dibaca', value: contactMessages.filter(m => m.status === 'belum-dibaca').length, color: 'text-red-600' },
          { label: 'Dibaca', value: contactMessages.filter(m => m.status === 'dibaca').length, color: 'text-amber-600' },
          { label: 'Dibalas', value: contactMessages.filter(m => m.status === 'dibalas').length, color: 'text-green-600' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-card border border-border p-4">
            <p className="text-2xl font-bold">{s.value}</p>
            <p className={`text-xs mt-1 ${s.color}`}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Cari pesan..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="all">Semua Status</option>
          <option value="belum-dibaca">Belum Dibaca</option>
          <option value="dibaca">Dibaca</option>
          <option value="dibalas">Dibalas</option>
        </select>
      </div>

      <AdminTable
        columns={columns}
        data={filtered}
        actions={() => (
          <>
            <AdminButton variant="ghost" className="px-2"><Eye className="h-4 w-4" /></AdminButton>
            <AdminButton variant="ghost" className="px-2"><Reply className="h-4 w-4" /></AdminButton>
          </>
        )}
      />
    </div>
  );
}
