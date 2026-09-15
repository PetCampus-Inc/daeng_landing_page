import { cn } from '@/lib/tw';

export function Content({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="w-full px-4 md:px-8">
      <div className={cn('mx-auto w-full max-w-content', className)} {...props} />
    </div>
  );
}
