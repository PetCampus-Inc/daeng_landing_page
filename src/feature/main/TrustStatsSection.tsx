'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

import { Content } from '@/components/Content';
import { DownloadStatIcon, NotebookIcon, PinStatIcon, SearchIcon, StarIcon } from '@/assets/icons';
import { cn } from '@/lib/tw';

const EASE = 'easeInOut' as const;

// TODO(신뢰지표 확정 수치): 아래 3개는 실측치가 아직 확정되지 않아 디자인 목업 값을
// 임시로 넣어둔 것. 마케팅팀 확정 수치가 나오면 이 값들만 교체하면 된다 (PRD P-02).
const STATS = [
  { icon: DownloadStatIcon, label: '누적 다운로드', value: 12, unit: '만+', decimals: 0 },
  { icon: PinStatIcon, label: '등록된 유치원', value: 860, unit: '곳', decimals: 0 },
  { icon: StarIcon, label: '앱스토어 평점', value: 4.9, unit: '/5', decimals: 1 },
] as const;

function formatValue(value: number, decimals: number) {
  return decimals === 0 ? Math.round(value).toLocaleString('ko-KR') : value.toFixed(decimals);
}

// 신뢰지표 숫자 카운트업 (1.1s, cubic ease-out) — 뷰포트 진입 시 1회만 재생.
function useCountUp(target: number, active: boolean, duration = 1100) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target, duration]);

  return value;
}

function StatCard({
  stat,
  active,
  isFirst,
}: {
  stat: (typeof STATS)[number];
  active: boolean;
  isFirst: boolean;
}) {
  const value = useCountUp(stat.value, active);
  const Icon = stat.icon;

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 border-t border-border py-6 text-center first:border-t-0',
        'md:col-span-4 md:w-full md:border-l md:border-t-0 md:border-border md:py-0 md:last:border-b-0',
        isFirst && 'md:border-l-0',
      )}
    >
      <Icon className="size-6 text-primary md:size-10" />

      <div className="flex w-full flex-col items-center gap-3">
        <span className="inline-flex items-baseline justify-center whitespace-nowrap text-display-3 font-bold text-primary md:text-display-1">
          <span className="translate-y-0.5">{formatValue(value, stat.decimals)}</span>
          <span className="text-body-1 text-foreground md:text-heading-1">{stat.unit}</span>
        </span>
        <span className="text-body-1 font-bold md:text-heading-2">{stat.label}</span>
      </div>
    </div>
  );
}

export function TrustStatsSection({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <section
      id="s03"
      className={cn(
        'fixed-trust-section tablet-trust-section tablet-viewport-section flex w-full items-center justify-center bg-background pt-12 pb-6 md:py-28',
        className,
      )}
    >
      <Content>
        <motion.h2
          className="flex w-full flex-col gap-1 text-heading-3 font-bold md:gap-2 md:text-display-3"
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="inline-flex items-center md:whitespace-nowrap">
            <span className="mr-1 inline-flex items-center gap-1 rounded-full bg-surface-accent px-4 py-1 text-heading-3 text-primary md:mr-2 md:text-display-3">
              <SearchIcon className="size-6 md:size-9" />
              탐색
            </span>
            {'부터'}
            <span className="mx-1 inline-flex items-center gap-1 rounded-full bg-surface-accent px-4 py-1 text-heading-3 text-primary md:mx-2 md:text-display-3">
              <NotebookIcon className="size-6 md:size-9" />
              알림장
            </span>
            {'까지,'}
          </span>
          <span className="md:whitespace-nowrap">강아지 유치원 생활을 한 곳에 모아놨어요</span>
        </motion.h2>

        <motion.div
          ref={statsRef}
          className="mt-5 flex flex-col md:mt-24 md:grid md:grid-cols-12 md:items-stretch md:gap-4 xl:gap-6"
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        >
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} active={inView} isFirst={i === 0} />
          ))}
        </motion.div>
      </Content>
    </section>
  );
}
