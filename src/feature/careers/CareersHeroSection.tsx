'use client';

import { motion } from 'framer-motion';

import { Content } from '@/components/Content';
import { cn } from '@/lib/tw';

export function CareersHeroSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'w-full flex justify-center pt-header bg-gradient-to-b from-white to-[#FFF8EF]',
        className,
      )}
    >
      <Content className="flex flex-col items-center py-24 max-md:py-16">
        <motion.div
          className="flex flex-col items-center gap-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h1 className="text-42 font-bold text-foreground max-md:text-32">
            함께 성장할 동료를 찾습니다
          </h1>
          <p className="text-18 text-foreground-muted max-md:text-16 max-w-[500px]">
            반려동물과 보호자를 위한 더 나은 서비스를 만들어갈
            <br className="max-md:hidden" /> 열정 넘치는 분들을 기다립니다.
          </p>
        </motion.div>
      </Content>
    </section>
  );
}
