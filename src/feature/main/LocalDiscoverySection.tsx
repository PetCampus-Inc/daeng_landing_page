'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import s04CompareImage from '@/assets/images/s04-compare.webp';
import s04FilterImage from '@/assets/images/s04-filter.webp';
import s04MapImage from '@/assets/images/s04-map.webp';
import { Content } from '@/components/Content';
import { useScrollLinkedSteps } from '@/hooks/useScrollLinkedSteps';
import { cn } from '@/lib/tw';

const EASE = 'easeInOut' as const;

const STEPS = [
  {
    label: '지도에서 한눈에',
    body: '우리 동네 유치원을\n지도에서 한눈에 확인할 수 있어요',
    tabletBody: '우리 동네 유치원을\n지도에서 한눈에\n확인할 수 있어요',
    image: s04MapImage,
    caption: '강아지 유치원 지도 탐색 화면',
  },
  {
    label: '원하는 조건만 쏙쏙',
    body: '규모나 비용 같은 조건에 맞는\n유치원만 골라볼 수 있어요',
    tabletBody: '규모나 비용같은\n조건에 맞는 유치원만\n골라볼 수 있어요',
    image: s04FilterImage,
    caption: '유치원 조건 필터 화면',
  },
  {
    label: '나란히 놓고 비교',
    body: '고민 중인 유치원들을\n한 곳에서 나란히 비교할 수 있어요',
    tabletBody: '고민 중인 유치원들을\n한 곳에서 나란히\n비교할 수 있어요',
    image: s04CompareImage,
    isCompound: true,
    tabletTranslateX: '-51.99%',
    caption: '유치원 비교 화면',
  },
];

function TabButton({
  step,
  active,
  onClick,
}: {
  step: (typeof STEPS)[number];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        // 모바일: 첫 탭 위 디바이더 제거(목업 바로 아래 불필요한 선). md 이상은 원래대로 유지.
        'w-full border-t border-border py-5 text-left text-body-2 font-bold transition-colors duration-140 first:border-t-0 md:text-heading-2 md:first:border-t',
        active ? 'text-foreground' : 'text-foreground-muted/60 hover:text-foreground-muted',
      )}
    >
      {step.label}
    </button>
  );
}

// 목업 상단 약 60%만 노출한다. 이미지 박스를 패널보다 크게(100/60 ≈ 167%) 잡고 위로
// 정렬하면, 폰이 그만큼 확대돼서 화면 내용이 읽히고 아래쪽은 패널에 잘린다.
// 패널 높이를 키우면 목업도 같은 비율로 함께 커진다.
const MOCKUP_REVEAL = 'h-[167%]';

function ImagePanel({ step, className }: { step: (typeof STEPS)[number]; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        'relative h-[46rem] w-full overflow-hidden rounded-r6 bg-neutral-200 md:h-[54rem]',
        className,
      )}
    >
      {/* 모바일 프레임 안쪽 헤드룸은 20px(pt-5)로 통일하고,
          md 이상에서는 기존 중앙 배치와 32px(pt-8) 헤드룸을 유지한다.
          fill은 padding을 무시하고 padding box까지 채우므로, 패딩이 실제로 반영된
          콘텐츠 박스(relative h-full w-full)를 한 번 더 감싸서 그 안에서 fill한다. */}
      <div className="absolute inset-0 md:inset-x-0 md:inset-y-0 md:my-auto md:h-[52rem]">
        <div
          className={cn(
            'tablet-mockup-reveal absolute inset-x-0 top-0 px-10 pt-5 md:pt-8',
            MOCKUP_REVEAL,
          )}
        >
          <div className="relative h-full w-full">
            <AnimatePresence initial={false}>
              <motion.div
                key={step.caption}
                className="absolute inset-0"
                initial={{ opacity: reduce ? 1 : 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.3, ease: 'easeOut' }}
              >
                {step.isCompound ? (
                  <>
                    <Image
                      src={step.image}
                      alt={step.caption}
                      fill
                      sizes="(min-width: 1200px) 45vw, 100vw"
                      className="object-contain object-top max-md:-translate-y-2 md:hidden lg:block"
                    />
                    <Image
                      src={step.image}
                      alt=""
                      aria-hidden
                      sizes="45vw"
                      className="absolute left-1/2 top-0 hidden h-full w-auto max-w-none object-contain object-top md:block lg:hidden"
                      style={{ transform: `translateX(${step.tabletTranslateX})` }}
                    />
                  </>
                ) : (
                  <Image
                    src={step.image}
                    alt={step.caption}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-contain object-top"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-neutral-200/95" />
    </div>
  );
}

