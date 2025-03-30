import { Accordion } from '@/components/Accordion';
import { Content } from '@/components/Content';
import { getQna } from '@/lib/github';
import { cn } from '@/lib/tw';

export async function FAQSection({ className }: { className?: string }) {
  const qnas = await getQna();

  return (
    <section className={cn('w-screen flex justify-center', className)}>
      <Content>
        <h2 className="text-32 max-md:text-28 font-semibold">자주 묻는 질문</h2>

        <div className="flex flex-col gap-2 mt-8">
          {qnas.map(({ id, question, answer }) => (
            <Accordion key={id} title={question}>
              {answer}
            </Accordion>
          ))}
        </div>
      </Content>
    </section>
  );
}
