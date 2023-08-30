import { ISbResult } from '@storyblok/react';
import { StoryblokStory } from 'storyblok-generate-ts';

export interface StoryblokResult<T> extends ISbResult {
  data: {
    story: StoryblokStory<T>;
  };
}
