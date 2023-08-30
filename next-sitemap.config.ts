/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://storyblok-nextjs-starter.vercel.app/',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
