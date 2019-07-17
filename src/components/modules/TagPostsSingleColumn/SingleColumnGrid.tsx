import { PostType } from '@/types';
import React, { PureComponent } from 'react';
import PostGrid from '../shared/PostGrid';

interface Props {
  posts: PostType[];
  reverse: boolean;
}

export default class SingleColumnGrid extends PureComponent<Props> {
  public render() {
    const { posts, reverse } = this.props;

    const orderSpec = !reverse ? ['OV', 'MD', 'MD', 'MD', 'AD'] : ['MD', 'MD', 'AD', 'MD', 'OV'];

    return <PostGrid name="SingleColumn" posts={posts} orderSpec={orderSpec} />;
  }
}
