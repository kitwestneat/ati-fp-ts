// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { LazyView } from '@/components/utils';

import { Image } from '@/components/primitives';
import { THUMBER_URL } from '@/constants/index';

interface Props {
  imageSrc?: string;
  width: number;
  height: number;
  contrastOverlay?: boolean;
}

class PostImage extends PureComponent<Props> {
  public render() {
    const { imageSrc, width, height, contrastOverlay } = this.props;
    if (!imageSrc) {
      console.warn('empty image src');
      return;
    }

    let wh = '';
    if (width) {
      wh += `${width}.`;
      if (height) {
        wh += `${height}.`;
      }
    }

    const src = `${THUMBER_URL}/${wh}${imageSrc}`;

    return (
      <LazyView>
        <Image width={width} height={height} src={src} />
        {contrastOverlay && <View style={styles.overlay} />}
      </LazyView>
    );
  }
}

export default PostImage;

const styles = StyleSheet.create({
  container: { position: 'relative' },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '80%',
    backgroundImage:
            'linear-gradient(to bottom,transparent 0,rgba(0,0,0,.02) 14%,rgba(0,0,0,.05) 23%,rgba(0,0,0,.18) 43%,rgba(0,0,0,.41) 62%,rgba(0,0,0,.8) 88%,rgba(0,0,0,.81) 90%,rgba(0,0,0,.9) 95%,rgba(0,0,0,.94) 100%)'
  }
});
