import { ModuleBox, OverlapScaffold, Post } from '@/components/modules';
import { Row } from '@/components/primitives';
import { CONTAINER_PADDING } from '@/constants';
import { OFFSET_DIRECTION } from '@/types';
import { capitalize } from '@/utils';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RecentPostsGridDesktop, RecentPostsGridMobile } from './RecentPostsGrid';

interface Props {
  isDesktop: boolean;
  tag: string;
  mainPost: any;
  secondaryPosts: any;
  sectionColor: string;
}

export default class RecentPosts extends PureComponent<Props> {
  public scaffoldProps = (isDesktop: boolean) =>
    isDesktop
      ? {
          containerPadding: 45,
          overlap: 30
        }
      : {
          containerPadding: CONTAINER_PADDING.MOBILE,
          overlap: 15
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

  public render() {
    const { isDesktop, tag, mainPost, secondaryPosts, sectionColor } = this.props;

    const localFontStyles = isDesktop
      ? { fontSize: 24, lineHeight: 29 }
      : { fontSize: 20, lineHeight: 24 };

    return (
      <View style={{ width: isDesktop ? '68%' : '100%' }}>
        <Text style={[styles.headerText, localFontStyles, { marginLeft: isDesktop ? 0 : '15px' }]}>
          Recently in {capitalize(tag)}
        </Text>

        <Row style={{}}>
          <OverlapScaffold {...this.scaffoldProps(isDesktop)} isDesktop={isDesktop}>
            <OverlapScaffold.Main>
              <Post
                layoutVariant="overlay"
                isDesktop={isDesktop}
                center
                {...this.MainPostImageProps(isDesktop)}
                {...mainPost}
              />
            </OverlapScaffold.Main>

            <OverlapScaffold.Overlap>
              <ModuleBox offsetDirection={OFFSET_DIRECTION.RIGHT} patternColor={sectionColor}>
                {isDesktop ? (
                  <RecentPostsGridDesktop posts={secondaryPosts} />
                ) : (
                  <RecentPostsGridMobile posts={secondaryPosts} />
                )}
              </ModuleBox>
            </OverlapScaffold.Overlap>
          </OverlapScaffold>
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
