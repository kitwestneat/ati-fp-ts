import React from 'react';

import { Mrec } from '@/components/ads';
import { Post } from '@/components/modules';
import { PostType, GridOrder, Omit } from '@/types';
import { PostProps } from '../shared/Post';
import GridSlot from '../../primitives/Grid/GridSlot';

type PostComponentAttrMap = {
  [k: string]: Omit<PostProps, keyof PostType>;
};

const AD_COMPONENT = Mrec;
const POST_COMPONENT_ATTRS: PostComponentAttrMap = {
  OV: {
    layoutVariant: 'overlay',
    fontStyles: { fontSize: 24, lineHeight: 30 },
    imageWidth: 735,
    imageHeight: 430
  },
  LG: {
    layoutVariant: 'large',
  },
  MD: { layoutVariant: 'medium' }
};

const ORDERS = [
  ['OV', 'MD', 'MD', 'MD', 'AD'], 
  ['MD', 'MD', 'AD', 'MD', 'OV'], 
  ['MD', 'MD', 'MD', 'AD'],
  ['MD', 'MD', 'MD', 'AD', 'LG'], 
];

export function mapPostsToGrid(order: GridOrder, posts: PostType[]) {
  const orderSpec = ORDERS[order - 1];
  const postQueue = posts.slice(0).reverse();
  const orderSpecPostCount = orderSpec.filter(type => type != 'AD').length;
  if (postQueue.length != orderSpecPostCount) {
    console.warn(
      `mapPostsToGrid: grid requires exactly ${orderSpecPostCount} posts, found ${postQueue.length}`
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
      const multiplier = type === 'LG' || type === 'LG_2' ? 2 : 1;

      return (
        <GridSlot key={post.id} multiplier={multiplier}>
          <Post {...attrs} {...post} />
        </GridSlot>
      );
    })
    .filter(Boolean) as JSX.Element[]; // TS not smart enough to know that boolean removes false values
}
