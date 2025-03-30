'use client';

import Link from 'next/link';

import * as icons from '@/assets/icons';
import { cn } from '@/lib/tw';
import { STORE_LINKS } from '@/constants/storeLink';

interface AppDownloadProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export function AppDownload({ className, theme = 'light' }: AppDownloadProps) {
  return (
    <div className={cn('flex gap-2', className)}>
      {STORE_LINKS.map(({ name, url, icon }) => {
        const Icon = icons[icon as keyof typeof icons];
        return (
          <Link
            key={name}
            className={cn(
              'flex-1 flex gap-2 py-2.5 whitespace-nowrap rounded-md items-center justify-center pr-2 font-semibold',
              theme === 'light'
                ? 'bg-background border border-border text-foreground/80'
                : 'bg-foreground/20 border border-border/30 text-primary-foreground',
            )}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon className="size-7" />
            {name}
          </Link>
        );
      })}
    </div>
  );
}
