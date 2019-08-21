// @flow

import React, { ComponentType, PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import { View } from '@/components/primitives';
import { Omit } from '@/types';
import ExtraLargePost, { ExtraLargePostProps } from './ExtraLargePost';
import LargePost, { LargePostProps } from './LargePost';
import MediumPost, { MediumPostProps } from './MediumPost';
import OverlayPost, { OverlayPostProps } from './OverlayPost';
import SmallPost, { SmallPostProps } from './SmallPost';

const LAYOUT_VARIANT = {
  REDUCED: 'reduced',
  MEDIUM: 'medium',
  OVERLAY: 'overlay',
  LARGE: 'large',
  EXTRA_LARGE: 'extraLarge'
};

const POST_VARIANT_MAP = {
  [LAYOUT_VARIANT.REDUCED]: SmallPost,
  [LAYOUT_VARIANT.OVERLAY]: OverlayPost,
  [LAYOUT_VARIANT.MEDIUM]: MediumPost,
  [LAYOUT_VARIANT.LARGE]: LargePost,
  [LAYOUT_VARIANT.EXTRA_LARGE]: ExtraLargePost
};

type AllSubPostProps = SmallPostProps &
  OverlayPostProps &
  MediumPostProps &
  LargePostProps &
  ExtraLargePost;
type SubPostProps = Partial<Omit<AllSubPostProps, 'layoutVariant'>>;

export interface PostProps extends SubPostProps {
  layoutVariant: 'reduced' | 'medium' | 'overlay' | 'large' | 'extraLarge';
  link: string;
  postLine?: boolean;
  showLabel?: boolean;
}

class Post extends PureComponent<PostProps> {
  public render() {
    const { layoutVariant, link, ...rest } = this.props;

    const PostComponent = (POST_VARIANT_MAP[layoutVariant] as any) as ComponentType<SubPostProps>;

    return (
      <View style={[styles.postBox]} accessibilityRole="link" href={link}>
        <PostComponent {...rest} />
      </View>
    );
  }
}

export default Post;

const styles = StyleSheet.create({
  postBox: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between'
  }
});
