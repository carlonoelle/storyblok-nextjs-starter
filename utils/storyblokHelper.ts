import { ILocales } from '@/i18n-config';

export const getLanguage = (locale: ILocales): string => {
  switch (locale) {
    case 'de':
      return 'de-de';
    case 'en':
    default:
      return 'default';
  }
};

export const getImageUrl = (url: string, extras?: string): string => {
  return `${url}/m/${extras ? extras : ''}`;
};
