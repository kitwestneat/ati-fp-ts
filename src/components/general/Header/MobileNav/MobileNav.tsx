import React, { PureComponent } from 'react';

import MobileNavBar from './MobileNavBar';
import DrawerAnimationToggle from './DrawerAnimationToggle';
import MobileNavDrawer from './MobileNavDrawer';

class MobileNav extends PureComponent {
  render() {
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
