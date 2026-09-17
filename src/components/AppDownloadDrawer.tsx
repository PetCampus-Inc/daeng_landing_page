import { CloseIcon, QRDownloadIcon } from '@/assets/icons';
import { AppDownload } from '@/components/AppDownload';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/Drawer';

export function AppDownloadDrawer({ children }: React.PropsWithChildren) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerClose
          className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          aria-label="닫기"
        >
          <CloseIcon className="size-6" />
        </DrawerClose>

        <DrawerHeader>
          <DrawerTitle className="text-center">똑독 앱 다운로드</DrawerTitle>
          <DrawerDescription className="text-center">
            <span className="whitespace-nowrap">휴대전화의 카메라로 QR 코드를 촬영해</span>
            <br />
            <span className="whitespace-nowrap">앱을 다운로드 할 수 있습니다.</span>
          </DrawerDescription>
        </DrawerHeader>

        <div className="mt-8 mb-12 flex flex-col items-center justify-center gap-2 px-6">
          <QRDownloadIcon className="size-[18rem] md:size-[22rem]" />

          <AppDownload className="mt-8 w-full max-w-96" />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
