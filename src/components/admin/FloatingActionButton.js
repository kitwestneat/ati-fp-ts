import React from "react";
import { Text, TouchableOpacity } from "react-native";

const styles = {
  fab: {
    position: "fixed",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "rgb(33, 150, 243)",
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 40,
    color: "white",
  },
};

export default React.memo(function FloatingActionButton({
  onPress,
  icon,
  index = 0,
  disabled = false,
}) {
  const inner = icon || <Text style={styles.fabIcon}>+</Text>;
  const bottom = 20 + 60 * index;

  return (
    <TouchableOpacity
      style={{ ...styles.fab, bottom }}
      onPress={onPress}
      disabled={disabled}
    >
      {inner}
    </TouchableOpacity>
  );
});
