// @flow

import React, { PureComponent, ReactElement } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

type Props = {
  style: StyleProp<ViewStyle>;
  children: JSX.Element[];
  spacer: number;
  itemsPerRow: number;
};

class Grid extends PureComponent<Props> {
  static defaultProps = {
    spacer: 10,
    style: {},
    itemsPerRow: 3
  };

  getItemStyles = (multiplier = 1) => {
    const { itemsPerRow, spacer } = this.props;

    // XXX flexBasis can't be a string
    const styles = StyleSheet.create({
      item: {
        flexBasis: `${(100 / itemsPerRow) * multiplier}%`,
        padding: spacer / 2
      }
    });

    return styles.item;
  };

  getListStyles = (): StyleProp<ViewStyle> => {
    const { spacer } = this.props;

    return {
      flexDirection: 'row',
      flexWrap: 'wrap',
      margin: -spacer / 2
    };
  };

  renderChildren = () => {
    const { children } = this.props;
    return React.Children.map(children, child => {
      if (!child) {
        return null;
      }

      const multiplier = (child as any).type.name === 'LG' ? 2 : 1;

      return (
        <View style={this.getItemStyles(multiplier)}>
          {React.cloneElement(child as ReactElement)}
        </View>
      );
    });
  };

  render() {
    return (
      <View style={[{ position: 'relative' }]}>
        <View style={[this.getListStyles()]}>{this.renderChildren()}</View>
      </View>
    );
  }
}
export default Grid;
