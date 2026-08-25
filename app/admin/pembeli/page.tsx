'use client';

import { useState, useMemo } from 'react';
import { Search, Eye, ShoppingCart } from 'lucide-react';
import { AdminPageHeader, AdminTable, AdminButton, StatusBadge, type Column } from '@/components/admin/AdminUI';
import { buyerLeads } from '@/lib/data';
import { BuyerLead } from '@/lib/types';
import { formatNumber, formatDateTime } from '@/lib/format';

export default function AdminPembeliPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    let result = [...buyerLeads];
    if (filter !== 'all') {
      result = result.filter((b) => b.status === filter);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((b) => b.name.toLowerCase().includes(q) || b.company.toLowerCase().includes(q) || b.city.toLowerCase().includes(q));
    }
    return result;
  }, [search, filter]);

  const columns: Column<BuyerLead>[] = [
    {
      key: 'name',
      label: 'Pembeli',
      render: (b) => (
        <div>
          <p className="font-medium">{b.name}</p>
          <p className="text-xs text-muted-foreground">{b.company || 'Perorangan'}</p>
        </div>
      ),
    },
    { key: 'productInterest', label: 'Produk', render: (b) => <span className="text-sm">{b.productInterest}</span> },
    { key: 'quantityKg', label: 'Jumlah', render: (b) => <span className="font-medium">{formatNumber(b.quantityKg)} kg</span> },
    { key: 'city', label: 'Kota', render: (b) => <span className="text-sm">{b.city}</span> },
    { key: 'status', label: 'Status', render: (b) => <StatusBadge status={b.status} /> },
    { key: 'createdAt', label: 'Tanggal', render: (b) => <span className="text-xs text-muted-foreground">{formatDateTime(b.createdAt)}</span> },
  ];

  const statusCounts = {
    baru: buyerLeads.filter(b => b.status === 'baru').length,
    diproses: buyerLeads.filter(b => b.status === 'diproses').length,
    selesai: buyerLeads.filter(b => b.status === 'selesai').length,
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Calon Pembeli" description="Kelola lead minat pembelian dari form website" />

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Baru', value: statusCounts.baru, color: 'text-blue-600' },
          { label: 'Diproses', value: statusCounts.diproses, color: 'text-amber-600' },
          { label: 'Selesai', value: statusCounts.selesai, color: 'text-green-600' },
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
          <input type="text" placeholder="Cari pembeli..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="all">Semua Status</option>
          <option value="baru">Baru</option>
          <option value="diproses">Diproses</option>
          <option value="selesai">Selesai</option>
          <option value="dibatalkan">Dibatalkan</option>
        </select>
      </div>

      <AdminTable
        columns={columns}
        data={filtered}
        actions={() => (
          <AdminButton variant="ghost" className="px-2"><Eye className="h-4 w-4" /></AdminButton>
        )}
      />
    </div>
  );
}
