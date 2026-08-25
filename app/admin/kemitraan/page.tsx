'use client';

import { useState, useMemo } from 'react';
import { Search, Eye } from 'lucide-react';
import { AdminPageHeader, AdminTable, AdminButton, StatusBadge, type Column } from '@/components/admin/AdminUI';
import { partnershipLeads } from '@/lib/data';
import { PartnershipLead } from '@/lib/types';
import { formatDateTime } from '@/lib/format';

const typeLabels: Record<string, string> = {
  petani: 'Petani',
  distributor: 'Distributor',
  pengepul: 'Pengepul',
  toko: 'Toko/Reseller',
  lainnya: 'Lainnya',
};

export default function AdminKemitraanPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    let result = [...partnershipLeads];
    if (filter !== 'all') {
      if (filter.startsWith('type:')) {
        result = result.filter((p) => p.type === filter.slice(5));
      } else {
        result = result.filter((p) => p.status === filter);
      }
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.organization.toLowerCase().includes(q) || p.region.toLowerCase().includes(q));
    }
    return result;
  }, [search, filter]);

  const columns: Column<PartnershipLead>[] = [
    {
      key: 'name',
      label: 'Pendaftar',
      render: (p) => (
        <div>
          <p className="font-medium">{p.name}</p>
          <p className="text-xs text-muted-foreground">{p.organization || '-'}</p>
        </div>
      ),
    },
    { key: 'type', label: 'Jenis', render: (p) => <span className="text-sm">{typeLabels[p.type]}</span> },
    { key: 'region', label: 'Wilayah', render: (p) => <span className="text-sm">{p.region}</span> },
    { key: 'landArea', label: 'Lahan', render: (p) => <span className="text-sm text-muted-foreground">{p.landArea}</span> },
    { key: 'status', label: 'Status', render: (p) => <StatusBadge status={p.status} /> },
    { key: 'createdAt', label: 'Tanggal', render: (p) => <span className="text-xs text-muted-foreground">{formatDateTime(p.createdAt)}</span> },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Pendaftar Kemitraan" description="Kelola pendaftar dari form kemitraan website" />

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Baru', value: partnershipLeads.filter(p => p.status === 'baru').length, color: 'text-blue-600' },
          { label: 'Diproses', value: partnershipLeads.filter(p => p.status === 'diproses').length, color: 'text-amber-600' },
          { label: 'Selesai', value: partnershipLeads.filter(p => p.status === 'selesai').length, color: 'text-green-600' },
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
          <input type="text" placeholder="Cari pendaftar..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="all">Semua</option>
          <option value="baru">Baru</option>
          <option value="diproses">Diproses</option>
          <option value="selesai">Selesai</option>
          <option value="type:petani">Petani</option>
          <option value="type:distributor">Distributor</option>
          <option value="type:pengepul">Pengepul</option>
        </select>
      </div>

      <AdminTable columns={columns} data={filtered} actions={() => <AdminButton variant="ghost" className="px-2"><Eye className="h-4 w-4" /></AdminButton>} />
    </div>
  );
}
