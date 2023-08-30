import { PageStoryblok } from '@/types/storyblok';
import { StoryblokComponent, storyblokEditable } from '@storyblok/react/rsc';

export interface IPageBlokProps {
  blok: PageStoryblok;
}

export const PageBlok = ({ blok }: IPageBlokProps) => {
  return (
    <main
      key={blok._uid}
      {...storyblokEditable(blok)}
      className="grow min-h-screen pt-[100px]"
    >
      {blok.body &&
        blok.body.map((blok: any) => (
          <section key={blok._uid}>
            <StoryblokComponent blok={blok} />
          </section>
        ))}
    </main>
  );
};
