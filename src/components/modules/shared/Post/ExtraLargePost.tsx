// @flow

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import { PostImage, PostLabel } from '@/components/modules';
import { Text, View } from '@/components/primitives';
import { PostType, WebAccessibilityProps } from '@/types';

export interface ExtraLargePostProps extends Partial<PostType> {
  layoutVariant: 'extraLarge';
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  numberOfLines?: number;
  isDesktop?: boolean;
  categoryName: string;
  categoryColor: string;
}

class ExtraLargePost extends PureComponent<ExtraLargePostProps> {
  public static defaultProps = {
    style: {},
    imageWidth: 630,
    imageHeight: 350
  };

  public render() {
    const {
      imageSrc,
      imageHeight,
      imageWidth,
      link,
      categoryColor,
      categoryName,
      title
    } = this.props;

    const linkProps: WebAccessibilityProps = link ? { accessibilityRole: 'link', href: link } : {};

    return (
      <View {...linkProps} style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexGrow: 1
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <PostLabel fill categoryColor={categoryColor} categoryName={categoryName} />
          </View>
          <Text numberOfLines={3} style={[styles.headline]} html={title} />
        </View>
        <PostImage width={imageWidth} height={imageHeight} imageSrc={imageSrc} />
      </View>
    );
  }
}

export default ExtraLargePost;

const styles = StyleSheet.create({
  headline: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
    marginHorizontal: 70,
    marginTop: 10,
    marginBottom: 25,
    textAlign: 'center'
  }
});
