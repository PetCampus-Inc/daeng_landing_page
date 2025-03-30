'use client';

import React from 'react';
import { cn } from '@/lib/tw';

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export const Accordion = ({ title, children, className }: AccordionItemProps) => {
  return (
    <details className={cn('group border-b border-border', className)}>
      <summary className="flex flex-1 gap-4 items-center px-4 py-4 text-24 max-md:text-20 cursor-pointer select-none hover:text-primary list-none before:content-['Q'] before:text-foreground-muted/50 before:font-semibold">
        {title}
      </summary>

      <div className="ml-6 mb-4 px-5 py-4 text-foreground/80 bg-surface rounded-lg border border-border-accent text-20 max-md:text-16 whitespace-pre-line">
        {children}
      </div>
    </details>
  );
};
