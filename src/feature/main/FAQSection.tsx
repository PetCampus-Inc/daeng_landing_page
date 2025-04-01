import { Accordion } from '@/components/Accordion';
import { Content } from '@/components/Content';
import { fetchGitHubContent } from '@/lib/github';
import { cn } from '@/lib/tw';
import { QnA } from '@/types';

export async function FAQSection({ className }: { className?: string }) {
  const data = await fetchGitHubContent<QnA[]>('QNA');

  return (
    <section className={cn('w-screen flex justify-center', className)}>
      <Content>
        <h2 className="text-32 max-md:text-28 font-semibold">자주 묻는 질문</h2>

        <div className="flex flex-col gap-2 mt-8">
          {data.map(({ id, question, answer }) => (
            <Accordion key={id} title={question}>
              {answer}
            </Accordion>
          ))}
        </div>
      </Content>
    </section>
  );
}
