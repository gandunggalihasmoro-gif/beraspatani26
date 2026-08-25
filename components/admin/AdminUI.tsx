'use client';

import { cn } from '@/lib/utils';

interface StatusConfig {
  [key: string]: { label: string; className: string };
}

const defaultStatusConfig: StatusConfig = {
  baru: { label: 'Baru', className: 'bg-blue-100 text-blue-700' },
  diproses: { label: 'Diproses', className: 'bg-amber-100 text-amber-700' },
  selesai: { label: 'Selesai', className: 'bg-green-100 text-green-700' },
  dibatalkan: { label: 'Dibatalkan', className: 'bg-gray-100 text-gray-600' },
  aktif: { label: 'Aktif', className: 'bg-green-100 text-green-700' },
  pending: { label: 'Pending', className: 'bg-amber-100 text-amber-700' },
  nonaktif: { label: 'Nonaktif', className: 'bg-gray-100 text-gray-600' },
  'belum-dibaca': { label: 'Belum Dibaca', className: 'bg-red-100 text-red-700' },
  dibaca: { label: 'Dibaca', className: 'bg-amber-100 text-amber-700' },
  dibalas: { label: 'Dibalas', className: 'bg-green-100 text-green-700' },
  tersedia: { label: 'Tersedia', className: 'bg-green-100 text-green-700' },
  terbatas: { label: 'Terbatas', className: 'bg-amber-100 text-amber-700' },
  habis: { label: 'Habis', className: 'bg-red-100 text-red-700' },
};

export function StatusBadge({ status, config }: { status: string; config?: StatusConfig }) {
  const cfg = (config || defaultStatusConfig)[status] || { label: status, className: 'bg-gray-100 text-gray-600' };
  return (
    <span className={cn('inline-block px-2.5 py-1 rounded-full text-xs font-medium', cfg.className)}>
      {cfg.label}
    </span>
  );
}

export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

export function AdminTable<T extends { id: string }>({
  columns,
  data,
  actions,
}: {
  columns: Column<T>[];
  data: T[];
  actions?: (item: T) => React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn('px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground', col.className)}
              >
                {col.label}
              </th>
            ))}
            {actions && <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">Aksi</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-12 text-center text-sm text-muted-foreground">
                Tidak ada data
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className={cn('px-4 py-3 text-sm', col.className)}>
                    {col.render ? col.render(item) : (item as Record<string, unknown>)[col.key] as React.ReactNode}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">{actions(item)}</div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function AdminButton({
  children,
  variant = 'default',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'ghost' | 'danger' }) {
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-border hover:bg-muted',
    ghost: 'hover:bg-muted',
    danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  };
  return (
    <button
      className={cn('inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors', variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
