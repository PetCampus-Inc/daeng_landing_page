'use client';

import { motion } from 'framer-motion';

import { Content } from '@/components/Content';
import { cn } from '@/lib/tw';
import { POSITIONS } from '@/constants/careers';
import type { Position } from '@/types';

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
    <motion.div
      className="flex flex-col gap-3 p-6 bg-white rounded-2xl border border-border hover:border-primary hover:shadow-card transition-all cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={() => onSelect(position.id)}
    >
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 text-13 font-medium bg-surface-accent rounded-full">
          {position.team}
        </span>
      </div>
      <h3 className="text-20 font-semibold text-foreground">{position.title}</h3>
      <p className="text-14 text-foreground-muted">{position.description}</p>
    </motion.div>
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
    <section className={cn('w-full flex justify-center', className)}>
      <Content className="flex flex-col gap-10 py-16">
        <motion.h2
          className="text-28 font-bold text-foreground max-md:text-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          채용 중인 포지션
        </motion.h2>
        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
          {POSITIONS.map((position, index) => (
            <JobCard key={position.id} position={position} index={index} onSelect={handleSelect} />
          ))}
        </div>
      </Content>
    </section>
  );
}
