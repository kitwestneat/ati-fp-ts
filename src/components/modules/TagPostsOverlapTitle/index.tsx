import { ModuleBox, OverlapScaffold, Post } from '@/components/modules';
import { Container, Row } from '@/components/primitives';
import { Responsive } from '@/components/utils';
import { BREAKPOINTS, CONTAINER_PADDING } from '@/constants';
import { OFFSET_DIRECTION, PostType, TagTileBoxModuleData } from '@/types';
import React, { PureComponent } from 'react';
import PostList from '../TagPostsSingleColumn/PostList';
import OverlapGrid from './OverlapGrid';
import TitleRow from './TitleRow';

interface Props extends TagTileBoxModuleData {
  posts: PostType[];
  sectionLink: string;
  sectionColor: string;
  sectionTitle: string;
}

interface State {
  titleRowWidth: number;
}

export default class TagPostsOverlapTitle extends PureComponent<Props, State> {
  public state = {
    titleRowWidth: 0
  };

  public scaffoldProps = (isDesktop: boolean) =>
    isDesktop
      ? {
          containerPadding: 0,
          overlap: -15,
          bottomOverlap: 22.5
        }
      : {
          containerPadding: CONTAINER_PADDING.MOBILE,
          overlap: 15,
          bottomOverlap: 15
        };

  public MainPostImageProps = (isDesktop: boolean) =>
    isDesktop
      ? {
          imageWidth: 1200,
          imageHeight: 627
        }
      : {
          imageWidth: 375,
          imageHeight: 250
        };

  public getWidth = (e: any) => {
    const w = e.nativeEvent.layout.width;
    this.setState({
      titleRowWidth: w
    });
  };

  public render() {
    const {
      sectionTitle,
      sectionLink,
      sectionColor,
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
                      layoutVariant="overlay"
                      isDesktop={isDesktop}
                      center
                      showLabel={false}
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
