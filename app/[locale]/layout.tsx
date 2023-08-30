import { Inter } from 'next/font/google';
import { storyblokInit, apiPlugin } from '@storyblok/react/rsc';
import StoryblokBridgeLoader from '@storyblok/react/bridge-loader';
import { bloks } from '@/components/bloks';
import { ILocales, allLocales } from '@/i18n-config';

storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components: bloks,
  apiOptions: {
    fetch: async (url, options: any) => {
      return fetch(url, {
        ...options,
        next: {
          revalidate: process.env.NODE_ENV === 'development' ? 0 : 60000,
          tags: ['storyblok'],
        },
      });
    },
  },
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export function generateStaticParams(): { locale: ILocales }[] {
  return allLocales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <body
        className={`${inter.variable} font-inter antialiased bg-gray-900 text-gray-200 tracking-tight`}
        suppressHydrationWarning
      >
        <div className="flex flex-col min-h-screen overflow-hidden">
          {children}
        </div>
      </body>
      <StoryblokBridgeLoader options={{}} />
    </html>
  );
}
