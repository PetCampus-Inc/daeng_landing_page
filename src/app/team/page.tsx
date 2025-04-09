import { Content } from '@/components/Content';
import { MemberGrid } from '@/feature/team/MemberGrid';
import { TeamCultureGrid } from '@/feature/team/TeamCultureGrid';

export default async function TeamPage() {
  return (
    <Content className="mt-[12rem] pt-header max-sm:mt-[10rem]">
      <h2 className="text-42 font-semibold whitespace-nowrap max-sm:text-32 mb-4">팀 문화</h2>
      <p className="text-20 text-foreground-muted whitespace-pre-line mb-2 max-sm:text-16">
        새로운 도전 앞에서도 주저하지 않고, 배운 것들을 서로 나누며 함께 성장해요.{'\n'}
        미친듯이 몰입하고 쉴 땐 제대로 쉬어가는 균형 있는 팀이에요.
      </p>

      <TeamCultureGrid className="mt-16" />

      {/* 타이틀 */}
      <div className="flex items-center gap-6 mt-[16rem] max-sm:mt-[12rem]">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-border-accent" />
        <h2 className="text-32 font-semibold whitespace-nowrap max-sm:text-24">팀원 소개</h2>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-border-accent" />
      </div>

      {/* 서브 타이틀 */}
      <p className="text-18 text-foreground-muted text-center whitespace-pre-line mt-2 max-sm:text-16">
        우리는 <span className="font-semibold">열정, 끈기, 성장, 도전</span> 입니다
      </p>

      <MemberGrid className="mt-18" />
    </Content>
  );
}
