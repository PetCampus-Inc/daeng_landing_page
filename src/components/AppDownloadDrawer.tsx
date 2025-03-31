import { QRDownloadIcon } from '@/assets/icons';
import { AppDownload } from '@/components/AppDownload';
import {
  Drawer,
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
        <DrawerHeader>
          <DrawerTitle className="text-center">똑독 앱 다운로드</DrawerTitle>
          <DrawerDescription className="text-center">
            휴대전화의 카메라로 QR코드를 촬영해 앱을 다운로드할 수 있습니다.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-2 items-center justify-center mt-8 mb-14">
          <QRDownloadIcon className="size-[22rem]" />

          <AppDownload className="w-96 mt-8" />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
