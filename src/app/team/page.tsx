import { Content } from '@/components/Content';
import { MemberGrid } from '@/feature/team/MemberGrid';
import { TeamCultureGrid } from '@/feature/team/TeamCultureGrid';

export default async function TeamPage() {
  return (
    <Content className="mt-[12rem] pt-header max-sm:mt-[10rem]">
      <h2 className="text-42 font-semibold whitespace-nowrap max-sm:text-32 mb-4">
        어쩌구한 팀문화이다
      </h2>
      <p className="text-18 text-foreground-muted whitespace-pre-line mb-2 max-sm:text-16">
        어떠어떠한 목표를 향해 어떤 어떤 어쩌구저쩌구{'\n'}
        어떠어떠한 목표를 향해 어떤 어떤 어쩌구저쩌구 어쩌구저쩌구.
      </p>

      <TeamCultureGrid className="mt-9" />

      {/* 타이틀 */}
      <div className="flex items-center gap-6 mt-[16rem] max-sm:mt-[12rem]">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-border-accent" />
        <h2 className="text-32 font-semibold whitespace-nowrap max-sm:text-title-24">팀원 소개</h2>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-border-accent" />
      </div>

      {/* 서브 타이틀 */}
      <p className="text-18 text-foreground-muted text-center whitespace-pre-line mt-2 max-sm:text-16">
        어떠어떠한 목표를 향해 어떤 어떤 어쩌구저쩌구
      </p>

      <MemberGrid className="mt-6" />
    </Content>
  );
}
