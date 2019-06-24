// @flow

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import { PostImage } from '@/components/modules';
import { View } from '@/components/primitives';
import { PostType, WebAccessibilityProps } from '@/types';
import SmallPost from './SmallPost';

export interface LargePostProps extends Partial<PostType> {
  layoutVariant: 'large';
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  numberOfLines?: number;
  isDesktop?: boolean;
}

class LargePost extends PureComponent<LargePostProps> {
  public static defaultProps = {
    style: {},
    imageWidth: 630,
    imageHeight: 250, 
  };

  public render() {
    const { imageSrc, imageHeight, imageWidth, link, layoutVariant, ...rest } = this.props;
    const linkProps: WebAccessibilityProps = link ? { accessibilityRole: 'link', href: link } : {};

    return (
      <View {...linkProps} style={{ flex: 1 }}>
        <PostImage width={imageWidth} height={imageHeight} imageSrc={imageSrc} />
        <View
          style={{
            marginTop: 15,
            justifyContent: 'space-between',
            flexGrow: 1
          }}
        >
          <SmallPost layoutVariant="reduced" {...rest} />
          <View style={styles.postLine} />
        </View>
      </View>
    );
  }
}

export default LargePost;

const styles = StyleSheet.create({
  postLine: {
    marginTop: 18,
    backgroundColor: 'black',
    height: 2,
    width: '100%'
  }
});
