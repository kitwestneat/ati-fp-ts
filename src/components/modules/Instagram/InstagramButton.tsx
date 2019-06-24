import { View } from '@/components/primitives';
import { ATI_INSTAGRAM_URL, COLOR_MAP } from '@/constants';
import React, { PureComponent } from 'react';
import { FaInstagram } from 'react-icons/fa';
import { StyleSheet, Text } from 'react-native';

const FOLLOW_STRING = 'FOLLOW US';

class InstagramButton extends PureComponent {
  public render() {
    return (
      <View style={styles.button} accessibilityRole="link" href={ATI_INSTAGRAM_URL} target="_blank">
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
