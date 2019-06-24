// @flow

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import { PostImage } from '@/components/modules';
import { View } from '@/components/primitives';
import { PostType, WebAccessibilityProps } from '@/types';
import SmallPost from './SmallPost';

export interface MediumPostProps extends Partial<PostType> {
  layoutVariant: 'medium';
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  numberOfLines?: number;
  isDesktop?: boolean;
  postLine?: boolean;
}

class MediumPost extends PureComponent<MediumPostProps> {
  public static defaultProps = {
    style: {},
    imageWidth: 300,
    imageHeight: 250,
    postLine: true,
  };

  public render() {
    const { imageSrc, imageHeight, imageWidth, link, layoutVariant, postLine, ...rest } = this.props;
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
          {postLine && <View style={styles.postLine} />}
        </View>
      </View>
    );
  }
}

export default MediumPost;

const styles = StyleSheet.create({
  postLine: {
    marginTop: 18,
    backgroundColor: 'black',
    height: 2,
    width: '100%'
  }
});
