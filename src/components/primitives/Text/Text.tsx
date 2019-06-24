// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, Text as RNText, TextProps } from 'react-native';
import Clamp from './Clamp';

import { COLOR_MAP, FONT_FAMILIES } from '@/constants/index';
import { Omit, WebAccessibilityProps } from '@/types';
import HtmlText from '../HtmlText/HtmlText';

type WebTextProps = Omit<TextProps, 'accessibilityRole'> & WebAccessibilityProps;

interface Props extends WebTextProps {
  serif?: boolean;
  sansSerif?: boolean;
  numberOfLines?: number;
  html?: string;
}

class Text extends PureComponent<Props> {
  public static defaultProps = {
    style: {},
    serif: false,
    sansSerif: true
  };

  public render() {
    const { html, numberOfLines, serif, sansSerif, style, children, ...rest } = this.props;
    const fontFamily = this.props.serif ? FONT_FAMILIES.SERIF : FONT_FAMILIES.SANS_SERIF;

    const RNWText = (RNText as any) as React.ComponentType<WebTextProps>;

    if (html) {
      return (
        <RNWText {...rest} style={[styles.text, { fontFamily }, style]}>
          <HtmlText html={html} />
        </RNWText>
      );
    }

    if (numberOfLines) {
      return (
        <Clamp numberOfLines={numberOfLines} {...rest} style={[styles.text, { fontFamily }, style]}>
          {children}
        </Clamp>
      );
    }

    return (
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
