import TrendingLine from '@/assets/images/trending-line.svg';
import { ModuleBox, Pattern } from '@/components/modules';
import { Image } from '@/components/primitives';
import { COLOR_MAP } from '@/constants';
import { capitalize } from '@/utils';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TrendingPostsGridDesktop, TrendingPostsGridMobile } from './TrendingPostsGrid';

interface Props {
  isDesktop: boolean;
  tag: string;
  trendingPosts: any;
}

export default class TrendingPosts extends PureComponent<Props> {
  public renderDesktop = () => {
    const { isDesktop, tag, trendingPosts } = this.props;

    const localFontStyles = isDesktop
      ? { fontSize: 24, lineHeight: 29 }
      : { fontSize: 20, lineHeight: 24 };

    return (
      <View style={styles.trendingDesktopContainer}>
        <Text style={[styles.headerText, localFontStyles]}>Trending in {capitalize(tag)}</Text>
        <TrendingPostsGridDesktop posts={trendingPosts} />
      </View>
    );
  };

  public renderMobile = () => {
    const { tag, trendingPosts } = this.props;
    return (
      <View style={styles.trendingMobileContainer}>
        <View style={{ paddingHorizontal: '40px' }}>
          <Pattern color={COLOR_MAP.GREEN}>
            <View style={[styles.colorBackground, { backgroundColor: COLOR_MAP.GREEN }]}>
              <Text style={styles.text}>Trending in {capitalize(tag)}</Text>
              <View style={{ width: '20%' }}>
                <Image width={45} height={27} source={{ uri: TrendingLine }} />
              </View>
            </View>
          </Pattern>
        </View>
        <View style={{ paddingHorizontal: '15px', marginTop: 30 }}>
          <ModuleBox>
            <TrendingPostsGridMobile posts={trendingPosts} />
          </ModuleBox>
        </View>
      </View>
    );
  };

  public render() {
    const { isDesktop } = this.props;
    return isDesktop ? this.renderDesktop() : this.renderMobile();
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontWeight: '600',
    marginBottom: '15px'
  },
  trendingDesktopContainer: {
    width: '27%'
  },
  trendingMobileContainer: {
    width: '100%',
    marginTop: 30
  },
  trendingMobileTextStyles: {
    marginLeft: '15px',
    marginTop: '1em'
  },
  colorBackground: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px'
  },
  text: {
    lineHeight: 37,
    fontSize: 40,
    color: 'white',
    fontWeight: '600'
  }
});