export function LocalDiscoverySection({ className }: { className?: string }) {
  const { active, setStepRef, goTo } = useScrollLinkedSteps(STEPS.length);
  const current = STEPS[active];
  const bodyLines = current.body.split('\n');
  const tabletBodyLines = current.tabletBody.split('\n');

  return (
    <section id="s04" className={cn('relative w-full bg-surface', className)}>
      {/* 데스크탑: 스크롤 연동 (FR-LP-013) — sticky 콘텐츠 + 뷰포트 중앙 밴드로 스텝 감지 */}
      <div className="tablet-story-track viewport-story-track relative hidden md:block">
        <div className="tablet-viewport-section viewport-panel sticky top-0 flex items-center overflow-hidden">
          {/* 텍스트/이미지 1:1. 메인 문구 영역은 S-05와 같은 높이를 사용해
              탭 전환 시 레이아웃을 고정하고 양쪽 콘텐츠의 중심을 맞춘다. */}
          <Content className="tablet-split-grid grid grid-cols-12 items-center gap-x-6 xl:gap-x-10">
            <div className="tablet-text-span col-span-6 xl:col-span-5">
              <p className="text-body-1 font-bold text-primary">우리 동네에서</p>
              {/* 줄 사이 간격을 line-height가 아니라 flex gap-2(8px)로 정확히 맞춘다 */}
              <motion.h2
                key={current.body}
                className="mt-5 hidden min-h-[7.25rem] flex-col gap-1 break-keep text-display-3 font-bold xl:flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {bodyLines.map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </motion.h2>
              <motion.h2
                key={`${current.body}-tablet`}
                className="mt-5 hidden min-h-[14.2rem] flex-col gap-2 break-keep text-display-4 font-bold md:flex xl:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {tabletBodyLines.map((line, i) => (
                  <span key={i} className="whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </motion.h2>
              <div className="mt-10 flex flex-col">
                {STEPS.map((step, i) => (
                  <TabButton
                    key={step.label}
                    step={step}
                    active={i === active}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
            </div>
            <ImagePanel step={current} className="tablet-visual-span col-span-6 xl:col-span-7" />
          </Content>
        </div>

        {/* 스크롤 감지용 sentinel — 시각적으로는 숨김, 섹션 전체 높이를 STEPS 개수로 등분.
            pointer-events-none 필수: 안 그러면 이 투명 오버레이가 sticky 콘텐츠 위에서
            클릭을 가로채서 탭 버튼이 눌리지 않는다. */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {STEPS.map((_, i) => (
            <div
              key={i}
              ref={setStepRef(i)}
              className="absolute inset-x-0"
              style={{ top: `${(i / STEPS.length) * 100}%`, height: `${100 / STEPS.length}%` }}
            />
          ))}
        </div>
      </div>

      {/* 모바일: 세로 스택, 클릭 전환만 */}
      <div className="pt-12 pb-6 md:hidden">
        <Content>
          <p className="text-caption-1 font-bold text-primary">우리 동네에서</p>
          <h2 className="mt-4 flex min-h-[4.75rem] flex-col gap-[2px] break-keep text-heading-3 font-bold">
            {bodyLines.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </h2>
          <ImagePanel step={current} className="mt-5 h-[28rem]" />
          <div className="mt-6 flex flex-col">
            {STEPS.map((step, i) => (
              <TabButton
                key={step.label}
                step={step}
                active={i === active}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </Content>
      </div>
    </section>
  );
}
