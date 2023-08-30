import { TeaserStoryblok } from '@/types/storyblok';
import { storyblokEditable } from '@storyblok/react/rsc';

export interface ITeaserBlokProps {
  blok: TeaserStoryblok;
}

export const TeaserBlok = ({ blok }: ITeaserBlokProps) => {
  return (
    <div
      className="max-w-3xl mx-auto text-center pb-12 md:pb-20"
      {...storyblokEditable(blok)}
    >
      {blok.headline && (
        <h2 className="h1 mb-4" data-aos="fade-up">
          {blok.headline}
        </h2>
      )}
    </div>
  );
};
