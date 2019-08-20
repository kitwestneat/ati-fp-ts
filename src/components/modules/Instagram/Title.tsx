import { COLOR_MAP } from '@/constants/index';
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebAccessibilityProps } from '../../../types';
import { Text } from '../../primitives';

interface Props {
  isDesktop: boolean;
  isHU?: boolean;
  hashColor?: string;
  href?: string;
}

class Title extends PureComponent<Props> {
  public render() {
    const { isDesktop, isHU = false, hashColor, href } = this.props;

    const title = !isHU ? 'ati' : 'history uncovered';
    const fontStyle = isHU
      ? {
          fontSize: 23
        }
      : {};

    const colorStyle = { color: hashColor };
    const link: WebAccessibilityProps = href ? { accessibilityRole: 'link', href } : {};

    return (
      <View>
        {isDesktop ? (
          <Text serif style={[styles.text]} {...link}>
            <Text style={[styles.text, colorStyle]}>#</Text>
            {title} on{' '}
            <Text serif style={[styles.text, styles.instagram, colorStyle]}>
              instagram
            </Text>
          </Text>
        ) : (
          <Text serif={isHU} style={[styles.text, fontStyle]}>
            <Text style={[styles.text, fontStyle, colorStyle]}>#</Text>
            {title}
          </Text>
        )}
      </View>
    );
  }
}

export default Title;

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: '600'
  },
  instagram: {
    color: COLOR_MAP.VERMILION
  }
});
