import { COLOR_MAP } from '@/constants/index';
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../primitives';

interface Props {
  isDesktop: boolean;
}

class Title extends PureComponent<Props> {
  public renderInstagram = () => <Text style={styles.text}>Instagram</Text>;

  public render() {
    const { isDesktop } = this.props;

    return (
      <View>
        {isDesktop ? (
          <Text serif style={styles.text}>
            #ati on{' '}
            <Text serif style={[styles.text, styles.instagram]}>
              instagram
            </Text>
          </Text>
        ) : (
          <Text style={styles.text}>#ati</Text>
        )}
      </View>
    );
  }
}

export default Title;

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: '600'
  },
  instagram: {
    color: COLOR_MAP.VERMILION
  }
});
