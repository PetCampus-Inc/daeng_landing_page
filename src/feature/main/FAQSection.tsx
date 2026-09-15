import { Content } from '@/components/Content';
import { fetchGitHubContent } from '@/lib/github';
import { cn } from '@/lib/tw';
import { QnA } from '@/types';

export async function FAQSection({ className }: { className?: string }) {
  const data = await fetchGitHubContent<QnA[]>('QNA');

  return (
    <section
      id="s07"
      className={cn(
        // 모바일: S-04~06과 동일하게 고정 높이 없이 hug(콘텐츠 길이만큼), pt-12/pb-6(48/24px).
        // md 이상은 기존 히어로(S-02)와 동일한 화면 높이 기준 유지 (E-05).
        'flex w-full items-center justify-center bg-background pt-12 pb-6',
        'md:min-h-[clamp(640px,min(100svh,75vw),900px)] md:py-28',
        'viewport-content-section xl:min-h-svh',
        className,
      )}
    >
      <Content>
        {/* 모바일 전용 크기: 타이틀 18px/뱃지 12px/질답 14px/아이콘 16px. md 이상은 원래 값 유지 */}
        <h2 className="text-center text-heading-3 font-bold md:text-display-3">자주 묻는 질문들</h2>

        {/* 다중 펼침 허용 (FR-LP-008) — <details>는 각자 독립 상태라 별도 로직 불필요 */}
        <div className="mx-auto mt-10 flex w-full max-w-[96rem] flex-col md:mt-16">
          {data.map(({ id, question, answer }, index) => (
            <details
              key={id}
              className="group border-b border-border first:border-t md:first:border-t-0"
            >
              <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden md:py-6">
                <span className="flex items-center gap-4">
                  <span
                    className={cn(
                      'inline-flex shrink-0 items-center rounded-full px-2 py-1 text-caption-1 font-bold md:px-3 md:py-2 md:text-label',
                      index < 5
                        ? 'bg-surface-accent text-primary'
                        : 'bg-neutral-100 text-neutral-500',
                    )}
                  >
                    {index < 5 ? '보호자' : '원장님'}
                  </span>
                  <span className="text-body-2 font-semibold md:text-heading-2">{question}</span>
                </span>
                <span className="relative block size-4 flex-shrink-0 text-foreground-muted md:size-5">
                  <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-current transition-transform duration-150 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="pb-6 text-body-2 text-foreground-muted md:whitespace-nowrap md:text-heading-2">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </Content>
    </section>
  );
}
