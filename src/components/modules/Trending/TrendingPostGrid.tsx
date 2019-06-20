import React, { PureComponent } from 'react';

import { PostType } from '../../../types';
import PostGrid, { PostComponentAttrMap } from '../shared/PostGrid';

type Props = {
  posts: PostType[];
};

const MD_POST_COUNT = 3;
const POST_COMPONENT_ATTRS: PostComponentAttrMap = {
  MD: {
    layoutVariant: 'medium',
    imageWidth: 286,
    imageHeight: 286
  },
  SM: {
    layoutVariant: 'reduced'
  }
};

class TrendingPostGrid extends PureComponent<Props> {
  render() {
    const { posts } = this.props;
    const orderSpec = posts.map((_post, index) => (index < MD_POST_COUNT ? 'MD' : 'SM'));

    return (
      <PostGrid orderSpec={orderSpec} postComponentAttrMap={POST_COMPONENT_ATTRS} posts={posts} />
    );
  }
}

export default TrendingPostGrid;
