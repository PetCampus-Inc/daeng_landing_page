'use client';

import { motion } from 'framer-motion';

import { Content } from '@/components/Content';
import { StickyHorizontalScroll } from '@/components/StickyHorizontalScroll';
import { FeaturePreview } from '@/components/FeaturePreview';
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
          <h2 className="text-center text-42 font-semibold max-md:text-28">
            찾고, 비교하고, 안심하는 하루
          </h2>
          <p className="mt-3 text-center text-20 text-foreground-muted max-md:text-16">
            똑독의 다양한 기능을 만나보세요
          </p>
          <p className="mt-3 hidden text-14 text-foreground-muted max-md:block">
            화면을 옆으로 밀어 더 살펴보세요 →
          </p>
        </motion.div>
      </Content>

      {/* 가로 스크롤 영역 */}
      <StickyHorizontalScroll className="mt-8 max-md:mt-10">
        {AppFeatures.map((feature, index) => (
          <FeaturePreview
            key={feature.tag}
            src={feature.src}
            alt={feature.alt}
            tag={feature.tag}
            index={index}
            total={AppFeatures.length}
          />
        ))}
      </StickyHorizontalScroll>
    </section>
  );
}
