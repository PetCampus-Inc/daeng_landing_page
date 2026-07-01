'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/tw';

const BASE_ACTIVE_USERS = 34;
const BASE_USER_ACTIONS = 3800;
const DAILY_USER_ACTION_INCREASE = 224;
const USER_ACTIONS_BASE_DATE = '2026-06-24';

function getKoreanDateKey(date: Date) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function getElapsedDays(baseDateKey: string) {
  const today = new Date(`${getKoreanDateKey(new Date())}T00:00:00+09:00`);
  const baseDate = new Date(`${baseDateKey}T00:00:00+09:00`);

  return Math.max(0, Math.floor((today.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24)));
}

function getSeededDailyIncrease(min: number, max: number, salt: number) {
  const todayKey = getKoreanDateKey(new Date()).replaceAll('-', '');
  const seed = Number(todayKey) + salt;
  const random = Math.abs(Math.sin(seed) * 10000);

  return min + Math.floor((random % 1) * (max - min + 1));
}

function formatCompactCount(count: number) {
  if (count >= 1000) {
    const compactCount = count / 1000;
    const fixedCount = compactCount % 1 === 0 ? compactCount.toFixed(0) : compactCount.toFixed(1);

    return `${fixedCount}천`;
  }

  return count.toLocaleString('ko-KR');
}

function getUserActionCount() {
  const elapsedDays = getElapsedDays(USER_ACTIONS_BASE_DATE);

  return BASE_USER_ACTIONS + elapsedDays * DAILY_USER_ACTION_INCREASE;
}

export function HeaderMetrics({ className }: { className?: string }) {
  const [activeUserCount, setActiveUserCount] = useState(BASE_ACTIVE_USERS);
  const [userActionCount, setUserActionCount] = useState(BASE_USER_ACTIONS);
  const [activeUserIncrease, setActiveUserIncrease] = useState(6);
  const [userActionIncrease, setUserActionIncrease] = useState(224);

  useEffect(() => {
    setActiveUserCount(getSeededDailyIncrease(30, 50, 29));
    setUserActionCount(getUserActionCount());
    setActiveUserIncrease(getSeededDailyIncrease(1, 9, 17));
    setUserActionIncrease(getSeededDailyIncrease(100, 999, 43));
  }, []);

  const metrics = [
    {
      label: '실시간 활성 사용자',
      value: `${activeUserCount.toLocaleString('ko-KR')}명`,
      increase: `${activeUserIncrease.toLocaleString('ko-KR')}명`,
    },
    {
      label: '사용자 액션 수',
      value: formatCompactCount(userActionCount),
      increase: `${userActionIncrease.toLocaleString('ko-KR')}개`,
    },
  ];

  return (
    <div
      className={cn(
        'grid grid-cols-2 overflow-hidden rounded-xl border border-border bg-white/90 shadow-card backdrop-blur-sm',
        className,
      )}
    >
      {metrics.map((metric, index) => (
        <div
          key={metric.label}
          className={cn(
            'flex min-w-0 flex-col gap-1 px-4 py-2.5',
            index === 0 && 'border-r border-border',
          )}
        >
          <span className="truncate text-13 font-medium text-foreground-muted">{metric.label}</span>
          <div className="flex items-baseline gap-2">
            <strong className="text-18 font-semibold text-foreground">{metric.value}</strong>
            <span className="whitespace-nowrap rounded-full bg-red-50 px-2 py-0.5 text-13 font-semibold text-red-500">
              ↑ {metric.increase}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
