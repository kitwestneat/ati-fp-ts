import React from "react";
import { TextInput } from "react-native";

import * as styles from "./styles";

export default React.memo(function AdminTextInput({ style, ...rest }) {
  return (
    <TextInput
      {...rest}
      style={{
        ...styles.adminTextInput,
        ...style,
      }}
    />
  );
});
