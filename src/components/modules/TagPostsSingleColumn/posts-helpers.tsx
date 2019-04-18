import React from 'react';

import { Mrec } from '@/components/ads';
import { Post } from '@/components/modules';
import { PostType, GridOrder } from '@/types';

const GRID_POST_LENGTH = 5;

type PostComponentCreatorMap = { [sz: string]: (props: PostType) => JSX.Element };

const AD_COMPONENT = Mrec;
const POST_COMPONENTS: PostComponentCreatorMap = {
  LG: (props: PostType) => (
    <Post
      layoutVariant="overlay"
      fontStyles={{ fontSize: 24, lineHeight: 30 }}
      imageWidth={735}
      imageHeight={430}
      {...props}
    />
  ),
  MD: (props: PostType) => <Post layoutVariant="medium" {...props} />
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

      const Component = POST_COMPONENTS[type];

      return <Component key={post.id} {...post} />;
    })
    .filter(Boolean) as JSX.Element[]; // TS not smart enough to know that boolean removes false values
}
