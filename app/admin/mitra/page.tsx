'use client';

import { useState, useMemo } from 'react';
import { Search, Eye, Users, Plus } from 'lucide-react';
import { AdminPageHeader, AdminTable, AdminButton, StatusBadge, type Column } from '@/components/admin/AdminUI';
import { partners } from '@/lib/data';
import { Partner } from '@/lib/types';
import { formatDateShort } from '@/lib/format';

export default function AdminMitraPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    let result = [...partners];
    if (filter !== 'all') result = result.filter((p) => p.status === filter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.type.toLowerCase().includes(q));
    }
    return result;
  }, [search, filter]);

  const columns: Column<Partner>[] = [
    {
      key: 'name',
      label: 'Mitra',
      render: (p) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <p className="font-medium">{p.name}</p>
            <p className="text-xs text-muted-foreground">{p.type}</p>
          </div>
        </div>
      ),
    },
    { key: 'location', label: 'Lokasi', render: (p) => <span className="text-sm">{p.location}</span> },
    { key: 'status', label: 'Status', render: (p) => <StatusBadge status={p.status} /> },
    { key: 'joinedAt', label: 'Bergabung', render: (p) => <span className="text-xs text-muted-foreground">{formatDateShort(p.joinedAt)}</span> },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Mitra"
        description="Kelola data mitra petani, distributor, dan toko"
        action={<AdminButton variant="default"><Plus className="h-4 w-4" /> Tambah Mitra</AdminButton>}
      />

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Aktif', value: partners.filter(p => p.status === 'aktif').length, color: 'text-green-600' },
          { label: 'Pending', value: partners.filter(p => p.status === 'pending').length, color: 'text-amber-600' },
          { label: 'Nonaktif', value: partners.filter(p => p.status === 'nonaktif').length, color: 'text-gray-600' },
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
          <input type="text" placeholder="Cari mitra..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="all">Semua Status</option>
          <option value="aktif">Aktif</option>
          <option value="pending">Pending</option>
          <option value="nonaktif">Nonaktif</option>
        </select>
      </div>

      <AdminTable columns={columns} data={filtered} actions={() => <AdminButton variant="ghost" className="px-2"><Eye className="h-4 w-4" /></AdminButton>} />
    </div>
  );
}
