import { cn } from '@/lib/tw';

export function Content({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mx-auto w-full max-w-content px-4 md:px-6 xl:px-10', className)}
      {...props}
    />
  );
}
