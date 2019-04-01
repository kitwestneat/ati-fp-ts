import React, { PureComponent } from "react";
import PageSections from "PageFactory";
import { Button, View } from "react-native";

import { ResponsiveProvider } from "components/utils";
import { generateFakeData } from "./admin-utils";
import ModuleListCtl from "./ModuleListCtl";
import { getListWithKeys } from "./module-list-utils";

export default class Admin extends PureComponent {
  constructor(props) {
    super(props);

    window.disableLazyLoad = true;
    const moduleList = getListWithKeys(this.props.moduleList);

    // load initial data from props, but ignore after
    this.state = { moduleList, isPreview: false };
  }

  updateModuleList = ({ moduleList }) => this.setState({ moduleList });

  render() {
    const { moduleList, isPreview } = this.state;

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
      </View>
    );
  }
}
