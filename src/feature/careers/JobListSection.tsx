'use client';

import { motion } from 'framer-motion';

import { Content } from '@/components/Content';
import { cn } from '@/lib/tw';
import { POSITIONS } from '@/constants/careers';
import type { Position } from '@/types';

import { careersTypography } from './typography';

function JobCard({
  position,
  index,
  onSelect,
}: {
  position: Position;
  index: number;
  onSelect: (id: string) => void;
}) {
  return (
    <motion.button
      type="button"
      className="flex min-h-56 flex-col rounded-r4 border border-border bg-white p-6 text-left transition-colors duration-140 hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeInOut', delay: index * 0.06 }}
      onClick={() => onSelect(position.id)}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span
          className={cn(careersTypography.badge, 'font-semibold bg-surface-accent text-primary')}
        >
          {position.team}
        </span>
        <span className="text-caption-1 text-foreground-muted">{position.type}</span>
      </div>
      <h3
        className={cn(careersTypography.contentMain, 'mb-2 font-semibold text-foreground xl:mb-4')}
      >
        {position.title}
      </h3>
      <p className={cn(careersTypography.contentSupporting, 'text-foreground-muted')}>
        {position.description}
      </p>
    </motion.button>
  );
}

interface JobListSectionProps {
  className?: string;
  onSelectPosition?: (positionId: string) => void;
}

export function JobListSection({ className, onSelectPosition }: JobListSectionProps) {
  const handleSelect = (id: string) => {
    onSelectPosition?.(id);
  };

  return (
    <section className={cn('flex w-full justify-center bg-background', className)}>
      <Content className="flex flex-col gap-10 py-16 md:py-24 xl:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <p className={cn(careersTypography.sectionGuide, 'font-semibold text-primary')}>
            Open positions
          </p>
          <h2 className={cn(careersTypography.sectionMain, 'mt-4 font-bold text-foreground')}>
            채용 중인 포지션
          </h2>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2">
          {POSITIONS.map((position, index) => (
            <JobCard key={position.id} position={position} index={index} onSelect={handleSelect} />
          ))}
        </div>
      </Content>
    </section>
  );
}
