'use client';

import Link from 'next/link';

import { AppStoreIcon, PlayStoreColorIcon } from '@/assets/icons';
import { cn } from '@/lib/tw';
import { STORE_LINK } from '@/constants/storeLink';

export function AppDownload({ className }: { className?: string }) {
  return (
    <div className={cn('flex gap-2', className)}>
      <Link
        className="flex-1 flex gap-2 py-3 whitespace-nowrap bg-background border border-border rounded-md items-center justify-center pr-2"
        href={STORE_LINK.appStore}
        target="_blank"
        rel="noopener noreferrer"
      >
        <AppStoreIcon />
        App Store
      </Link>
      <Link
        className="flex-1 flex gap-2 whitespace-nowrap bg-background border border-border rounded-md items-center justify-center pr-2"
        href={STORE_LINK.googlePlay}
        target="_blank"
        rel="noopener noreferrer"
      >
        <PlayStoreColorIcon />
        Google Play
      </Link>
    </div>
  );
}
