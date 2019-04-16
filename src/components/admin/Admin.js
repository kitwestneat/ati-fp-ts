import React, { PureComponent } from "react";
import PageSections from "PageFactory";
import { ActivityIndicator, Button, Text, View } from "react-native";
import { FaCheck, FaSave } from "react-icons/fa";

import FloatingActionButton from "./FloatingActionButton";
import { ResponsiveProvider } from "@/components/utils";
import { generateFakeData } from "./admin-utils";
import ModuleListCtl from "./ModuleListCtl";
import { getListWithKeys, saveList } from "./module-list-utils";

const SAVING_STATES = {
  NOT_SAVING: 0,
  SAVING: 1,
  SAVED: 2,
};

export default class Admin extends PureComponent {
  constructor(props) {
    super(props);

    window.disableLazyLoad = true;
    const moduleList = getListWithKeys(this.props.moduleList);

    // load initial data from props, but ignore after
    this.state = {
      moduleList,
      isPreview: false,
      savingState: SAVING_STATES.NOT_SAVING,
    };
  }

  updateModuleList = ({ moduleList }) => this.setState({ moduleList });
  saveModuleList = async () => {
    console.log("saving");

    this.setState({ savingState: SAVING_STATES.SAVING });
    await saveList(this.state.moduleList);
    this.setState({ savingState: SAVING_STATES.SAVED });
    setTimeout(
      () => this.setState({ savingState: SAVING_STATES.NOT_SAVING }),
      2000,
    );

    console.log("done");
  };

  render() {
    const { moduleList, isPreview, savingState } = this.state;

    const data = moduleList.map(generateFakeData);

    return (
      <View>
        <Button
          onPress={() => this.setState({ isPreview: !isPreview })}
          title={isPreview ? "Close" : "Preview"}
        />
        {!isPreview ? (
          <ModuleListCtl
            moduleList={moduleList}
            updateModuleList={this.updateModuleList}
          />
        ) : (
          <View>
            <ResponsiveProvider>
              <PageSections data={data} />
            </ResponsiveProvider>
          </View>
        )}
        <FloatingActionButton
          onPress={this.saveModuleList}
          icon={<FaSave color="white" />}
          index={0}
          disabled={savingState != SAVING_STATES.NOT_SAVING}
        />
        {savingState != SAVING_STATES.NOT_SAVING && (
          <View
            style={{
              height: 56,
              width: 125,
              bottom: 20,
              left: 0,
              right: 0,
              marginLeft: "auto",
              marginRight: "auto",
              position: "fixed",
              backgroundColor: "#F0FFE6",
              borderColor: "#708064",
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {savingState == SAVING_STATES.SAVING && (
              <>
                <ActivityIndicator size="large" />
                <Text>Saving...</Text>
              </>
            )}
            {savingState == SAVING_STATES.SAVED && (
              <>
                <FaCheck />
                <Text>Saved.</Text>
              </>
            )}
          </View>
        )}
      </View>
    );
  }
}
