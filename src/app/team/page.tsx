import { MemberGrid } from '@/components/MemberGrid';
import { TeamCultureGrid } from '@/components/TeamCultureGrid';

export default async function TeamPage() {
  return (
    <div className="h-full w-full">
      <h2 className="text-title-42 whitespace-nowrap max-sm:text-title-32 mb-4">
        어쩌구한 팀문화이다
      </h2>
      <p className="text-body-18 text-foreground-muted whitespace-pre-line mb-2 max-sm:text-body-16">
        어떠어떠한 목표를 향해 어떤 어떤 어쩌구저쩌구{'\n'}
        어떠어떠한 목표를 향해 어떤 어떤 어쩌구저쩌구 어쩌구저쩌구.
      </p>

      <TeamCultureGrid className="mt-9" />

      {/* 타이틀 */}
      <div className="flex items-center gap-6 mt-[16rem] max-sm:mt-[12rem]">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-border-accent" />
        <h2 className="text-title-32 whitespace-nowrap max-sm:text-title-24">팀원 소개</h2>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-border-accent" />
      </div>

      {/* 서브 타이틀 */}
      <p className="text-body-18 text-foreground-muted text-center whitespace-pre-line mt-2 max-sm:text-body-16">
        어떠어떠한 목표를 향해 어떤 어떤 어쩌구저쩌구
      </p>

      <MemberGrid className="mt-6" />
    </div>
  );
}
