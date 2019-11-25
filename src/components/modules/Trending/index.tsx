// @flow

import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { ModuleBox } from '@/components/modules';
import { Container } from '@/components/primitives';

import PostList from './PostList';
import TrendingPostGrid from './TrendingPostGrid';

import TitleMobile from './TitleMobile';
import TitleSquare from './TitleSquare';

import { Responsive } from '@/components/utils';

import { BREAKPOINTS } from '@/constants/index';
import { PostType } from '@/types';
import BetweenModuleAd from '../shared/BetweenModuleAd';

interface Props {
  posts: PostType[];
  sectionColor: string;
  sectionLink: string;
  sectionTitle: string;
  mediumMobilePosts?: boolean;
  showIcon: boolean;
}

class Trending extends PureComponent<Props> {
  public renderMobile = () => {
    const { posts, mediumMobilePosts = false } = this.props;
    const { sectionColor, sectionLink, sectionTitle, showIcon = true } = this.props;

    return (
      <Container
        type="content"
        style={{
          paddingHorizontal: 15,
          alignItems: 'center'
        }}
      >
        <View
          style={{
            maxWidth: 300,
            width: '100%'
          }}
        >
          <TitleMobile
            title={sectionTitle}
            patternColor={sectionColor}
            sectionLink={sectionLink}
            showIcon={showIcon}
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <ModuleBox>
            <PostList posts={posts} isDesktop={false} mediumMobilePosts={mediumMobilePosts} />
          </ModuleBox>
        </View>
      </Container>
    );
  };
  public renderDesktop = () => {
    const { sectionColor, sectionLink, sectionTitle, showIcon = true } = this.props;
    const { posts } = this.props;
    return (
      <Container type="content">
        <View
          style={{
            flexDirection: 'row',
            margin: -15
          }}
        >
          <View style={{ width: '25%', padding: 15 }}>
            <TitleSquare
              title={sectionTitle}
              patternColor={sectionColor}
              sectionLink={sectionLink}
              showIcon={showIcon}
            />
          </View>

          <View style={{ width: '75%', padding: 15 }}>
            <TrendingPostGrid posts={posts} />
          </View>
        </View>
      </Container>
    );
  };
  public render() {
    return (
      <>
        <BetweenModuleAd />
        <Responsive>
          {({ minWidth }) => {
            const isDesktop = minWidth(BREAKPOINTS.LG);
            return isDesktop ? this.renderDesktop() : this.renderMobile();
          }}
        </Responsive>
      </>
    );
  }
}

export default Trending;
