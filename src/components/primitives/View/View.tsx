// @flow

import React, { PureComponent } from 'react';
import { View as RNView, StyleSheet, ViewStyle, StyleProp } from 'react-native';

// type ContentPositioning = { centerX?: boolean } | { centerY?: boolean } | { center?: boolean };

type Props = {
  style?: StyleProp<ViewStyle>;
  spacer?: number;
  children: Node;
  row: boolean;
  col: boolean;
};

class View extends PureComponent<Props> {
  static defaultProps = {
    spacer: 100,
    row: false,
    col: true,
    style: {}
  };

  getFlexDirection = (): ViewStyle => {
    const { row, col } = this.props;
    return { flexDirection: col && !row ? 'column' : 'row' };
  };

  getMarginTop = (): ViewStyle => {
    const { spacer } = this.props;
    return { marginTop: spacer };
  };

  getDerivedStyles = (): StyleProp<ViewStyle> => {
    return {
      ...this.getFlexDirection(),
      ...this.getMarginTop()
    };
  };

  render() {
    const { style, spacer, children, ...rest } = this.props;
    const derivedStyles = this.getDerivedStyles();

    return (
      <RNView style={[styles.row, derivedStyles, style]} {...rest}>
        {children}
      </RNView>
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
