'use client';

import { motion } from 'framer-motion';

import { Content } from '@/components/Content';
import { StickyHorizontalScroll } from '@/components/StickyHorizontalScroll';
import { FeaturePreview } from '@/components/FeaturePreview';
import { IconType } from '@/components/IconButton';
import { cn } from '@/lib/tw';
import { AppFeatures } from '@/constants/appFeautres';

export function AppFunctionSection({ className }: { className?: string }) {
  return (
    <section className={cn('w-full flex flex-col items-center justify-center', className)}>
      <Content className="flex flex-col">
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <h2 className="text-42 font-semibold">반려견 유치원을 위한</h2>
          <h3 className="text-32 text-foreground-muted mt-2">단 하나뿐인 솔루션,</h3>
        </motion.div>
      </Content>

      {/* 가로 스크롤 영역 */}
      <StickyHorizontalScroll className="mt-14">
        {AppFeatures.map((feature) => (
          <FeaturePreview
            key={feature.tag}
            src={feature.src}
            alt={feature.alt}
            tag={feature.tag}
            title={feature.title}
            description={feature.description}
            icon={feature.icon as IconType}
          />
        ))}
      </StickyHorizontalScroll>
    </section>
  );
}
