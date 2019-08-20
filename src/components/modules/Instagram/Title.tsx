import { COLOR_MAP } from '@/constants/index';
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../primitives';

interface Props {
  isDesktop: boolean;
  isHU?: boolean;
  hashColor?: string;
}

class Title extends PureComponent<Props> {
  public renderInstagram = () => <Text style={styles.text}>Instagram</Text>;

  public render() {
    const { isDesktop, isHU = false, hashColor } = this.props;

    const title = !isHU ? 'ati' : 'history uncovered';
    const extraStyles = isHU
      ? {
          fontSize: 23
        }
      : {};

    return (
      <View>
        {isDesktop ? (
          <Text serif style={[styles.text, extraStyles]}>
            <Text style={[styles.text, extraStyles, { color: hashColor }]}>#</Text>
            {title} on{' '}
            <Text serif style={[styles.text, styles.instagram]}>
              instagram
            </Text>
          </Text>
        ) : (
          <Text serif={isHU} style={[styles.text, extraStyles]}>
            <Text style={[styles.text, extraStyles, { color: hashColor }]}>#</Text>
            {title}
          </Text>
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
