// @flow

import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import LazyView from "../utils/LazyView";

import { getMinAdDimensions, registerAd, displayAd } from "./ad-utils";
import { isDevEnv } from "../../utils";

type Props = {
  style?: RNW$Styles,
};

const MakeAdComponent = adType => {
  const minDimensionsForType = getMinAdDimensions(adType);

  return class Ad extends PureComponent<Props> {
    static defaultProps = {
      style: {},
    };

    state = {};

    render() {
      const { style } = this.props;
      const { adId } = this.state;
      const emptyAdStyle = adId ? {} : styles.adPlaceholder;
      if (adId) {
        setTimeout(() => displayAd(adId));
      }

      return (
        <LazyView
          lazyLoader={() => this.setState({ adId: registerAd(adType) })}
          style={[minDimensionsForType, emptyAdStyle, style]}
        >
          <div id={adId} type={adType} />
          {!adId && isDevEnv() && <div>{adType}</div>}
        </LazyView>
      );
    }
  };
};

export default MakeAdComponent;

const styles = StyleSheet.create({
  adPlaceholder: {
    backgroundColor: "#ebebeb",
    borderColor: "#ddd",
    borderWidth: 1,
  },
});
