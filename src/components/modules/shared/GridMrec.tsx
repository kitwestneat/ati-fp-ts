import { Mrec } from '@/components/ads';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { GridSlot, Text } from '../../primitives';

export default class GridMrec extends React.PureComponent {
  public render() {
    return (
      <GridSlot style={styles.adBorder}>
        <Mrec />
        <Text style={styles.adLabel}>Ad</Text>
      </GridSlot>
    );
  }
}

const styles = StyleSheet.create({
  adLabel: {
    bottom: 0,
    position: 'absolute',
    right: 0,
    backgroundColor: 'lightblue',
    fontFamily: 'Work Sans',
    fontSize: 15,
    padding: 5,
    borderTopLeftRadius: 7
  },
  adBorder: {
    borderWidth: 2,
    borderColor: 'lightblue',
    margin: -2,
    padding: 2,
    paddingBottom: 32,
    marginBottom: 0,
    minWidth: 'fit-content'
  }
});
