import React, { PureComponent } from 'react';

import { Grid, GridSlot } from '../../primitives';

import { Mrec } from '@/components/ads';
import { Omit, PostType } from '@/types';

import Post, { PostProps } from './Post';

export const DEFAULT_AD_COMPONENT = Mrec;
export const DEFAULT_POST_COMPONENT_ATTRS: PostComponentAttrMap = {
  OV: {
    layoutVariant: 'overlay',
    fontStyles: { fontSize: 24, lineHeight: 30 },
    imageWidth: 735,
    imageHeight: 430,
    multiplier: 2
  },
  LG: {
    layoutVariant: 'large',
    multiplier: 2
  },
  MD: { layoutVariant: 'medium' }
};

export type PostComponentAttrMap = {
  [k: string]: Omit<PostProps, keyof PostType> & { multiplier?: number };
};

export type OrderSpec = string[];

type Props = {
  orderSpec: OrderSpec;
  posts: PostType[];

  postComponentAttrMap?: PostComponentAttrMap;
  AdComponent?: React.ComponentType;
  style?: any;
  itemsPerRow?: number;
};

function validatePostCount(orderSpec: OrderSpec, posts: PostType[]) {
  const orderSpecPostCount = orderSpec.filter(type => type != 'AD').length;
  if (posts.length != orderSpecPostCount) {
    console.warn(
      `mapPostsToGrid: grid requires exactly ${orderSpecPostCount} posts, found ${posts.length}`
    );
  }
}

export default class PostGrid extends PureComponent<Props> {
  mapPostsToGrid() {
    const {
      orderSpec,
      postComponentAttrMap = DEFAULT_POST_COMPONENT_ATTRS,
      posts,
      AdComponent = DEFAULT_AD_COMPONENT
    } = this.props;
    const postQueue = posts.slice(0).reverse();

    validatePostCount(orderSpec, posts);

    return orderSpec
      .map((type: string, idx: number) => {
        if (type === 'AD') {
          if (!AdComponent) {
            console.error('AD found in spec, but adComponent not given.');
            debugger;

            return;
          }

          return <AdComponent key={idx} />;
        }

        const post = postQueue.pop();
        if (!post) {
          console.warn('mapPostsToGrid: ran out of posts');

          return false;
        }

        const attrs = postComponentAttrMap[type];
        const { multiplier = 1, ...postAttrs } = attrs;

        return (
          <GridSlot key={post.id} multiplier={multiplier}>
            <Post {...postAttrs} {...post} />
          </GridSlot>
        );
      })
      .filter(Boolean) as JSX.Element[]; // TS not smart enough to know that boolean removes false values
  }

  render() {
    const { style, itemsPerRow } = this.props;
    const postsArray = this.mapPostsToGrid();

    return (
      <Grid spacer={30} style={style} itemsPerRow={itemsPerRow}>
        {postsArray}
      </Grid>
    );
  }
}

export function createPostGrid(attrs: Omit<Props, 'posts'>) {
  return class extends PureComponent<{ posts: PostType[] }> {
    public render() {
      const { posts } = this.props;

      return <PostGrid posts={posts} {...attrs} />;
    }
  };
}
