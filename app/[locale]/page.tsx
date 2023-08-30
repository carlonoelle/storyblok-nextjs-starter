import { StoryblokComponent, getStoryblokApi } from '@storyblok/react/rsc';
import { StoryblokResult } from '@/types/storyblokHelpers';
import { ILocales } from '@/i18n-config';
import { getLanguage } from '@/utils/storyblokHelper';
import { PageStoryblok } from '@/types/storyblok';

export const generateMetadata = async ({
  params,
}: {
  params: { locale: ILocales };
}) => {
  const { data } = await fetchData({ params });

  return {
    title: data.story.content.title,
    description: data.story.content.description,
  };
};

export default async function Home({
  params,
}: {
  params: { locale: ILocales };
}) {
  const { data } = await fetchData({ params });

  return <StoryblokComponent blok={data.story.content} />;
}

const fetchData = async ({ params }: { params: { locale: ILocales } }) => {
  const { data }: StoryblokResult<PageStoryblok> = await getStoryblokApi().get(
    'cdn/stories/home',
    {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      language: getLanguage(params.locale),
    }
  );

  return { data };
};
