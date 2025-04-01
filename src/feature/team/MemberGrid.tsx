import { cn } from '@/lib/tw';
import { fetchGitHubContent } from '@/lib/github';
import { MemberInfo } from '@/types';

import { MemberCard } from './MemberCard';

interface MemberGridProps {
  className?: string;
}

export async function MemberGrid({ className }: MemberGridProps) {
  const members = await fetchGitHubContent<MemberInfo[]>('MEMBERS');

  return (
    <div
      className={cn(
        'grid grid-cols-3 gap-6 gap-y-12 max-sm:gap-y-8 max-sm:grid-cols-1 max-md:grid-cols-2 py-4',
        className,
      )}
    >
      {members.map((member) => (
        <MemberCard key={member.name} member={member} />
      ))}
    </div>
  );
}
