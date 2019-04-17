import React from 'react';
import { StyleSheet } from 'react-native';
import { FaBars } from 'react-icons/fa';

import { View } from '@/components/primitives';

const HamburgerIcon = ({ onClick }: { onClick: () => void }) => (
  <View accessibilityRole="button" onClick={onClick} style={styles.button}>
    <FaBars fill="white" />
  </View>
);

export default HamburgerIcon;

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: { color: 'white' }
});
