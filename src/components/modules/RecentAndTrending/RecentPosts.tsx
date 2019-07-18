import { ModuleBox, OverlapFrame } from '@/components/modules';
import { Row, Text } from '@/components/primitives';
import { OFFSET_DIRECTION } from '@/types';
import { capitalize } from '@/utils';
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { RecentPostsGridDesktop, RecentPostsGridMobile } from './RecentPostsGrid';

interface Props {
  isDesktop: boolean;
  tag: string;
  mainPost: any;
  secondaryPosts: any;
  sectionColor: string;
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

export default class RecentPosts extends PureComponent<Props> {
  public render() {
    const { isDesktop, tag, mainPost, secondaryPosts, sectionColor } = this.props;

    const localFontStyles = isDesktop
      ? { fontSize: 24, lineHeight: 29 }
      : { fontSize: 20, lineHeight: 24 };

    const mainPostProps = {
      showLabel: false,
      center: true,
      ...mainPostImageProps(isDesktop)
    };

    return (
      <View style={{ width: isDesktop ? '68%' : '100%' }}>
        <Text
          accessibilityRole="heading"
          aria-level="2"
          style={[styles.headerText, localFontStyles, { marginLeft: isDesktop ? 0 : '15px' }]}
        >
          Recently in {capitalize(tag)}
        </Text>

        <Row style={{}}>
          <OverlapFrame
            {...frameProps(isDesktop)}
            mainPost={mainPost}
            mainPostProps={mainPostProps}
            isDesktop={isDesktop}
          >
            <ModuleBox offsetDirection={OFFSET_DIRECTION.RIGHT} patternColor={sectionColor}>
              {isDesktop ? (
                <RecentPostsGridDesktop posts={secondaryPosts} />
              ) : (
                <RecentPostsGridMobile posts={secondaryPosts} />
              )}
            </ModuleBox>
          </OverlapFrame>
        </Row>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontWeight: '600',
    marginBottom: '15px'
  }
});
