// @flow

import React, { PureComponent } from 'react';
import { Text as RNText, StyleSheet, TextProps } from 'react-native';
import Clamp from './Clamp';

import { FONT_FAMILIES, COLOR_MAP } from '@/constants/index';
import { LinkProps } from '@/types';

type WebTextProps = TextProps & LinkProps;

interface Props extends WebTextProps {
  serif?: boolean;
  sansSerif?: boolean;
  numberOfLines?: number;
}

class Text extends PureComponent<Props> {
  static defaultProps = {
    style: {},
    serif: false,
    sansSerif: true
  };

  render() {
    const { numberOfLines, serif, sansSerif, style, children, ...rest } = this.props;
    const fontFamily = this.props.serif ? FONT_FAMILIES.SERIF : FONT_FAMILIES.SANS_SERIF;

    const RNWText = (RNText as any) as React.ComponentType<WebTextProps>;

    return numberOfLines ? (
      <Clamp numberOfLines={numberOfLines} {...rest} style={[styles.text, { fontFamily }, style]}>
        {children}
      </Clamp>
    ) : (
      <RNWText {...rest} style={[styles.text, { fontFamily }, style]}>
        {children}
      </RNWText>
    );
  }
}

export default Text;

const styles = StyleSheet.create({
  text: {
    color: COLOR_MAP.TEXT_COLOR,
    fontSize: 17,
    lineHeight: 20
  }
});
