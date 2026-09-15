'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import s06Step1Image from '@/assets/images/s06-step1.webp';
import s06Step2Image from '@/assets/images/s06-step2.webp';
import s06Step3Image from '@/assets/images/s06-step3.webp';
import s06Step4Image from '@/assets/images/s06-step4.webp';
import { Content } from '@/components/Content';
import { useScrollLinkedSteps } from '@/hooks/useScrollLinkedSteps';
import { cn } from '@/lib/tw';

const EASE = 'easeInOut' as const;

const STEPS = [
  {
    label: '유치원 정보는 똑독이 채워 둘게요',
    body: '등록된 유치원이면 정보를 바로 불러오고,\n없어도 새로 입력할 수 있어요',
    tabletBody: '등록된 유치원이면\n정보를 바로 불러오고\n없어도 새로 입력할 수 있어요',
    image: s06Step1Image,
    isCompound: true,
    tabletTranslateX: '-45.93%',
    tabletTop: '0px',
    caption: '유치원 정보 자동 입력 화면',
  },
  {
    label: '보호자 초대를 간편하게',
    body: 'QR이나 링크만 공유하면,\n보호자가 바로 등록 신청을 할 수 있어요',
    tabletBody: 'QR이나 링크만 공유하면,\n보호자가 바로\n등록 신청을 할 수 있어요',
    image: s06Step2Image,
    caption: '보호자 초대 QR 화면',
  },
  {
    label: '등하원은 더 빠르게',
    body: '등하원을 기록하면,\n보호자에게도 자동으로 알려드려요',
    tabletBody: '등하원을 기록하면,\n보호자에게도\n자동으로 알려드려요',
    image: s06Step3Image,
    caption: '등하원 처리 화면',
  },
  {
    label: '알림장은 템플릿으로 골라서',
    body: '자주 쓰는 알림장 문구를 저장해두고,\n필요할 때 바로 불러와요',
    tabletBody: '자주 쓰는\n알림장 문구를 저장해두고,\n필요할 때 바로 불러와요',
    image: s06Step4Image,
    isCompound: true,
    tabletTranslateX: '-47.38%',
    tabletTop: '30px',
    caption: '알림장 템플릿 화면',
  },
];

function StepRow({
  step,
  index,
  active,
  onClick,
}: {
  step: (typeof STEPS)[number];
  index: number;
  active: number;
  onClick: () => void;
}) {
  const isCurrent = index === active;
  const isDone = index < active;

  return (
    <button type="button" onClick={onClick} className="flex gap-5 text-left">
      <span className="flex w-6 flex-shrink-0 flex-col items-center">
        {/* 모바일 전용: 점 8x8px(size-2), 연결선 1px(w-px). md 이상은 기존 크기 유지 */}
        <span
          className={cn(
            'mt-1 size-2 rounded-full transition-all duration-140 md:size-2.5',
            isCurrent ? 'bg-primary md:size-3.5' : isDone ? 'bg-primary' : 'bg-neutral-700',
          )}
        />
        {index !== STEPS.length - 1 && (
          <span
            className={cn(
              'mt-1.5 min-h-[3.25rem] w-px flex-1 md:w-0.5',
              isDone ? 'bg-primary' : 'bg-neutral-800',
            )}
          />
        )}
      </span>
      <span
        className={cn(
          'pb-8 text-body-2 font-bold md:text-heading-2',
          isCurrent ? 'text-white' : 'text-foreground-muted',
        )}
      >
        {step.label}
      </span>
    </button>
  );
}

const MOCKUP_REVEAL = 'h-[167%]';

function ImagePanel({ step, className }: { step: (typeof STEPS)[number]; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        'relative h-[46rem] w-full overflow-hidden rounded-r6 bg-neutral-800 md:h-[54rem]',
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
                {step.isCompound ? (
                  <>
                    <Image
                      src={step.image}
                      alt={step.caption}
                      fill
                      sizes="(min-width: 1360px) 45vw, 100vw"
                      className="object-contain object-top max-md:-translate-y-2 md:hidden xl:block"
                    />
                    <Image
                      src={step.image}
                      alt=""
                      aria-hidden
                      sizes="45vw"
                      className="absolute left-1/2 top-0 hidden h-full w-auto max-w-none object-contain object-top md:block xl:hidden"
                      style={{
                        top: step.tabletTop,
                        transform: `translateX(${step.tabletTranslateX})`,
                      }}
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
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-neutral-800/95" />
    </div>
  );
}

export function DirectorSection({ className }: { className?: string }) {
  const { active, setStepRef, goTo } = useScrollLinkedSteps(STEPS.length);
  const current = STEPS[active];
  const bodyLines = current.body.split('\n');
  const tabletBodyLines = current.tabletBody.split('\n');

  return (
    <section id="s06" className={cn('relative w-full bg-neutral-900 text-white', className)}>
      {/* 데스크탑: 스크롤 연동 — 세로 스텝 인디케이터(점 4개 + 연결선) */}
      <div className="tablet-story-track viewport-story-track-long relative hidden md:block">
        <div className="tablet-viewport-section viewport-panel sticky top-0 flex items-center overflow-hidden">
          <Content className="tablet-split-grid grid grid-cols-12 items-center gap-x-6 xl:gap-x-10">
            <div className="col-span-6">
              <p className="text-body-1 font-bold text-orange-400">원장님과 함께</p>
              <motion.h2
                key={current.body}
                className="mt-5 hidden min-h-[7.25rem] flex-col gap-1 break-keep text-display-3 font-bold text-white xl:flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {bodyLines.map((line) => (
                  <span key={line} className="md:whitespace-nowrap">
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
              <div className="mt-14 flex flex-col">
                {STEPS.map((step, i) => (
                  <StepRow
                    key={step.label}
                    step={step}
                    index={i}
                    active={active}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
            </div>
            <ImagePanel step={current} className="col-span-6" />
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
          <p className="text-caption-1 font-bold text-orange-400">원장님과 함께</p>
          <h2 className="mt-4 flex min-h-[6.5rem] flex-col gap-[2px] break-keep text-heading-3 font-bold text-white">
            {bodyLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <ImagePanel step={current} className="mt-5 h-[26rem]" />
          {/* 목업 프레임 ↔ 안내 문구 버튼 간격: 기존 20px(mt-5)에서 +20px = 40px(mt-10) */}
          <div className="mt-10 flex flex-col">
            {STEPS.map((step, i) => (
              <StepRow
                key={step.label}
                step={step}
                index={i}
                active={active}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </Content>
      </div>
    </section>
  );
}
