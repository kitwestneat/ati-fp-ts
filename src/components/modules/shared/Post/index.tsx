// @flow

import React, { PureComponent, ComponentType } from 'react';
import { StyleSheet } from 'react-native';

import SmallPost, { SmallPostProps } from './SmallPost';
import MediumPost, { MediumPostProps } from './MediumPost';
import OverlayPost, { OverlayPostProps } from './OverlayPost';
import TitleOverlapPost, { TitleOverlapPostProps } from './TitleOverlapPost';
import LargePost, { LargePostProps } from './LargePost'
import { View } from '@/components/primitives';
import { Omit } from '@/types';

const LAYOUT_VARIANT = {
  REDUCED: 'reduced',
  MEDIUM: 'medium',
  OVERLAY: 'overlay', 
  LARGE: 'large',
  TITLE_OVERLAP: 'title-overlap',
};

const POST_VARIANT_MAP = {
  [LAYOUT_VARIANT.REDUCED]: SmallPost,
  [LAYOUT_VARIANT.OVERLAY]: OverlayPost,
  [LAYOUT_VARIANT.MEDIUM]: MediumPost,
  [LAYOUT_VARIANT.LARGE]: LargePost,
  [LAYOUT_VARIANT.TITLE_OVERLAP]: TitleOverlapPost,
};

type AllSubPostProps = SmallPostProps & OverlayPostProps & MediumPostProps;
type SubPostProps = Partial<Omit<AllSubPostProps, 'layoutVariant'>>;

export interface PostProps extends SubPostProps {
  layoutVariant: 'reduced' | 'medium' | 'overlay' | 'large' | 'title-overlap';
  link: string;
  postLine?: boolean;
}

class Post extends PureComponent<PostProps> {
  render() {
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
