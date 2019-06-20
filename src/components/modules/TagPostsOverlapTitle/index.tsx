import React, { PureComponent } from 'react';
import { ModuleBox, OverlapScaffold, Post } from '@/components/modules';
import { Container, Row } from '@/components/primitives';
import { Responsive } from '@/components/utils';
import { BREAKPOINTS, CONTAINER_PADDING } from '@/constants';
import { TagTileBoxModuleData, PostType, OFFSET_DIRECTION, GridOrder } from '@/types';
import TitleRow from './TitleRow';
import PostList from '../TagPostsSingleColumn/PostList';
import OverlapGrid from './OverlapGrid';

interface Props extends TagTileBoxModuleData {
  posts: PostType[];
  sectionLink: string;
  sectionColor: string;
  sectionTitle: string;
}

type State = {
  titleRowWidth: number;
};

export default class TagPostsOverlapTitle extends PureComponent<Props, State> {
  static defaultProps = {
    order: 4
  };

  state = {
    titleRowWidth: 0
  };

  scaffoldProps = (isDesktop: boolean) =>
    isDesktop
      ? {
          containerPadding: 0,
          overlap: -15
        }
      : {
          containerPadding: CONTAINER_PADDING.MOBILE,
          overlap: 15
        };

  MainPostImageProps = (isDesktop: boolean) =>
    isDesktop
      ? {
          imageWidth: 1200,
          imageHeight: 627
        }
      : {
          imageWidth: 375,
          imageHeight: 250
        };

  getWidth = (e: any) => {
    const w = e.nativeEvent.layout.width;
    this.setState({
      titleRowWidth: w
    });
  };

  render() {
    const {
      sectionTitle,
      sectionLink,
      sectionColor,
      order,
      posts: [mainPost, ...secondaryPosts]
    } = this.props;

    const { titleRowWidth } = this.state;
    return (
      <Responsive>
        {({ minWidth }) => {
          const isDesktop = minWidth(BREAKPOINTS.LG);
          return (
            <Container type="content">
              <TitleRow
                patternColor={sectionColor}
                link={sectionLink}
                title={sectionTitle}
                isDesktop={isDesktop}
                onLayout={this.getWidth}
              />

              <Row style={{}}>
                <OverlapScaffold
                  {...this.scaffoldProps(isDesktop)}
                  titleOverlap
                  titleWidth={titleRowWidth}
                  isDesktop={isDesktop}
                >
                  <OverlapScaffold.Main>
                    <Post
                      layoutVariant="title-overlap"
                      isDesktop={isDesktop}
                      center
                      {...this.MainPostImageProps(isDesktop)}
                      {...mainPost}
                    />
                  </OverlapScaffold.Main>

                  <OverlapScaffold.Overlap>
                    <ModuleBox offsetDirection={OFFSET_DIRECTION.RIGHT} patternColor={sectionColor}>
                      {isDesktop ? (
                        <OverlapGrid posts={secondaryPosts} />
                      ) : (
                        <PostList posts={secondaryPosts} />
                      )}
                    </ModuleBox>
                  </OverlapScaffold.Overlap>
                </OverlapScaffold>
              </Row>
            </Container>
          );
        }}
      </Responsive>
    );
  }
}
