import type { Position } from '@/types';

export const POSITIONS: Position[] = [
  {
    id: 'fe',
    title: 'Frontend 개발자',
    team: '개발팀',
    type: '정규직',
    description: 'React, Next.js 기반의 웹 서비스 개발',
  },
  {
    id: 'be',
    title: 'Backend 개발자',
    team: '개발팀',
    type: '정규직',
    description: '서버 및 API 설계, 데이터베이스 관리',
  },
  {
    id: 'pm',
    title: 'PM (기획자)',
    team: '기획팀',
    type: '정규직',
    description: '서비스 기획 및 프로젝트 관리',
  },
  {
    id: 'design',
    title: 'UX/UI 디자이너',
    team: '디자인팀',
    type: '정규직',
    description: '사용자 경험 설계 및 UI 디자인',
  },
  {
    id: 'marketing',
    title: '마케터',
    team: '마케팅팀',
    type: '정규직',
    description: '브랜드 마케팅 및 그로스 전략 수립',
  },
];
