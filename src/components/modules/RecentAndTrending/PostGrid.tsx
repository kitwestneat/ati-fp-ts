// @flow

import React, { PureComponent } from 'react';

import { Grid } from '../../primitives';

import { mapPostsToGrid } from './posts-helpers';
import { GridOrder, PostType } from '@/types';

type Props = {
  posts: PostType[];
  style?: any;
  order: GridOrder;
  itemsPerRow?: number;
};

class PostGrid extends PureComponent<Props> {
  static defaultProps = {
    order: 1, 
    itemsPerRow: 2,
  };

  render() {
    const { order, posts, style, itemsPerRow } = this.props;
    const postsArray = mapPostsToGrid(order, posts);

    return <Grid spacer={30} style={style} itemsPerRow={itemsPerRow}>{postsArray}</Grid>;
  }
}

export default PostGrid;
