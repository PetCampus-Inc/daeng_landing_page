import Link from 'next/link';

import { AppDownload } from '@/components/AppDownload';
import { Content } from '@/components/Content';
import { Logo } from '@/components/Logo';
import { fetchGitHubContent } from '@/lib/github';
import { cn } from '@/lib/tw';
import { AppInfo, CompanyInfo } from '@/types';

interface FooterProps {
  className?: string;
}

export async function Footer({ className }: FooterProps) {
  const companyInfo = await fetchGitHubContent<CompanyInfo>('COMPANY');
  const appInfo = await fetchGitHubContent<AppInfo>('APP_INFO');

  return (
    <footer
      id="s09"
      className={cn('flex justify-center bg-neutral-900 py-16 text-white', className)}
    >
      <Content>
        <div className="grid grid-cols-1 gap-12 border-b border-white/30 pb-12 md:grid-cols-2 md:gap-10">
          <div>
            <Logo className="flex items-center text-white" />

            <AppDownload className="mt-6 max-w-80" theme="dark" />

            <div className="mt-6 flex flex-wrap gap-5 text-body-2">
              <Link href="/work" className="text-white">
                일하는 방식
              </Link>
              <Link href="/careers" className="text-white">
                지원하기
              </Link>
              <Link
                href={appInfo.termsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                이용약관
              </Link>
              <Link
                href={appInfo.privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                개인정보처리방침
              </Link>
              <Link
                href={appInfo.policyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                이용정책
              </Link>
            </div>
          </div>

          {/* 모바일: 이메일이 있는 2번째 컬럼에 더 넓은 비율(2fr:3fr)을 줘서, 상자 하나만
              늘리는 대신 컬럼 자체를 비대칭으로 — 2×2 배치는 그대로 유지된다. */}
          <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-x-4 gap-y-6 text-caption-1 text-white md:grid-cols-2 md:gap-x-10">
            <p className="min-w-0 break-words md:min-w-[auto] md:break-normal">
              {companyInfo.name}
              <br />
              대표 {companyInfo.ceo}
            </p>
            <p className="min-w-0 break-words md:min-w-[auto] md:break-normal">
              사업자등록번호
              <br />
              {companyInfo.businessNumber}
            </p>
            <p className="min-w-0 break-words md:min-w-[auto] md:break-normal">
              통신판매업 신고번호
              <br />
              {companyInfo.salesRegNumber}
            </p>
            <p className="min-w-0 break-words md:min-w-[auto] md:break-normal">
              고객문의
              <br />
              {companyInfo.email}
            </p>
          </div>
        </div>

        <p className="mt-8 text-caption-2 text-white/70">{companyInfo.copyright}</p>
      </Content>
    </footer>
  );
}
