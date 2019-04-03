import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Post } from '@/components/modules/';
import { PostType } from '../../../types';

type Props = {
  posts: any;
  isDesktop: boolean;
};

class PostList extends PureComponent<Props> {
  render() {
    const { posts, isDesktop } = this.props;

    return posts.map((post: PostType, index: number) => (
      <View key={post.id} style={index === 0 ? {} : { marginTop: 20 }}>
        <Post numberOfLines={3} layoutVariant='reduced' isDesktop={isDesktop} {...post} />
      </View>
    ));
  }
}

export default PostList;
