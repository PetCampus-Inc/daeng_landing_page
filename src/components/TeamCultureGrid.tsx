'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { ExpandableCard } from '@/components/ExpandableCard';
import { getTeamCulture } from '@/lib/github';
import { cn } from '@/lib/tw';

export interface Culture {
  id: number;
  title: string;
  description: string;
  textColor?: string;
  imageUrl?: string;
}

interface TeamCultureGridProps {
  className?: string;
}

export function TeamCultureGrid({ className }: TeamCultureGridProps) {
  const [cultures, setCultures] = useState<Culture[]>([]);

  useEffect(() => {
    getTeamCulture().then((data) => setCultures(data));
  }, []);

  return (
    <div className={cn('grid grid-cols-2 gap-6 max-md:grid-cols-1', className)}>
      {cultures.map((culture) => (
        <motion.div key={culture.id}>
          <ExpandableCard
            title={culture.title}
            description={culture.description}
            image={culture.imageUrl}
            style={{ color: culture.textColor }}
          />
        </motion.div>
      ))}
    </div>
  );
}
