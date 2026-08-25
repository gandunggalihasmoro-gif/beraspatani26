import { cn } from '@/lib/utils';
import { getStockStatusLabel } from '@/lib/format';
import { Product, StockStatus } from '@/lib/types';

const statusStyles: Record<StockStatus, string> = {
  tersedia: 'bg-green-100 text-green-800 border-green-200',
  terbatas: 'bg-amber-100 text-amber-800 border-amber-200',
  habis: 'bg-red-100 text-red-800 border-red-200',
};

const gradeStyles: Record<string, string> = {
  Premium: 'bg-accent/20 text-accent-foreground border-accent/30',
  'Grade A': 'bg-blue-100 text-blue-800 border-blue-200',
  'Grade B': 'bg-gray-100 text-gray-700 border-gray-200',
  'Grade C': 'bg-gray-100 text-gray-500 border-gray-200',
};

export function StockBadge({ status }: { status: StockStatus }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
      statusStyles[status]
    )}>
      <span className={cn(
        'h-1.5 w-1.5 rounded-full',
        status === 'tersedia' ? 'bg-green-500' : status === 'terbatas' ? 'bg-amber-500' : 'bg-red-500'
      )} />
      {getStockStatusLabel(status)}
    </span>
  );
}

export function GradeBadge({ grade }: { grade: string }) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
      gradeStyles[grade] || gradeStyles['Grade B']
    )}>
      {grade}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-xl hover:border-primary/20">
      <div className="aspect-[4/3] overflow-hidden bg-muted relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <GradeBadge grade={product.grade} />
        </div>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-primary/60">
            {product.category}
          </span>
          <StockBadge status={product.stockStatus} />
        </div>
        <h3 className="font-semibold text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-end justify-between pt-2 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Harga/kg</p>
            <p className="text-lg font-bold text-primary">
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.pricePerKg)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Min. order</p>
            <p className="text-sm font-medium">{product.minOrder} kg</p>
          </div>
        </div>
      </div>
    </div>
  );
}
