import React, { PureComponent } from 'react';
import { Responsive } from '@/components/utils';
import { BREAKPOINTS } from '@/constants/index';

interface Props {
  MobileAd: React.ComponentType;
  DesktopAd: React.ComponentType;
}

const MakeResponsiveAdComponent = ({ MobileAd, DesktopAd }: Props) =>
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
