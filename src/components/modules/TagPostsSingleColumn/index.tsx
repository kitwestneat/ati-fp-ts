// @flow

import React, { PureComponent } from 'react';

import { ModuleBox, OverlapFrame } from '@/components/modules';
import { Container, Row } from '@/components/primitives';
import { Responsive } from '@/components/utils';
import { BREAKPOINTS } from '@/constants/index';

import { OFFSET_DIRECTION, PostType } from '@/types';
import PostList from './PostList';
import SingleColumnGrid from './SingleColumnGrid';
import TitleRow from './TitleRow';

interface Props {
  reverse?: boolean;
  sectionTitle: string;
  sectionLink: string;
  sectionColor: string;
  titleTemplate: string;
  posts: PostType[];
}

const frameProps = (isDesktop: boolean) =>
  isDesktop
    ? {
        containerPadding: 45,
        overlap: 30,
        bottomOverlap: 30
      }
    : {
        containerPadding: 15,
        overlap: 15,
        bottomOverlap: 15
      };

const mainPostImageProps = (isDesktop: boolean) =>
  isDesktop
    ? {
        imageWidth: 1200,
        imageHeight: 627
      }
    : {
        imageWidth: 375,
        imageHeight: 250
      };

class TagPostsSingleColumn extends PureComponent<Props> {
  public render() {
    const {
      sectionTitle,
      sectionLink,
      sectionColor,
      posts: [mainPost, ...secondaryPosts]
    } = this.props;

    const reverse = this.props.reverse || false;

    return (
      <Responsive>
        {({ minWidth }) => {
          const isDesktop = minWidth(BREAKPOINTS.LG);

          const mainPostProps = {
            showLabel: false,
            center: true,
            ...mainPostImageProps(isDesktop)
          };

          return (
            <Container type="content">
              <TitleRow
                patternColor={sectionColor}
                link={sectionLink}
                title={sectionTitle}
                isDesktop={isDesktop}
              />

              <Row style={{ marginTop: isDesktop ? 60 : 30 }}>
                <OverlapFrame
                  {...frameProps(isDesktop)}
                  mainPost={mainPost}
                  mainPostProps={mainPostProps}
                  isDesktop={isDesktop}
                >
                  <ModuleBox offsetDirection={OFFSET_DIRECTION.RIGHT} patternColor={sectionColor}>
                    {isDesktop ? (
                      <SingleColumnGrid reverse={reverse} posts={secondaryPosts} />
                    ) : (
                      <PostList posts={secondaryPosts} />
                    )}
                  </ModuleBox>
                </OverlapFrame>
              </Row>
            </Container>
          );
        }}
      </Responsive>
    );
  }
}

export default TagPostsSingleColumn;
