// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';

import { COLOR_MAP } from '@/constants';
import { OFFSET_DIRECTION } from '@/types';

interface Props {
  color: string;
  backgroundColor: string;
  offsetDirection: OFFSET_DIRECTION;
  children: any;
}

class Pattern extends PureComponent<Props> {
  public static defaultProps = {
    offsetDirection: OFFSET_DIRECTION.LEFT,
    color: COLOR_MAP.ORANGE,
    backgroundColor: COLOR_MAP.SITE_BG,
  };

  public getOffsetStyles = () => {
    const { offsetDirection } = this.props;
    const offsetDistance = this.getOffsetDistance();

    return {
      bottom: -offsetDistance,
      [offsetDirection]: -offsetDistance
    };
  };

  public getOffsetDistance = () => {
    const OFFSET = 15;
    return OFFSET;
  };

  public getGradient = () => {
    const { color, backgroundColor } = this.props;
    const space = 5;

    return {
      backgroundColor,
      backgroundPosition: 'center center',
      backgroundImage: `radial-gradient(${color} 10%, transparent 45%), radial-gradient(${color} 10%, transparent 45%)`,
      backgroundSize: `${space}px ${space}px`
    };
  };
  public render() {
    return (
      <View style={[styles.wrap, { marginBottom: this.getOffsetDistance() }]}>
        <View style={[styles.pattern, this.getGradient(), this.getOffsetStyles()]} />
        <View>{this.props.children}</View>
      </View>
    );
  }
}

export default Pattern;

const styles = StyleSheet.create({
  wrap: {
    position: 'relative'
  },
  pattern: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});
