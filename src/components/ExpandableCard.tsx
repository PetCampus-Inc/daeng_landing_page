'use client';

import { HTMLAttributes, useState } from 'react';
import { motion } from 'framer-motion';

import { cn } from '@/lib/tw';
import { AddCircleIcon } from '@/assets/icons';
import Image from 'next/image';

interface ExpandableCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  description: string;
  image?: string;
  imageLoading?: 'eager' | 'lazy';
  imagePriority?: boolean;
}

export function ExpandableCard({
  className,
  title,
  description,
  image,
  imageLoading = 'lazy',
  imagePriority = false,
  ...props
}: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cn(
        'relative rounded-lg border border-border aspect-[3/2] overflow-hidden text-foreground',
        className,
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      {...props}
    >
      {image && (
        <Image
          src={image}
          alt={title}
          sizes="100%"
          fill
          className="object-cover"
          loading={imageLoading}
          priority={imagePriority}
        />
      )}

      <div
        className={cn(
          'absolute top-0 left-0 p-8 w-full h-full max-sm:p-5 transition-all duration-300',
          image && 'bg-foreground/20',
          isExpanded && image && 'bg-foreground/40',
        )}
      >
        <motion.p
          className="text-32 font-semibold origin-left whitespace-pre-line max-sm:text-24"
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
          <AddCircleIcon className="size-9" />
        </motion.div>

        <motion.p
          className="flex-1 text-20 max-sm:text-16 mt-6 origin-left whitespace-pre-line"
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
