import React from 'react';

import { Mrec } from '@/components/ads';
import { Post } from '@/components/modules';
import { PostType, GridOrder, Omit } from '@/types';
import { PostProps } from '../shared/Post';

const GRID_POST_LENGTH = 5;

type PostComponentAttrMap = {
  [k: string]: Omit<PostProps, keyof PostType>;
};

const AD_COMPONENT = Mrec;
const POST_COMPONENT_ATTRS: PostComponentAttrMap = {
  LG: {
    layoutVariant: 'overlay',
    fontStyles: { fontSize: 24, lineHeight: 30 },
    imageWidth: 735,
    imageHeight: 430
  },
  MD: { layoutVariant: 'medium' }
};

const ORDERS = [['LG', 'MD', 'MD', 'MD', 'AD'], ['MD', 'MD', 'AD', 'MD', 'LG']];

export function mapPostsToGrid(order: GridOrder, posts: PostType[]) {
  const orderSpec = ORDERS[order - 1];
  const postQueue = posts.slice(0).reverse();
  if (postQueue.length != GRID_POST_LENGTH) {
    console.warn(
      `mapPostsToGrid: grid requires exactly ${GRID_POST_LENGTH} posts, found ${postQueue.length}`
    );
  }

  return orderSpec
    .map((type: string, idx: number) => {
      if (type === 'AD') {
        return <AD_COMPONENT key={idx} />;
      }

      const post = postQueue.pop();
      if (!post) {
        console.warn('mapPostsToGrid: ran out of posts');

        return false;
      }

      const attrs = POST_COMPONENT_ATTRS[type];

      return <Post key={post.id} {...attrs} {...post} />;
    })
    .filter(Boolean) as JSX.Element[]; // TS not smart enough to know that boolean removes false values
}
