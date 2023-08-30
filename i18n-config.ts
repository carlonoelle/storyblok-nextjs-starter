export const allLocales = ['en', 'de'] as const;

export type ILocales = (typeof allLocales)[number];

export const i18n = {
  defaultLocale: 'en',
  defaultDomain: 'myurl.com',
  locales: allLocales,
  domains: [
    {
      domain: 'myurl.com',
      defaultLocale: 'en',
      locales: ['en'],
    },
    {
      domain: 'mysecondlangurl.com',
      defaultLocale: 'en',
      locales: ['en', 'de'],
    },
  ],
};
