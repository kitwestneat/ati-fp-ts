// @flow

import React, { PureComponent, ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

class Row extends PureComponent<Props> {
  public static defaultProps = {
    style: {}
  };

  public render() {
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
