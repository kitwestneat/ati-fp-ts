import React, { PureComponent } from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';

import { Text, View } from '../../../primitives';

interface Props {
  styles?: {
    headline: StyleProp<TextStyle>;
    subheadline: StyleProp<TextStyle>;
  };
  copy: {
    headline: string;
    subheadline: string;
  };
}

class Callout extends PureComponent<Props> {
  public render() {
    const { copy, styles: propStyles }: Props = this.props;
    return (
      <>
        <View>
          <Text style={[styles.title, propStyles && propStyles.headline]}>{copy.headline}</Text>
        </View>
        <View>
          <Text style={[styles.instructions, propStyles && propStyles.subheadline]}>
            {copy.subheadline}
          </Text>
        </View>
      </>
    );
  }
}

export default Callout;

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 30,
    lineHeight: 40,
    fontWeight: '600'
  },
  instructions: {
    color: 'white',
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '300'
  }
});
