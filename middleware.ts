import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { i18n } from './i18n-config';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  return matchLocale(languages, locales, i18n.defaultLocale);
}

// Redirect works on auto mode, for lang switch manually use cookies to set desired locale and skip locale detection as long as cookie is there

export function middleware(request: NextRequest) {
  const { pathname, searchParams, hostname } = request.nextUrl;

  if (
    ['.json', '.ico', '.xml', '.jpg', '.svg', '.png', '.jpg'].some((e) =>
      pathname.endsWith(e)
    )
  ) {
    // Probably some public folder stuff, let it pass
    return NextResponse.next();
  }

  const locale = getLocale(request);
  const usedDomain = i18n.domains.find((domain) => domain.domain === hostname);

  if (process.env.DEBUG) {
    console.log(
      `Request locale: ${locale}, used domain: ${
        usedDomain?.domain || 'unknown'
      }, path: ${pathname}`
    );
  }

  if (usedDomain && usedDomain.locales.includes(locale!)) {
    if (
      pathname.startsWith(`/${usedDomain.defaultLocale}/`) ||
      pathname === `/${usedDomain.defaultLocale}`
    ) {
      const newUrl = new URL(
        pathname.replace(
          `/${usedDomain.defaultLocale}`,
          pathname === `/${usedDomain.defaultLocale}` ? '/' : ''
        ),
        request.url
      );
      newUrl.search = searchParams.toString();
      return NextResponse.redirect(newUrl, { status: 301 });
    }

    const pathnameIsMissingLocale = usedDomain.locales.every(
      (locale) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
      if (locale !== usedDomain.defaultLocale) {
        const newUrl = new URL(`/${locale}${pathname}`, request.url);
        newUrl.search = searchParams.toString();
        return NextResponse.redirect(newUrl, { status: 302 });
      } else {
        const newUrl = new URL(
          `/${usedDomain.defaultLocale}${pathname}`,
          request.url
        );
        newUrl.search = searchParams.toString();
        return NextResponse.rewrite(newUrl);
      }
    }
  } else {
    if (usedDomain) {
      const possibleDomains = i18n.domains
        .filter((e) => e.locales.includes(locale!))
        .sort((a, b) => (b.defaultLocale === locale ? 1 : -1));

      if (possibleDomains.length > 0) {
        const useFirst = possibleDomains[0];

        if (locale === useFirst.defaultLocale) {
          console.log(pathname);
          const newUrl = new URL(`${pathname}`, `https://${useFirst.domain}`);
          newUrl.search = searchParams.toString();
          return NextResponse.redirect(newUrl, { status: 302 });
        } else {
          const newUrl = new URL(
            `/${locale}${pathname}`,
            `https://${useFirst.domain}`
          );
          newUrl.search = searchParams.toString();
          return NextResponse.redirect(newUrl, { status: 302 });
        }
      } else {
        console.log('no domain found');
        // No domain found for this locale, return general default locale
        const newUrl = new URL(`/${locale}${pathname}`, request.url);
        newUrl.search = searchParams.toString();
        return NextResponse.rewrite(newUrl);
      }
    } else {
      const pathnameIsMissingLocale = i18n.locales.every(
        (locale) =>
          !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
      );
      if (pathnameIsMissingLocale) {
        // No domain found for this locale, return site since domain is not known for general locale
        const newUrl = new URL(`/${locale}${pathname}`, request.url);
        newUrl.search = searchParams.toString();
        return NextResponse.rewrite(newUrl);
      }
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};
