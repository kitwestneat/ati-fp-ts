import { Post } from '@/components/modules/';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { PostType } from '../../../types';

interface Props {
  posts: PostType[];
  isDesktop: boolean;
  mediumMobilePosts: boolean;
}

class PostList extends PureComponent<Props> {
  public render() {
    const { posts, isDesktop, mediumMobilePosts } = this.props;

    const layoutVariant = mediumMobilePosts ? 'medium' : 'reduced';

    return posts.map((post: PostType, index: number) => (
      <View key={post.id} style={index === 0 ? {} : { marginTop: 20 }}>
        <Post layoutVariant={layoutVariant} isDesktop={isDesktop} {...post} />
      </View>
    ));
  }
}

export default PostList;
