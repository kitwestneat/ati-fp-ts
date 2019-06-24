// @flow

import React, { PureComponent, ReactElement } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import GridSlot from './GridSlot';

interface Props {
  style: StyleProp<ViewStyle>;
  children: JSX.Element[];
  spacer: number;
  itemsPerRow: number;
}

class Grid extends PureComponent<Props> {
  public static defaultProps = {
    spacer: 10,
    style: {},
    itemsPerRow: 3
  };

  public getListStyles = (): StyleProp<ViewStyle> => {
    const { spacer } = this.props;

    return {
      flexDirection: 'row',
      flexWrap: 'wrap',
      margin: -spacer / 2
    };
  };

  public renderChildren = () => {
    const { children, spacer, itemsPerRow } = this.props;
    const gridSlotProps = {
      spacer,
      itemsPerRow
    };

    return React.Children.map(children, (inChild, i) => {
      const child = inChild as ReactElement;
      if (!child) {
        return null;
      }

      if (typeof child.type === 'string') {
        console.log('renderChildren: string child', child);
      }

      const name = typeof child.type === 'string' ? child.type : child.type.name;
      const isGridSlot = name === 'GridSlot';
      if (isGridSlot) {
        return React.cloneElement(child, {
          ...gridSlotProps,
          ...child.props
        });
      }

      return <GridSlot {...gridSlotProps}>{child}</GridSlot>;
    });
  };

  public render() {
    return (
      <View style={[{ position: 'relative' }]}>
        <View style={this.getListStyles()}>{this.renderChildren()}</View>
      </View>
    );
  }
}
export default Grid;
