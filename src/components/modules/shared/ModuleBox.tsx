// @flow

import React, { PureComponent, ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Pattern } from '@/components/modules';
import { elevation } from '@/constants';

import { OFFSET_DIRECTION } from '@/types';

/**
 * To Do
 * padding should be 22 on mobile
 */

interface Props {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  patternColor?: string;
  backgroundColor?: string;
  offsetDirection?: OFFSET_DIRECTION;
  onLayout?: any;
}

class ModuleBox extends PureComponent<Props> {
  public static defaultProps = {
    offsetDirection: OFFSET_DIRECTION.LEFT
  };

  public render() {
    const {
      children,
      patternColor,
      backgroundColor,
      offsetDirection,
      style,
      onLayout
    } = this.props;

    return patternColor ? (
      <Pattern
        offsetDirection={offsetDirection}
        color={patternColor}
        backgroundColor={backgroundColor}
      >
        <Box style={style} onLayout={onLayout}>
          {children}
        </Box>
      </Pattern>
    ) : (
      <Box style={style} onLayout={onLayout}>
        {children}
      </Box>
    );
  }
}

export default ModuleBox;

const styles = StyleSheet.create({
  box: {
    ...(elevation(1) as object),
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'white'
  }
});

const Box = ({
  children,
  style,
  onLayout
}: {
  children: ReactNode;
  style: StyleProp<ViewStyle>;
  onLayout?: any;
}) => (
  <View style={[styles.box, style]} onLayout={onLayout}>
    {children}
  </View>
);
