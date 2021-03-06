// @flow

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import { PostLabel } from '@/components/modules';
import { Image, Text, View } from '@/components/primitives';
import { PostType, WebAccessibilityProps } from '@/types';

export interface SmallPostProps extends Partial<PostType> {
  layoutVariant: 'reduced';
  numberOfLines?: number;
  isDesktop?: boolean;
  showImage?: boolean;
}

class SmallPost extends PureComponent<SmallPostProps> {
  public static defaultProps = {
    style: {},
    showImage: false
  };

  public render() {
    const {
      numberOfLines,
      title,
      authorName,
      categoryName,
      categoryColor,
      link,
      imageSrc,
      showImage,
      isDesktop
    } = this.props;

    const fontStyles = isDesktop
      ? { fontSize: 17, lineHeight: 24 }
      : { fontSize: 15, lineHeight: 20 };

    const linkProps: WebAccessibilityProps = link ? { accessibilityRole: 'link', href: link } : {};

    return (
      <View style={[styles.postBox]} {...linkProps}>
        <PostLabel
          categoryName={categoryName || 'DEFAULT'}
          categoryColor={categoryColor || '#999'}
        />
        <View
          style={{
            marginTop: 6,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Text
            numberOfLines={numberOfLines}
            style={[{ fontWeight: '600' }, fontStyles]}
            html={title}
          />
          {showImage && (
            <View style={{ width: '75px', marginLeft: '10px' }}>
              <Image src={imageSrc} width={1} height={1} />
            </View>
          )}
        </View>
        {authorName && (
          <View>
            <Text style={styles.authorText}>{'By ' + authorName}</Text>
          </View>
        )}
      </View>
    );
  }
}

export default SmallPost;

const styles = StyleSheet.create({
  postBox: {
    width: '100%',
    flex: 1
  },
  authorText: {
    marginTop: 6,
    fontSize: 15,
    color: '#333333'
  }
});
