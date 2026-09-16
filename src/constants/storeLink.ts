export const APP_STORE_URL = 'https://apps.apple.com/kr/app/%EB%98%91%EB%8F%85/id6754978978';
export const GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=net.knockdog.petcampus.v2&hl=ko';

export const DOWNLOAD_REDIRECT_URL = 'https://home.knockdog.net/download/';

export const STORE_LINKS = [
  {
    name: 'App Store',
    url: APP_STORE_URL,
    icon: 'AppStoreIcon',
  },
  {
    name: 'Google Play',
    url: GOOGLE_PLAY_URL,
    icon: 'PlayStoreIcon',
  },
] as const;
