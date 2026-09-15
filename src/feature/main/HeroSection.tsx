'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

import { Content } from '@/components/Content';
import { AppDownloadDrawer } from '@/components/AppDownloadDrawer';
import { CaretDownIcon } from '@/assets/icons';
import { cn } from '@/lib/tw';

const EASE = 'easeInOut' as const;

// 탐색 → 연결 → 기록. 최종 시안(S-02): 쉼표·마침표 없이 각 동사 뒤에
// 오렌지 형광펜 마커로만 강조한다 (기존 "문장부호만 오렌지" 버전에서 교체).
const HEADLINE = [
  { mark: '탐색', rest: '하고' },
  { mark: '연결', rest: '하고' },
  { mark: '기록', rest: '하는' },
];

const HERO_ALT = '강아지 유치원에 함께 온 보호자와 반려견';

export function HeroSection({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollHintOpacity = useTransform(scrollY, [0, 140], [1, 0]);

  const rise = (order: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, ease: EASE, delay: 0.15 + order * 0.12 },
  });

  return (
    <section
      id="top"
      className={cn(
        // 모바일: 콘텐츠를 세로 중앙이 아니라 좌하단에 배치, 하단 48px 여백(pb-12)
        'mobile-viewport-section relative isolate flex h-[clamp(640px,100svh,900px)] items-end overflow-hidden pb-12 pt-header',
        'md:h-[clamp(640px,min(100svh,75vw),900px)] md:items-center md:pb-0',
        'tablet-hero-section tablet-viewport-section viewport-panel xl:h-svh',
        className,
      )}
    >
      {/* 풀블리드 배경 사진 + 하단 딤 그라디언트 (PC·모바일 동일 파일, object-position만 분기) */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero.webp"
          alt={HERO_ALT}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[52%_30%] md:object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F141A]/90 via-[#0F141A]/35 to-transparent" />
      </div>

      {/* 히어로만 예외: <Content>의 바깥 wrapper가 모바일 px-4(16px)를 고정으로 주는데,
          여기에 pl-2(8px)를 더해 16+8=24px로 맞춘다. md 이상은 원래 32px라 pl-0으로 취소. */}
      <Content className="flex flex-col items-start pl-2 text-white md:pl-0">
        {/* 모바일은 디자인 시스템 토큰 안에서 Display 3(40px)을 사용하고,
            md 이상에서만 기존 히어로 예외값(70px)을 유지한다. */}
        <h1 className="flex flex-col gap-2 text-display-3 font-bold md:text-[70px] md:leading-[1.18] md:tracking-[-0.02em]">
          {HEADLINE.map(({ mark, rest }, i) => (
            <motion.span key={mark} {...rise(i)}>
              <span className="relative inline-block">
                {mark}
                <motion.span
                  className="absolute inset-x-[-2px] bottom-0 -z-10 h-2 bg-primary md:h-4 md:translate-y-0.5"
                  initial={{ clipPath: reduce ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }}
                  whileInView={{ clipPath: 'inset(0 0 0 0)' }}
                  viewport={{ once: true }}
                  transition={{
                    duration: reduce ? 0 : 0.35,
                    ease: 'easeOut',
                    delay: reduce ? 0 : 0.95 + i * 0.14,
                  }}
                />
              </span>
              {rest}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-4 text-body-1 font-medium text-white/85 md:mt-6 md:text-heading-1"
          {...rise(3)}
        >
          <span className="block md:inline">한 곳에서 관리하는</span>
          <span className="block md:inline md:before:content-['\00a0']">우리 강아지 유치원</span>
        </motion.p>

        <motion.div className="mt-5 md:mt-12" {...rise(4)}>
          <AppDownloadDrawer>
            <button
              type="button"
              className={cn(
                'inline-flex h-12 items-center rounded-full bg-primary px-6 text-label font-bold text-primary-foreground md:h-auto md:px-8 md:py-4 md:text-heading-3',
                'transition-colors duration-140 hover:bg-orange-600',
                'active:scale-95 active:bg-orange-700 active:transition-transform',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              )}
            >
              앱 다운로드
            </button>
          </AppDownloadDrawer>
        </motion.div>
      </Content>

      {/* 스크롤 유도 — 진입 시부터 bounce, 스크롤 시작하면 페이드아웃 (FR-LP-004) */}
      <motion.button
        type="button"
        onClick={() =>
          window.scrollBy({ top: window.innerHeight - 80, behavior: reduce ? 'auto' : 'smooth' })
        }
        style={{ opacity: scrollHintOpacity }}
        aria-label="다음 섹션으로 이동"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-white/75 md:bottom-8 md:flex"
      >
        <span className="text-caption-2">SCROLL</span>
        <CaretDownIcon className="size-4 motion-safe:animate-bounce" />
      </motion.button>
    </section>
  );
}
