import { ModuleBox } from '@/components/modules';
import { Container } from '@/components/primitives';
import { Responsive } from '@/components/utils';
import { BREAKPOINTS } from '@/constants';
import { OFFSET_DIRECTION, PostType, SplitTagBoxData } from '@/types';
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import BetweenModuleAd from '../shared/BetweenModuleAd';
import TitleRow from '../shared/TitleRow';
import PostList from '../TagPostsSingleColumn/PostList';
import FeaturedSplitTagGrid from './FeaturedSplitTagGrid';
import SplitTagGrid from './SplitTagGrid';

interface Props extends SplitTagBoxData {
  sectionTitle: string;
  sectionLink: string;
  sectionColor: string;
  split?: string;
  hasFeaturedPost?: boolean;
  posts: PostType[];
}

interface State {
  height: number;
}

export default class SplitTagBox extends PureComponent<Props, State> {
  public static defaultProps = {
    split: 'left'
  };

  public renderDesktop = (titleRow: JSX.Element) => {
    const { hasFeaturedPost, sectionColor, split, posts } = this.props;

    const firstPosts = posts.slice(0, 2);
    const lastPosts = posts.slice(2, 5); // Make sure we stop at 5 posts on Desktop

    const flexDirection = split === 'left' ? 'row' : 'row-reverse';

    return (
      <>
        {!hasFeaturedPost && titleRow}
        <View style={[styles.parentContainer, { flexDirection }]}>
          <View style={styles.twoPostsBox}>
            {hasFeaturedPost && (
              <View style={{ marginBottom: 15, marginHorizontal: 'auto' }}>{titleRow}</View>
            )}
            <ModuleBox
              patternColor={split === 'right' ? sectionColor : ''}
              offsetDirection={OFFSET_DIRECTION.RIGHT}
            >
              <PostList posts={hasFeaturedPost ? lastPosts : firstPosts} />
            </ModuleBox>
          </View>
          <View style={styles.threePostsBox}>
            <ModuleBox
              patternColor={split === 'left' ? sectionColor : ''}
              offsetDirection={OFFSET_DIRECTION.RIGHT}
            >
              {hasFeaturedPost ? (
                <FeaturedSplitTagGrid posts={firstPosts} />
              ) : (
                <SplitTagGrid posts={lastPosts} />
              )}
            </ModuleBox>
          </View>
        </View>
      </>
    );
  };

  public renderModule = (isDesktop: any) => {
    const { hasFeaturedPost, sectionTitle, sectionLink, sectionColor, posts } = this.props;

    const requiredPostCount = hasFeaturedPost ? 4 : 5;
    if (posts.length !== requiredPostCount) {
      console.warn(
        `SplitTagBox: module requires ${requiredPostCount} posts, found ${posts.length}.`
      );
    }

    const titleRow = (
      <TitleRow
        withAd={!hasFeaturedPost}
        patternColor={sectionColor}
        link={sectionLink}
        title={sectionTitle}
        isDesktop={isDesktop}
      />
    );

    return (
      <>
        {hasFeaturedPost && <BetweenModuleAd />}
        <Container type="content">
          <View>
            {isDesktop ? (
              this.renderDesktop(titleRow)
            ) : (
              <>
                {titleRow}
                <View style={[styles.parentContainer, { paddingHorizontal: 15 }]}>
                  <ModuleBox patternColor={sectionColor} offsetDirection={OFFSET_DIRECTION.RIGHT}>
                    <PostList posts={posts} />
                  </ModuleBox>
                </View>
              </>
            )}
          </View>
        </Container>
      </>
    );
  };

  public render() {
    return (
      <Responsive>
        {({ minWidth }) => {
          const isDesktop = minWidth(BREAKPOINTS.LG);
          return this.renderModule(isDesktop);
        }}
      </Responsive>
    );
  }
}

const styles = StyleSheet.create({
  parentContainer: {
    marginTop: 30,
    justifyContent: 'space-between'
  },
  twoPostsBox: {
    width: '32%'
  },
  threePostsBox: {
    width: '62%'
  }
});
