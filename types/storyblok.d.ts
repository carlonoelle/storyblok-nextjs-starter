import {StoryblokStory} from 'storyblok-generate-ts'

export interface PageStoryblok {
  title?: string;
  description?: string;
  body?: TeaserStoryblok[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface TeaserStoryblok {
  headline?: string;
  _uid: string;
  component: "teaser";
  [k: string]: any;
}
