import { QRCodeSVG } from 'qrcode.react';

import { DOWNLOAD_REDIRECT_URL } from '@/constants/storeLink';

export function QRDownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <QRCodeSVG
      {...props}
      value={DOWNLOAD_REDIRECT_URL}
      level="M"
      marginSize={4}
      bgColor="#ffffff"
      fgColor="#000000"
    />
  );
}
