// @flow

import React, { PureComponent } from 'react';

import { Grid } from '../../primitives';

import { mapPostsToGrid } from './posts-helpers';
import { GridOrder, PostType } from '@/types';

type Props = {
  order: GridOrder;
  posts: PostType[];
  itemsPerRow?: number;
};

class PostGrid extends PureComponent<Props> {
  static defaultProps = {
    order: 1
  };

  render() {
    const { order, posts, itemsPerRow } = this.props;
    const postsArray = mapPostsToGrid(order, posts);

    return <Grid spacer={30} itemsPerRow={itemsPerRow}>{postsArray}</Grid>;
  }
}

export default PostGrid;
