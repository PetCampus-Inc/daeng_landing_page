'use client';

import { motion } from 'framer-motion';

import { Content } from '@/components/Content';
import { cn } from '@/lib/tw';

import { careersTypography } from './typography';

export function CareersHeroSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'flex w-full justify-center bg-linear-to-b from-surface-accent to-transparent pt-header',
        className,
      )}
    >
      <Content className="flex min-h-120 flex-col justify-end py-16 md:min-h-140 md:py-24 xl:py-32">
        <motion.div
          className="max-w-180"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <p className={cn(careersTypography.sectionGuide, 'font-semibold text-primary')}>
            Careers
          </p>
          <h1 className={cn(careersTypography.sectionMain, 'mt-4 font-bold text-foreground')}>
            함께 성장할 동료를 찾습니다
          </h1>
          <p
            className={cn(
              careersTypography.sectionSupporting,
              'mt-2 text-foreground-muted xl:mt-4',
            )}
          >
            반려동물과 보호자를 위한 더 나은 서비스를 만들어갈
            <br /> 열정 넘치는 분들을 기다립니다.
          </p>
        </motion.div>
      </Content>
    </section>
  );
}
