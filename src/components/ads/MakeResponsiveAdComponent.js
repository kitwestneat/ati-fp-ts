import React, { PureComponent } from "react";
import { Responsive } from "components/utils";
import { BREAKPOINTS } from "constants/index";

const MakeResponsiveAdComponent = ({ MobileAd, DesktopAd }) =>
  class extends PureComponent {
    render() {
      const adBreakpoint = BREAKPOINTS.LG;
      return (
        <Responsive>
          {({ minWidth }) => {
            return minWidth(adBreakpoint) ? <DesktopAd /> : <MobileAd />;
          }}
        </Responsive>
      );
    }
  };

export default MakeResponsiveAdComponent;
