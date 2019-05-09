// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';

import { COLOR_MAP } from '@/constants';
import { OFFSET_DIRECTION } from '@/types';

type Props = {
  color: string;
  backgroundColor: string;
  offsetDirection: OFFSET_DIRECTION;
  children: any;
};

class Pattern extends PureComponent<Props> {
  static defaultProps = {
    offsetDirection: OFFSET_DIRECTION.LEFT,
    color: COLOR_MAP.ORANGE,
    backgroundColor: COLOR_MAP.SITE_BG,
  };

  getOffsetStyles = () => {
    const { offsetDirection } = this.props;
    const offsetDistance = this.getOffsetDistance();

    return {
      bottom: -offsetDistance,
      [offsetDirection]: -offsetDistance
    };
  };

  getOffsetDistance = () => {
    const OFFSET = 15;
    return OFFSET;
  };

  getGradient = () => {
    const { color, backgroundColor } = this.props;
    //const bg = COLOR_MAP.SITE_BG;
    const space = 5;
    const dot = 2;
    const emptyPercent = `${100 - (dot / space) * 100}%`;

    return {
      backgroundColor: backgroundColor,
      backgroundPosition: 'center center',
      //backgroundImage: `linear-gradient(90deg, ${bg} ${emptyPercent}, transparent 1%), linear-gradient(${bg} ${emptyPercent}, transparent 1%)`,
      backgroundImage: `radial-gradient(${color} 10%, transparent 45%), radial-gradient(${color} 10%, transparent 45%)`,
      backgroundSize: `${space}px ${space}px`
    };
  };
  render() {
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
