// @flow

import React, { PureComponent, ComponentType } from 'react';
import { View as RNView, StyleSheet, ViewStyle, StyleProp, ViewProps } from 'react-native';
import { LinkProps, WebViewStyle, Omit } from '@/types';

// type ContentPositioning = { centerX?: boolean } | { centerY?: boolean } | { center?: boolean };

type WebViewProps = Omit<ViewProps, 'style'> & LinkProps;

interface Props extends WebViewProps {
  style?: StyleProp<WebViewStyle>;
  spacer?: number;
  row: boolean;
  col: boolean;
}

class View extends PureComponent<Props> {
  static defaultProps = {
    spacer: 100,
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
      <RNWView style={[styles.row, derivedStyles, style]} {...rest}>
        {children}
      </RNWView>
    );
  }
}

export default View;

const styles = StyleSheet.create({
  row: {
    width: '100%',
    maxWidth: '100%'
  }
});
