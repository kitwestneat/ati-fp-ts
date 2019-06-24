// @flow

import React, { PureComponent } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

const CONTAINER_TYPES = {
  READABILITY: 'readability',
  CONTENT: 'content',
  DEFAULT: 'default'
};

const MAX_WIDTHS = {
  [CONTAINER_TYPES.READABILITY]: 800,
  [CONTAINER_TYPES.CONTENT]: 1110,
  [CONTAINER_TYPES.DEFAULT]: '100%'
};

interface Props {
  rest: any;
  style: StyleProp<ViewStyle>;
  type: string;
}

class Container extends PureComponent<Props> {
  public static defaultProps = {
    style: {},
    rest: {},
    type: CONTAINER_TYPES.DEFAULT
  };

  public getMaxWidth = () => MAX_WIDTHS[this.props.type];

  public render() {
    const { style, ...rest } = this.props;

    const maxWidth = this.getMaxWidth();

    return <View style={[styles.container, { maxWidth }, style]} {...rest} />;
  }
}

export default Container;

const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
});
