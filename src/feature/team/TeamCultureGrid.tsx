'use client';

import { motion } from 'framer-motion';

import { ExpandableCard } from '@/components/ExpandableCard';
import { cn } from '@/lib/tw';
import { teamCulture } from '@/constants/teamCulture';

interface TeamCultureGridProps {
  className?: string;
}

export function TeamCultureGrid({ className }: TeamCultureGridProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-6 max-md:grid-cols-1', className)}>
      {teamCulture.map((culture, index) => (
        <motion.div
          key={culture.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeInOut', delay: index * 0.1 }}
        >
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
