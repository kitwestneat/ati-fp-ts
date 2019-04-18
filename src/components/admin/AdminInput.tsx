import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

interface Props {
  label: string;
  input: React.ReactElement;
}

export default React.memo(function renderInput({ label, input }: Props) {
  return (
    <View style={styles.formRow}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>{input}</View>
    </View>
  );
});
