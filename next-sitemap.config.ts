/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://myurl.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  sitemapSize: 5000,
  alternateRefs: [
    {
      href: 'https://mysecondlangurl.com',
      hreflang: 'en',
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
