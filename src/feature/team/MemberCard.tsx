'use client';

import { IconType, IconButton } from '@/components/IconButton';
import Image from 'next/image';

import { cn } from '@/lib/tw';
import { LinkType, MemberInfo } from '@/types';

const LINK_ICON_MAP: Record<LinkType, IconType> = {
  GitHub: 'GitHubIcon',
  LinkedIn: 'LinkedInIcon',
  Velog: 'VelogIcon',
  Instagram: 'InstagramIcon',
  Mail: 'MailIcon',
};

export interface MemberCardProps {
  className?: string;
  member: MemberInfo;
}

export function MemberCard({ className, member }: MemberCardProps) {
  return (
    <div className={cn('flex flex-col px-4 py-2 bg-background max-sm:border-b', className)}>
      <div className="flex gap-6 max-sm:gap-5 min-sm:flex-col items-center">
        <div className="relative size-32 max-sm:size-18 aspect-square bg-surface-accent rounded-full border overflow-hidden">
          <Image
            className="object-cover object-center"
            src={member.imageUrl}
            alt="프로필 사진"
            fill
          />
        </div>

        <div className="flex flex-col min-sm:items-center">
          {/* 이름 */}
          <p className="text-20 font-semibold">{member.name}</p>

          {/* 담당 */}
          <p className="text-14 text-foreground-muted">{member.badges.join(' & ')}</p>
        </div>
      </div>

      {/* 소개글 */}
      <p className="overflow-hidden text-foreground-muted bg-background line-clamp-2 mt-4 min-sm:text-center min-sm:h-12">
        {member.introduction}
      </p>

      {/* 링크 버튼 그룹 */}
      <div className="flex min-sm:w-full gap-1 mt-4 justify-end min-sm:justify-center">
        {member.links.map(({ type, url }) => (
          <a key={type} href={url} target="_blank" rel="noopener noreferrer">
            <IconButton icon={LINK_ICON_MAP[type]} aria-label={`${member.name} ${type} 링크`} />
          </a>
        ))}
      </div>
    </div>
  );
}
