import React, { PureComponent } from "react";
import { Button, Text, View, TouchableOpacity } from "react-native";

import { queryObj2Str } from "./admin-utils";

import * as styles from "./styles";

function renderSectionOptions(moduleOpts) {
  const { sectionLink, sectionColor, sectionTitle } = moduleOpts;
  return (
    <View>
      <Text>Section Title: {sectionTitle}</Text>
      <Text>Section Link: {sectionLink}</Text>
      <Text>
        Section Color: <Text>{sectionColor}</Text>
        <View
          style={{ width: "1em", backgroundColor: sectionColor, height: "1em" }}
        />
      </Text>
    </View>
  );
}

function renderModuleSpecificOpts(moduleOpts) {
  switch (moduleOpts.type) {
    default:
      console.error("Unknown module type:", moduleOpts.type);
      break;
    case "recent":
      break;
    case "instagram":
      break;
    case "newsletter":
      break;
    case "trending":
      return renderSectionOptions(moduleOpts);
    case "tagTileBox":
      const sectionOpts = renderSectionOptions(moduleOpts);
      const { order } = moduleOpts;

      return (
        <>
          {sectionOpts}
          <View>
            <Text>2x Box on Bottom?: {order === 2 ? "yes" : "no"}</Text>
          </View>
        </>
      );
  }

  return null;
}

export default class ModuleListItem extends PureComponent {
  render() {
    const {
      item,
      onOpenEditClick,
      onOpenDeleteClick,
      onMove,
      onMoveEnd,
    } = this.props;

    const { module_opts, query } = item;
    const { type } = module_opts;
    const moduleOptsBox = renderModuleSpecificOpts(module_opts);

    const handle = {
      borderLeftColor: module_opts.sectionColor || "#999",
      borderLeftWidth: 5,
      paddingLeft: 10,
      marginLeft: -5,
    };

    const showQuery = typeof query === "object";
    const queryStr = queryObj2Str(query);

    return (
      <TouchableOpacity
        style={styles.card}
        onPressIn={onMove}
        onPressOut={onMoveEnd}
      >
        <View style={handle}>
          <View>
            <Text>Type: {type}</Text>
          </View>
          {moduleOptsBox}
          {showQuery && (
            <View>
              <Text>Query: {queryStr}</Text>
            </View>
          )}
        </View>
        <View style={{ margin: "1rem", flexDirection: "row" }}>
          <View style={{ flexGrow: 1, margin: 5 }}>
            <Button title="EDIT" onPress={onOpenEditClick} />
          </View>
          <View style={{ flexGrow: 1, margin: 5 }}>
            <Button title="DELETE" onPress={onOpenDeleteClick} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
