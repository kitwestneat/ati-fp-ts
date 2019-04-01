// @flow

import React, { PureComponent } from "react";
import { StyleSheet, TextInput } from "react-native";

type Props = {
  value: string,
  onChangeText: (email: string) => void,
};

class EmailInput extends PureComponent<Props> {
  render() {
    const { value, onChangeText, onSubmit } = this.props;

    return (
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        textContentType="emailAddress"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
    );
  }
}

export default EmailInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    height: 55,
    padding: 10,
  },
});
