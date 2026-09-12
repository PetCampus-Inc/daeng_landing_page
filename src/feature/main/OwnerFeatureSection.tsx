import Image from 'next/image';

import { Content } from '@/components/Content';

export function OwnerFeatureSection() {
  return (
    <section className="w-full bg-[#36363c] py-24 text-white max-md:py-16">
      <Content className="flex items-center justify-center gap-20 max-md:flex-col max-md:gap-10">
        <div className="max-w-[42rem] max-md:text-center">
          <p className="text-16 font-semibold text-[#ff9752]">유치원 원장님도 똑독과 함께</p>
          <h2 className="mt-5 text-42 font-semibold leading-snug max-md:text-28">
            반복되는 운영 업무를
            <br />
            한곳에서 간편하게
          </h2>
          <p className="mt-5 text-18 text-white/70 max-md:text-16">
            등하원부터 알림장까지, 보호자와의 소통을 더 편리하게 만듭니다.
          </p>
        </div>
        <div className="w-[min(34vw,36rem)] shrink-0 max-md:w-[min(86vw,38rem)]">
          <Image
            src="/images/home/owner-dashboard.webp"
            alt="등하원 관리와 알림장 작성을 한곳에서 처리하는 똑독 원장님용 화면"
            width={900}
            height={1948}
            sizes="(max-width: 767px) 86vw, 36rem"
            className="h-auto w-full rounded-[2.8rem] max-md:rounded-2xl"
          />
        </div>
      </Content>
    </section>
  );
}
