# Storyblok Nextjs Starter with App Router

This is a opinionated starter including internationalised routing (i18n), full server component rendering (no live editing), Tailwind and full typesafety for your stories and bloks.

Also preinstalled is the nice [Storyblok Rich Text Renderer](https://www.npmjs.com/package/storyblok-rich-text-react-renderer), which will surely come in handy, as well as next-sitemap.

I created this starter since i found myself constantly copying code when i started a new project. I am not partnered in any way with Storyblok, it's just my personal starter which i wanted to share because why not.

## Prequisites

- Clone the storyblok space by clicking this link: [https://app.storyblok.com/#/build/249345](https://app.storyblok.com/#/build/249345)
- Add your preview token to the `.env.local` file
- You have to setup i18n options. Go to the file `/i18n-config.ts` and set it to your liking
  - You can have multiple domains, for different locales, or just use one domain for them all
  - Your default locale will be served from `/`, the other ones from subpaths, eg `/de`. This happens through rewrites in the middleware
- To enable autogeneration of TypeScript interfaces, you have to set your Storyblok space id in the `[SPACE_ID]` placeholders in `/package.json`
  - you also have to have the [Storyblok CLI](https://www.storyblok.com/docs/Guides/command-line-interface) globally installed and logged into your account
- If you want to configure your `sitemap` as well as `robots.txt`, do that in `/next-sitemap.config.ts`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To generate TS Interfaces:

```bash
npm generate-sb-types
# or
yarn generate-sb-types
# or
pnpm generate-sb-types
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
