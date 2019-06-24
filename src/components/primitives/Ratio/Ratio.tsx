// @flow

import React, { PureComponent, ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * To Do
 * enforce single child type
 * apply content styles to child
 * error handling?
 * expand API?
 */

interface Props {
  ratio: string;
  children?: React.ReactNode;
}

const FB_RATIO = '1.88:1';

class Ratio extends PureComponent<Props> {
  public static defaultProps = {
    ratio: FB_RATIO,
    children: <View style={{ backgroundColor: '#ebebeb' }} />
  };

  public getRatioPercentageFromRatioString = () => {
    const { width, height } = this.getDimensionsFromRatio();
    return (height / width) * 100 + '%';
  };

  public getDimensionsFromRatio = () => {
    const { ratio } = this.props;
    const [width, height] = ratio.split(':').map(Number);

    return { width, height };
  };

  public getPaddingBottom = () => ({
    paddingBottom: this.getRatioPercentageFromRatioString()
  });

  public renderChild = () => {
    const { children } = this.props;

    return children
      ? React.Children.map(children as ReactElement[], (child: ReactElement) => {
          return React.cloneElement(child, {
            style: [styles.content, child.props.style]
          });
        })
      : null;
  };

  public render() {
    return (
      <View style={{ width: '100%' }}>
        <View style={[styles.wrap, this.getPaddingBottom()]}>{this.renderChild()}</View>
      </View>
    );
  }
}

export default Ratio;

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    position: 'relative',
    height: 0,
    width: '100%'
  },
  content: {
    bottom: 0,
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%'
  }
});
