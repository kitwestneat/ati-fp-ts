// @flow

import React, { PureComponent, ComponentType } from 'react';
import { View as RNView, StyleProp, ViewProps } from 'react-native';
import { WebAccessibilityProps, WebViewStyle, Omit } from '@/types';

type WebViewProps = Omit<ViewProps, 'style' | 'accessibilityRole'> & WebAccessibilityProps;

interface Props extends WebViewProps {
  style?: StyleProp<WebViewStyle>;
  spacer?: number;
  row?: boolean;
  col?: boolean;
}

class View extends PureComponent<Props> {
  static defaultProps = {
    row: false,
    col: true,
    style: {}
  };

  getFlexDirection = (): WebViewStyle => {
    const { row, col } = this.props;
    return { flexDirection: col && !row ? 'column' : 'row' };
  };

  getMarginTop = (): WebViewStyle => {
    const { spacer } = this.props;
    return { marginTop: spacer };
  };

  getDerivedStyles = (): StyleProp<WebViewStyle> => {
    return {
      ...this.getFlexDirection(),
      ...this.getMarginTop()
    };
  };

  render() {
    const { style, spacer, children, ...rest } = this.props;
    const derivedStyles = this.getDerivedStyles();
    const RNWView = (RNView as any) as ComponentType<Props>;

    return (
      <RNWView style={[derivedStyles, style]} {...rest}>
        {children}
      </RNWView>
    );
  }
}

export default View;
