import React from "react";
import { Button, Text, View } from "react-native";
import * as styles from "./styles";

import Modal from "modal-react-native-web";

export default React.memo(function ModuleDeleteDialog({
  onOk,
  onCancel,
  isVisible,
}) {
  return (
    <Modal transparent={true} visible={isVisible}>
      <View style={styles.centerItems}>
        <View style={styles.modalCard}>
          <Text>Confirm delete?</Text>
          <View style={{ flexDirection: "row", ...styles.centerItems }}>
            <View style={{ margin: "1rem" }}>
              <Button title="Ok" onPress={onOk} />
            </View>
            <View style={{ margin: "1rem" }}>
              <Button title="Cancel" color="#CCC" onPress={onCancel} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
});
