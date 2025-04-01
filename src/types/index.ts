import { IconType } from '@/components/IconButton';

export type LinkType = Extract<IconType, 'GitHub' | 'LinkedIn' | 'Velog' | 'Instagram' | 'Mail'>;

export interface MemberInfo {
  name: string;
  introduction: string;
  badges: string[];
  links: { type: LinkType; url: string }[];
  imageUrl: string;
}
export interface Culture {
  id: string;
  title: string;
  description: string;
  textColor?: string;
  imageUrl?: string;
}

export type CompanyInfo = {
  name: string;
  copyright: string;
  ceo: string;
  businessNumber: string;
  salesRegNumber: string;
  email: string;
};

export type AppInfo = {
  name: string;
  termsUrl: string;
  privacyUrl: string;
  policyUrl: string;
};

export type QnA = {
  id: string;
  question: string;
  answer: string;
};
