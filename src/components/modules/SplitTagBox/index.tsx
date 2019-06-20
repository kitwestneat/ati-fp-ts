import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { ModuleBox } from '@/components/modules';
import { Container } from '@/components/primitives';
import { Responsive } from '@/components/utils';
import { BREAKPOINTS } from '@/constants';
import { SplitTagBoxData, PostType, OFFSET_DIRECTION } from '@/types';
import TitleRow from '../TagPostsSingleColumn/TitleRow';
import PostList from '../TagPostsSingleColumn/PostList';
import SplitTagGrid from './SplitTagGrid';

interface Props extends SplitTagBoxData {
  sectionTitle: string;
  sectionLink: string;
  sectionColor: string;
  split?: string;
  posts: PostType[];
}

type State = {
  height: number;
};

export default class SplitTagBox extends PureComponent<Props, State> {
  static defaultProps = {
    split: 'left'
  };

  state = {
    height: 0
  };

  // The two ModuleBoxes share a parent container.
  // Use the height of the parent to determine the height of the ModuleBoxes.
  getHeight = (e: any) => {
    const h = e.nativeEvent.layout.height;
    this.setState({
      height: h
    });
  };

  renderModule = (isDesktop: any) => {
    const { sectionTitle, sectionLink, sectionColor, split, posts } = this.props;
    const { height } = this.state;
    if (posts.length < 5) {
      console.warn(`SplitTagBox: module requires a minimum of 5 posts, found ${posts.length}.`);
    }
    const twoPosts = posts.slice(0, 2);
    const threePosts = posts.slice(2, 5); // Make sure we stop at 5 posts on Desktop
    const fivePosts = posts.slice(0, 5); // Make sure we stop at 5 posts on Mobile
    const flexDirection = split === 'left' ? 'row' : 'row-reverse';
    // ModuleBox height. To compensate for the box with a patterncolor, subtract 15 from that box.
    const twoPostsBoxHeight = split === 'left' ? `${height - 15}px` : 'auto';
    const threePostsBoxHeight = split === 'left' ? 'auto' : `${height - 15}px`;

    return (
      <Container type="content">
        {posts.length >= 5 && (
          <View>
            <TitleRow
              patternColor={sectionColor}
              link={sectionLink}
              title={sectionTitle}
              isDesktop={isDesktop}
            />
            {isDesktop ? (
              <View style={[styles.parentContainer, { flexDirection: flexDirection }]}>
                <View style={styles.twoPostsBox} onLayout={this.getHeight}>
                  <ModuleBox
                    style={{ height: twoPostsBoxHeight }}
                    patternColor={split === 'right' ? sectionColor : ''}
                    offsetDirection={OFFSET_DIRECTION.RIGHT}
                  >
                    <PostList posts={twoPosts} />
                  </ModuleBox>
                </View>
                <View style={styles.threePostsBox}>
                  <ModuleBox
                    style={{ height: threePostsBoxHeight }}
                    patternColor={split === 'left' ? sectionColor : ''}
                    offsetDirection={OFFSET_DIRECTION.RIGHT}
                  >
                    <SplitTagGrid posts={threePosts} />
                  </ModuleBox>
                </View>
              </View>
            ) : (
              <View style={[styles.parentContainer, { paddingHorizontal: 15 }]}>
                <ModuleBox patternColor={sectionColor} offsetDirection={OFFSET_DIRECTION.RIGHT}>
                  <PostList posts={fivePosts} />
                </ModuleBox>
              </View>
            )}
          </View>
        )}
      </Container>
    );
  };

  render() {
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
