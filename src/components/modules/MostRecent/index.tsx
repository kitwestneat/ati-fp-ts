// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';

import { ModuleBox, OverlapFrame, Post } from '@/components/modules';
import { Container, Image } from '@/components/primitives';
import { Responsive } from '@/components/utils';

import Banner from '@/assets/images/ati-banner.png';

import PostList from './PostList';

import { BREAKPOINTS, CONTAINER_PADDING } from '@/constants/index';
import { PostType } from '@/types';

interface Props {
  posts: PostType[];
}

class MostRecent extends PureComponent<Props> {
  public renderMobile = () => {
    const {
      posts: [mainPost, ...secondaryPosts]
    } = this.props;

    return (
      <OverlapFrame
        mainPost={mainPost}
        containerPadding={CONTAINER_PADDING.MOBILE}
        bottomOverlap={15}
        overlap={15}
      >
        <ModuleBox patternColor={mainPost.categoryColor}>
          <>
            <View style={{ width: '70%', marginBottom: 20, marginTop: -5 }}>
              <Image
                alt="All That's Interesting, Something Interesting To Read Everyday"
                style={
                  { width: 586, height: 112, maxHeight: 30, backgroundPosition: 'left' } as any
                }
                resizeMode="contain"
                source={{ uri: Banner }}
              />
            </View>
            <PostList posts={secondaryPosts} isDesktop={false} />
          </>
        </ModuleBox>
      </OverlapFrame>
    );
  };

  public renderDesktop = () => {
    const {
      posts: [mainPost, ...secondaryPosts]
    } = this.props;
    return (
      <Container type="content">
        <ModuleBox patternColor={mainPost.categoryColor}>
          <View style={styles.wrap}>
            <View style={styles.left}>
              <Post
                layoutVariant="overlay"
                isDesktop={true}
                imageWidth={700}
                imageHeight={545}
                {...mainPost}
              />
            </View>
            <View style={styles.right}>
              <View style={{ height: 50, marginBottom: 30, marginTop: -10 }}>
                <Image
                  alt="All That's Interesting, Something Interesting To Read Everyday"
                  style={{ width: 586, height: 112, backgroundPosition: 'left' } as any}
                  resizeMode="contain"
                  source={{ uri: Banner }}
                />
              </View>
              <PostList posts={secondaryPosts} isDesktop={true} />
            </View>
          </View>
        </ModuleBox>
      </Container>
    );
  };

  public render() {
    return (
      <Responsive>
        {({ minWidth }) => {
          const isDesktop = minWidth(BREAKPOINTS.LG);
          return isDesktop ? this.renderDesktop() : this.renderMobile();
        }}
      </Responsive>
    );
  }
}

export default MostRecent;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row'
  },
  left: {
    width: '66%',
    justifyContent: 'flex-start'
  },
  right: {
    width: '33%',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingVertical: 30
  }
});
