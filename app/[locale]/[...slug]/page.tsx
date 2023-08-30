import {
  ISbStoriesParams,
  StoryblokComponent,
  getStoryblokApi,
} from '@storyblok/react/rsc';
import { notFound } from 'next/navigation';
import { getLanguage } from '@/utils/storyblokHelper';
import { StoryblokResult } from '@/types/storyblokHelpers';
import { ILocales } from '@/i18n-config';
import { PageStoryblok } from '@/types/storyblok';

export const generateMetadata = async ({
  params,
}: {
  params: { locale: ILocales; slug: string[] };
}) => {
  const { data } = await fetchData({ params });

  return {
    title: data.story.content.title,
    description: data.story.content.description,
  };
};

export async function generateStaticParams({
  params,
}: {
  params: { locale: ILocales; slug: string[] };
}) {
  try {
    let sbParams: ISbStoriesParams = {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      language: getLanguage(params.locale),
      starts_with: 'pages/', // only if you want to filter for a folder edit/remove if you structure stories differently
    };

    const res = await getStoryblokApi().get(`cdn/links`, sbParams);

    const alllinks = Object.values(res.data.links)
      .filter((a: any) => !a.is_folder)
      .map((a: any) => ({ slug: a.slug.substring(6).split('/') })); // again, if you do not use a pages folder, remove the .substring(6) part

    return alllinks;
  } catch (err: any) {
    if (err.status === 404) {
      return notFound();
    }
    console.error(err.message);
    throw err;
  }
}

export default async function Page({
  params,
}: {
  params: { locale: ILocales; slug: string[] };
}) {
  const { data } = await fetchData({ params });

  return <StoryblokComponent blok={data.story} />;
}

const fetchData = async ({
  params,
}: {
  params: { locale: ILocales; slug: string[] };
}) => {
  const { data }: StoryblokResult<PageStoryblok> = await getStoryblokApi().get(
    params.slug.join('/'),
    {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      language: getLanguage(params.locale),
    }
  );

  return { data };
};
