// @flow

import React, { PureComponent, ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

class Row extends PureComponent<Props> {
  static defaultProps = {
    style: {}
  };

  render() {
    const { style, children, ...rest } = this.props;
    return (
      <View style={[styles.row, style]} {...rest}>
        {children}
      </View>
    );
  }
}

export default Row;

const styles = StyleSheet.create({
  row: {
    width: '100%'
  }
});
