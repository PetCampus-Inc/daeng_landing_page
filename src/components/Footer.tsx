import Link from 'next/link';

import { AppDownload } from '@/components/AppDownload';
import { fetchGitHubContent } from '@/lib/github';
import { cn } from '@/lib/tw';
import { QRDownloadIcon } from '@/assets/icons';
import { AppInfo, CompanyInfo } from '@/types';

interface FooterProps {
  className?: string;
}

export async function Footer({ className }: FooterProps) {
  const companyInfo = await fetchGitHubContent<CompanyInfo>('COMPANY');
  const appInfo = await fetchGitHubContent<AppInfo>('APP_INFO');

  return (
    <footer
      className={cn(
        'flex justify-center mt-28 pt-14 pb-24 bg-surface border-t border-border',
        className,
      )}
    >
      <div className="grid grid-cols-2 gap-6 gap-y-12 w-full max-w-content mx-8 max-md:grid-cols-1 max-sm:mx-4">
        {/* 회사 정보 */}
        <section>
          <p className="text-16 font-semibold mb-1">{companyInfo.name}</p>
          <p className="text-16 mb-4">{companyInfo.copyright}</p>

          <div className="text-14 text-foreground/70 flex flex-col gap-1">
            <p>
              <strong className="mr-1.5">대표</strong>
              {companyInfo.ceo} | <strong className="mr-1.5">사업자번호</strong>
              {companyInfo.businessNumber}
            </p>
            <p>
              <strong className="mr-1.5">통신판매업 신고번호</strong>
              {companyInfo.salesRegNumber}
            </p>
            <p>
              <strong className="mr-1.5">고객문의</strong>
              {companyInfo.email}
            </p>
          </div>
        </section>

        {/* 앱 다운로드 */}
        <section>
          <p className="text-16 font-semibold mb-2">다운로드</p>
          <AppDownload className="max-w-96 max-sm:max-w-full" />
        </section>

        {/* 약관 */}
        <section className="flex gap-12 text-16 font-semibold items-end whitespace-nowrap max-sm:justify-center">
          <Link
            href={appInfo.termsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="이용약관 페이지로 이동"
          >
            이용약관
          </Link>
          <Link
            href={appInfo.privacyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="개인정보처리방침 페이지로 이동"
          >
            개인정보처리방침
          </Link>
          <Link
            href={appInfo.policyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="이용정책 페이지로 이동"
          >
            이용정책
          </Link>
        </section>

        <section className="flex justify-end max-md:hidden">
          <QRDownloadIcon />
        </section>
      </div>
    </footer>
  );
}
