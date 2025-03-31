'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { cn } from '@/lib/tw';
import { getTeamMembers } from '@/lib/github';
import { MemberInfo } from '@/types';

import { MemberCard } from './MemberCard';

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
      className={cn(
        'grid grid-cols-3 gap-6 gap-y-12 max-sm:gap-y-8 max-sm:grid-cols-1 max-md:grid-cols-2 py-4',
        className,
      )}
    >
      {members.map((member, index) => (
        <motion.div
          key={member.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeInOut', delay: index * 0.1 }}
        >
          <MemberCard member={member} />
        </motion.div>
      ))}
    </div>
  );
}
