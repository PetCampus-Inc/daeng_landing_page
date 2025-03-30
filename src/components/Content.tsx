import { cn } from '@/lib/tw';

export function Content({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('w-full max-w-content px-8 max-md:px-4', className)} {...props} />;
}
