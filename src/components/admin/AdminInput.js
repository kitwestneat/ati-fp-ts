import React from "react";
import { Text, View } from "react-native";

import * as styles from "./styles";

export default React.memo(function renderInput({ label, input }) {
  return (
    <View style={styles.formRow}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>{input}</View>
    </View>
  );
});
