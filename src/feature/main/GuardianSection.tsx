'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import s05AlbumImage from '@/assets/images/s05-album.webp';
import s05HomeImage from '@/assets/images/s05-home.webp';
import s05NoteImage from '@/assets/images/s05-note.webp';
import { Content } from '@/components/Content';
import { useScrollLinkedSteps } from '@/hooks/useScrollLinkedSteps';
import { cn } from '@/lib/tw';

const EASE = 'easeInOut' as const;

const STEPS = [
  {
    label: '등원부터 하원까지',
    body: '강아지의 등하원 상태를\n실시간으로 확인할 수 있어요',
    tabletBody: '강아지의\n등하원 상태를\n실시간으로 확인할 수 있어요',
    image: s05HomeImage,
    caption: '등하원 실시간 확인 화면',
  },
  {
    label: '오늘 하루를 담은 알림장',
    body: '강아지의 하루 이야기를\n알림장으로 편하게 받아볼 수 있어요',
    tabletBody: '강아지의\n하루 이야기를 알림장으로\n편하게 받아볼 수 있어요',
    image: s05NoteImage,
    caption: '강아지 유치원 알림장 화면',
  },
  {
    label: '소중한 순간은 앨범에',
    body: '유치원에서의 모습을\n앨범에서 언제든 다시 볼 수 있어요',
    tabletBody: '유치원에서의 모습을\n앨범에서 언제든\n다시 볼 수 있어요',
    image: s05AlbumImage,
    caption: '강아지 유치원 앨범 화면',
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
        'w-full border-t border-white/30 py-5 text-left text-body-2 font-bold transition-colors duration-140 first:border-t-0 md:text-heading-2 md:first:border-t',
        active ? 'text-white' : 'text-white/55 hover:text-white/75',
      )}
    >
      {step.label}
    </button>
  );
}

const MOCKUP_REVEAL = 'h-[167%]';

function ImagePanel({ step, className }: { step: (typeof STEPS)[number]; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        'relative h-[46rem] w-full overflow-hidden rounded-r6 bg-orange-400 md:h-[54rem]',
        className,
      )}
    >
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
                <Image
                  src={step.image}
                  alt={step.caption}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-contain object-top"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-orange-400/95" />
    </div>
  );
}

export function GuardianSection({ className }: { className?: string }) {
  const { active, setStepRef, goTo } = useScrollLinkedSteps(STEPS.length);
  const current = STEPS[active];
  const bodyLines = current.body.split('\n');
  const tabletBodyLines = current.tabletBody.split('\n');

  return (
    <section id="s05" className={cn('relative w-full bg-primary text-white', className)}>
      {/* 데스크탑: 스크롤 연동 — S-04와 좌우 교차(이미지-좌 / 텍스트-우) */}
      <div className="tablet-story-track viewport-story-track relative hidden md:block">
        <div className="tablet-viewport-section viewport-panel sticky top-0 flex items-center overflow-hidden">
          <Content className="tablet-split-grid grid grid-cols-12 items-center gap-x-6 xl:gap-x-10">
            <ImagePanel step={current} className="tablet-visual-span col-span-6 xl:col-span-7" />
            <div className="tablet-text-span col-span-6 xl:col-span-5">
              <p className="text-body-1 font-bold text-white/80">보호자와 함께</p>
              <motion.h2
                key={current.body}
                className="mt-5 hidden min-h-[7.25rem] flex-col gap-1 break-keep text-display-3 font-bold text-white xl:flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {bodyLines.map((line) => (
                  <span key={line} className="xl:whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </motion.h2>
              <motion.h2
                key={`${current.body}-tablet`}
                className="mt-5 hidden min-h-[14.2rem] flex-col gap-2 break-keep text-display-4 font-bold text-white md:flex xl:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {tabletBodyLines.map((line) => (
                  <span key={line} className="whitespace-nowrap">
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
          </Content>
        </div>

        {/* pointer-events-none 필수: 없으면 이 투명 오버레이가 sticky 콘텐츠의 클릭을 가로챈다 */}
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
          <p className="text-caption-1 font-bold text-white/80">보호자와 함께</p>
          <h2 className="mt-4 flex min-h-[4.75rem] flex-col gap-[2px] break-keep text-heading-3 font-bold text-white">
            {bodyLines.map((line) => (
              <span key={line}>{line}</span>
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
