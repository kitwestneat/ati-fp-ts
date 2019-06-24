import React, { PureComponent } from 'react';

import DrawerAnimationToggle from './DrawerAnimationToggle';
import MobileNavBar from './MobileNavBar';
import MobileNavDrawer from './MobileNavDrawer';

class MobileNav extends PureComponent {
  public render() {
    return (
      <DrawerAnimationToggle>
        {({ toggleDrawer, isDrawerOpen, drawerAnimation }) => {
          return (
            <>
              <MobileNavBar onMenuButtonClick={toggleDrawer} />
              <MobileNavDrawer
                toggleDrawer={toggleDrawer}
                isDrawerOpen={isDrawerOpen}
                drawerAnimation={drawerAnimation}
              />
            </>
          );
        }}
      </DrawerAnimationToggle>
    );
  }
}

export default MobileNav;
