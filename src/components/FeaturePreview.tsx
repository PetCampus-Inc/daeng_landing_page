import { motion } from 'framer-motion';
import Image from 'next/image';

import * as icons from '@/assets/icons';
import { cn } from '@/lib/tw';
import { IconType } from '@/components/IconButton';

interface FeaturePreviewProps {
  className?: string;
  src: string;
  alt: string;
  tag: string;
  title: string;
  description: string;
  icon: IconType;
}

export function FeaturePreview({
  className,
  src,
  alt,
  tag,
  title,
  description,
  icon,
}: FeaturePreviewProps) {
  const Icon = icons[icon];

  return (
    <div
      className={cn(
        'h-full min-lg:w-content flex justify-center items-center min-md:last:pr-32',
        className,
      )}
    >
      <div className="relative min-w-[50rem] h-4/5 w-full flex-1 max-md:max-w-[30rem]">
        <Image src={src} alt={alt} sizes="100%" fill className="object-contain" loading="lazy" />
      </div>

      <motion.div
        className="flex-1 inline-flex flex-col pb-12 min-w-[40rem] min-md:justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <p className="text-20 text-primary font-semibold flex items-center gap-2">
          <Icon className="size-6" /> {tag}
        </p>

        <p className="text-32 font-semibold mt-2 whitespace-pre-line">{title}</p>

        <motion.p className="text-20 mt-7 whitespace-pre-line text-foreground-muted">
          {description}
        </motion.p>
      </motion.div>
    </div>
  );
}
