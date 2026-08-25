'use client';

import { useState, useMemo } from 'react';
import { Search, Plus, Edit2, Trash2, Package, AlertCircle } from 'lucide-react';
import { AdminPageHeader, AdminTable, AdminButton, StatusBadge, type Column } from '@/components/admin/AdminUI';
import { products } from '@/lib/data';
import { Product } from '@/lib/types';
import { formatRupiah, formatNumber, formatDateShort } from '@/lib/format';

export default function AdminProdukPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    let result = [...products];
    if (filter !== 'all') {
      if (filter === 'low-stock') {
        result = result.filter((p) => p.stockStatus !== 'tersedia');
      } else {
        result = result.filter((p) => p.category === filter);
      }
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.origin.toLowerCase().includes(q));
    }
    return result;
  }, [search, filter]);

  const columns: Column<Product>[] = [
    {
      key: 'name',
      label: 'Produk',
      render: (p) => (
        <div className="flex items-center gap-3">
          <img src={p.imageUrl} alt={p.name} className="h-10 w-10 rounded-lg object-cover shrink-0" />
          <div className="min-w-0">
            <p className="font-medium truncate">{p.name}</p>
            <p className="text-xs text-muted-foreground">{p.category} • {p.grade}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'pricePerKg',
      label: 'Harga/kg',
      render: (p) => <span className="font-medium">{formatRupiah(p.pricePerKg)}</span>,
    },
    {
      key: 'stockKg',
      label: 'Stok (kg)',
      render: (p) => (
        <div>
          <p className="font-medium">{formatNumber(p.stockKg)}</p>
          <p className="text-xs text-muted-foreground">Min. {p.minOrder} kg</p>
        </div>
      ),
    },
    {
      key: 'stockStatus',
      label: 'Status',
      render: (p) => <StatusBadge status={p.stockStatus} />,
    },
    {
      key: 'createdAt',
      label: 'Dibuat',
      render: (p) => <span className="text-muted-foreground">{formatDateShort(p.createdAt)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Produk & Stok"
        description="Kelola produk, harga, dan stok gabah/beras"
        action={<AdminButton variant="default"><Plus className="h-4 w-4" /> Tambah Produk</AdminButton>}
      />

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Produk', value: products.length, icon: Package },
          { label: 'Stok Tersedia', value: products.filter(p => p.stockStatus === 'tersedia').length, color: 'text-green-600' },
          { label: 'Stok Terbatas', value: products.filter(p => p.stockStatus === 'terbatas').length, color: 'text-amber-600' },
          { label: 'Stok Habis', value: products.filter(p => p.stockStatus === 'habis').length, color: 'text-red-600' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-card border border-border p-4">
            <p className="text-2xl font-bold">{s.value}</p>
            <p className={`text-xs mt-1 ${s.color || 'text-muted-foreground'}`}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">Semua Kategori</option>
          <option value="beras">Beras</option>
          <option value="gabah">Gabah</option>
          <option value="olahan">Olahan</option>
          <option value="low-stock">Stok Terbatas/Habis</option>
        </select>
      </div>

      <AdminTable
        columns={columns}
        data={filtered}
        actions={() => (
          <>
            <AdminButton variant="ghost" className="px-2"><Edit2 className="h-4 w-4" /></AdminButton>
            <AdminButton variant="ghost" className="px-2 text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></AdminButton>
          </>
        )}
      />

      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
        <AlertCircle className="h-3.5 w-3.5" /> Mode demo — tombol edit/hapus belum berfungsi. Integrasi database akan diaktifkan di tahap berikutnya.
      </p>
    </div>
  );
}
