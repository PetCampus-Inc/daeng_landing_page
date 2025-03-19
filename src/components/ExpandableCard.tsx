'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { cn } from '@/lib/tw';
import { AddCircle } from '@/assets/icons';
import Image from 'next/image';

interface ExpandableCardProps {
  className?: string;
  title: string;
  description: string;
  image?: string;
}

export function ExpandableCard({ className, title, description, image }: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cn(
        'relative rounded-lg border border-border aspect-[3/2] overflow-hidden text-foreground',
        className,
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {image && (
        <Image src={image} alt={title} fill className="absolute top-0 left-0 object-cover -z-10" />
      )}

      <div
        className={cn(
          'p-8 w-full h-full max-sm:p-5 transition-all duration-300',
          isExpanded && image && 'backdrop-blur-sm bg-foreground/40',
        )}
      >
        <motion.p
          className="text-title-32 origin-left whitespace-pre-line max-sm:text-title-24"
          initial={{ scale: 1 }}
          animate={{ scale: isExpanded ? 0.9 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.p>

        <motion.div
          className="mt-4 absolute"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: isExpanded ? 0 : 1, y: isExpanded ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <AddCircle className="size-9" />
        </motion.div>

        <motion.p
          className="flex-1 text-body-16 mt-6 origin-left"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: isExpanded ? -8 : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}
