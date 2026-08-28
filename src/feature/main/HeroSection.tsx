'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

import { Content } from '@/components/Content';
import { AppDownloadDrawer } from '@/components/AppDownloadDrawer';
import { CaretDownIcon } from '@/assets/icons';
import { cn } from '@/lib/tw';

const EASE = 'easeInOut' as const;

// 탐색 → 연결 → 기록. 제품 흐름 그대로의 순서라 한 줄씩 시차를 두고 등장시킨다.
const HEADLINE = [
  { verb: '탐색하고', mark: ',' },
  { verb: '연결하고', mark: ',' },
  { verb: '기록하는', mark: '.' },
];

const HERO_ALT = '강아지 유치원에 함께 온 보호자와 반려견';

export function HeroSection({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollHintOpacity = useTransform(scrollY, [0, 140], [1, 0]);

  const rise = (order: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASE, delay: 0.15 + order * 0.12 },
  });

  return (
    <section
      className={cn(
        'relative isolate flex min-h-[100svh] items-center overflow-hidden pt-header',
        className,
      )}
    >
      {/* 모바일: 이미지를 배경으로 깔고 그 위에 텍스트 */}
      <div className="absolute inset-0 -z-10 bg-foreground md:hidden">
        <Image
          src="/images/hero-mobile.png"
          alt={HERO_ALT}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/10" />
      </div>

      <Content className="grid items-center gap-y-10 py-20 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-x-16 md:py-24">
        <div className="flex flex-col items-start text-white md:text-foreground">
          <motion.p
            className="text-14 font-medium text-white/85 md:text-foreground-muted"
            {...rise(0)}
          >
            한 곳에서 관리하는 우리 강아지 유치원 생활
          </motion.p>

          <h1 className="mt-5 flex flex-col text-48 font-bold leading-[1.1] md:mt-6 md:text-56">
            {HEADLINE.map(({ verb, mark }, i) => (
              <motion.span key={verb} {...rise(i + 1)}>
                {verb}
                <span className="text-primary">{mark}</span>
              </motion.span>
            ))}
          </h1>

          <motion.div className="mt-10 md:mt-12" {...rise(4)}>
            <AppDownloadDrawer>
              <button
                type="button"
                className={cn(
                  'inline-flex items-center rounded-full bg-primary px-7 py-3.5 text-16 font-semibold text-primary-foreground',
                  'transition-colors duration-150 hover:bg-orange-600',
                  'active:scale-[0.98] active:transition-transform',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                )}
              >
                앱 다운로드
              </button>
            </AppDownloadDrawer>
          </motion.div>
        </div>

        {/* 데스크탑: 우측에 이미지 패널 (좌우 배치) */}
        <motion.div
          className="relative hidden aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface md:block"
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          <Image
            src="/images/hero-desktop.png"
            alt={HERO_ALT}
            fill
            priority
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </Content>

      {/* 스크롤 유도 — 페이지 진입 시부터 bounce, 스크롤을 시작하면 사라진다 (FR-LP-004) */}
      <motion.button
        type="button"
        onClick={() => window.scrollBy({ top: window.innerHeight - 80, behavior: 'smooth' })}
        style={{ opacity: scrollHintOpacity }}
        aria-label="다음 섹션으로 이동"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-white/80 md:text-foreground-muted"
      >
        <span className="text-13">scroll</span>
        <CaretDownIcon className="size-4 motion-safe:animate-bounce" />
      </motion.button>
    </section>
  );
}
