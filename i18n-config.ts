export const allLocales = ['en', 'de'] as const;

export type ILocales = (typeof allLocales)[number];

export const i18n = {
  defaultLocale: 'en',
  defaultDomain: 'storyblok-nextjs-starter.vercel.app',
  locales: allLocales,
  domains: [
    {
      domain: 'storyblok-nextjs-starter.vercel.app',
      defaultLocale: 'en',
      locales: ['en', 'de'],
    },
  ],
};
