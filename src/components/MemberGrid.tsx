'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MemberCard, type MemberInfo } from '@/components/MemberCard';
import { getTeamMembers } from '@/lib/github';
import { cn } from '@/lib/tw';

interface MemberGridProps {
  className?: string;
}

export function MemberGrid({ className }: MemberGridProps) {
  const [members, setMembers] = useState<MemberInfo[]>([]);

  useEffect(() => {
    getTeamMembers().then((members) => setMembers(members));
  }, []);

  return (
    <div
      className={cn('grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1 py-4', className)}
    >
      {members.map((member) => (
        <motion.div key={member.name}>
          <MemberCard member={member} />
        </motion.div>
      ))}
    </div>
  );
}
