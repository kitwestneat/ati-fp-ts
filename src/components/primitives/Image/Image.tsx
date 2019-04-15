import React, { PureComponent } from 'react';
import {
  Image as RNImage,
  StyleSheet,
  ImageStyle,
  ImageSourcePropType,
  ImageResizeMode
} from 'react-native';

import { Ratio } from '@/components/primitives';

interface Props {
  alt?: string;
  width?: number;
  height?: number;
  style?: object;
  source?: ImageSourcePropType;
  src?: string;
  resizeMode?: ImageResizeMode;
}

interface Dimension {
  width: number;
  height: number;
}

/**
 * To Do
 * transform api
 * srcset
 * alt
 */

class Image extends PureComponent<Props> {
  static defaultProps = {
    src: 'http://placehold.it/350x150',
    resizeMode: 'cover'
  };

  getValueFromStyleProp = (cssProperty: keyof ImageStyle): number | undefined =>
    this.props.style && ((StyleSheet.flatten(this.props.style) as any)[cssProperty] as number);

  getDimensionsFromProps = (): Dimension | null => {
    const { width, height } = this.props;

    return typeof width == 'number' && typeof height == 'number'
      ? {
          width,
          height
        }
      : null;
  };

  getDimensionsFromStyles = (): Dimension | null => {
    const width = this.getValueFromStyleProp('width');
    const height = this.getValueFromStyleProp('height');

    return typeof width == 'number' && typeof height == 'number'
      ? {
          width,
          height
        }
      : null;
  };

  getStaticDimensions = (): Dimension | null =>
    this.getDimensionsFromProps() || this.getDimensionsFromStyles();

  getRatioString = ({ width, height }: Dimension) => `${width}:${height}`;

  getRatio = () => {
    const dir = this.getStaticDimensions();
    if (dir) {
      return this.getRatioString(dir);
    }
  };

  getSource = (): ImageSourcePropType => {
    const { src, source } = this.props;

    return source ? source : { uri: src };
  };

  render() {
    const { style, alt, resizeMode, ...rest } = this.props;

    return (
      <Ratio ratio={this.getRatio()}>
        <RNImage
          source={this.getSource()}
          accessibilityLabel={alt}
          style={[styles.expand]}
          resizeMode={resizeMode}
          {...rest}
        />
      </Ratio>
    );
  }
}

export default Image;

const styles = StyleSheet.create({
  expand: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%'
  }
});
