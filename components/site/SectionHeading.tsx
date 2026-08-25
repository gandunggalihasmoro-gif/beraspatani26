import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  center,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  center?: boolean;
}) {
  return (
    <div className={cn('space-y-2', center && 'text-center', className)}>
      {eyebrow && (
        <span className="inline-block text-sm font-semibold uppercase tracking-wider text-primary/70">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl text-balance">
        {title}
      </h2>
      {description && (
        <p className={cn('text-muted-foreground leading-relaxed text-balance', center && 'mx-auto max-w-2xl')}>
          {description}
        </p>
      )}
    </div>
  );
}
