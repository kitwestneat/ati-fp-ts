// @flow

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import { PostLabel } from '@/components/modules';
import { Text, View } from '@/components/primitives';
import { PostType, WebAccessibilityProps } from '@/types';

export interface SmallPostProps extends Partial<PostType> {
  layoutVariant: 'reduced';
  numberOfLines?: number;
  isDesktop?: boolean;
}

class SmallPost extends PureComponent<SmallPostProps> {
  static defaultProps = {
    style: {}
  };

  render() {
    const { numberOfLines, title, categoryName, categoryColor, link, isDesktop } = this.props;

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
        <View style={{ marginTop: 6 }}>
          <Text numberOfLines={numberOfLines} style={[{ fontWeight: '600' }, fontStyles]}>
            {title}
          </Text>
        </View>
      </View>
    );
  }
}

export default SmallPost;

const styles = StyleSheet.create({
  postBox: {
    width: '100%',
    flex: 1
  }
});
