// @flow

import { Omit, WebAccessibilityProps, WebViewStyle } from '@/types';
import React, { ComponentType, PureComponent } from 'react';
import { StyleProp, View as RNView, ViewProps } from 'react-native';

type WebViewProps = Omit<ViewProps, 'style' | 'accessibilityRole'> & WebAccessibilityProps;

interface Props extends WebViewProps {
  style?: StyleProp<WebViewStyle>;
  spacer?: number;
  row?: boolean;
  col?: boolean;
}

class View extends PureComponent<Props> {
  public static defaultProps = {
    row: false,
    col: true,
    style: {}
  };

  public getFlexDirection = (): WebViewStyle => {
    const { row, col } = this.props;
    return { flexDirection: col && !row ? 'column' : 'row' };
  };

  public getMarginTop = (): WebViewStyle => {
    const { spacer } = this.props;
    return { marginTop: spacer };
  };

  public getDerivedStyles = (): StyleProp<WebViewStyle> => {
    return {
      ...this.getFlexDirection(),
      ...this.getMarginTop()
    };
  };

  public render() {
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
