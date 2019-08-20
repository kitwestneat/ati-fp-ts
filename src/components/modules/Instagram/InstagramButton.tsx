import { View } from '@/components/primitives';
import { COLOR_MAP } from '@/constants';
import React, { PureComponent } from 'react';
import { FaInstagram } from 'react-icons/fa';
import { StyleSheet, Text } from 'react-native';

const FOLLOW_STRING = 'FOLLOW US';

interface Props {
  url: string;
  color?: string;
}

class InstagramButton extends PureComponent<Props> {
  public render() {
    const { color, url } = this.props;
    return (
      <View
        style={[styles.button, { backgroundColor: color }]}
        accessibilityRole="link"
        href={url}
        target="_blank"
      >
        <FaInstagram fill="white" size={18} />
        <Text style={styles.text}>{FOLLOW_STRING}</Text>
      </View>
    );
  }
}

export default InstagramButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR_MAP.VERMILION,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontSize: 11,
    fontWeight: '400',
    marginLeft: 10,
    letterSpacing: 1
  }
});
