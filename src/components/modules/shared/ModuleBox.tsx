// @flow

import React, { PureComponent, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { elevation } from '@/constants';
import { Pattern } from '@/components/modules';

import { OFFSET_DIRECTION } from '@/types';

/**
 * To Do
 * padding should be 22 on mobile
 */

type Props = {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  patternColor?: string;
  offsetDirection?: OFFSET_DIRECTION;
};

class ModuleBox extends PureComponent<Props> {
  static defaultProps = {
    offsetDirection: OFFSET_DIRECTION.LEFT
  };

  render() {
    const { children, patternColor, offsetDirection, style } = this.props;

    return patternColor ? (
      <Pattern offsetDirection={offsetDirection} color={patternColor}>
        <Box style={style}>{children}</Box>
      </Pattern>
    ) : (
      <Box style={style}>{children}</Box>
    );
  }
}

export default ModuleBox;

const styles = StyleSheet.create({
  box: {
    ...(elevation(1) as object),
    padding: 30,
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'white'
  }
});

const Box = ({ children, style }: { children: ReactNode; style: StyleProp<ViewStyle> }) => (
  <View style={[styles.box, style]}>{children}</View>
);
