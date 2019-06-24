// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';

import { Responsive } from '@/components/utils';

import DesktopNav from './DesktopNav/DesktopNav';
import MobileNav from './MobileNav/MobileNav';

import { BREAKPOINTS } from '@/constants';

const HEADER_Z_INDEX = 999;

interface Props {}

class Header extends PureComponent<Props> {
  public render() {
    return (
      <Responsive>
        {({ minWidth }) => {
          const isDesktop = minWidth(BREAKPOINTS.LG);

          return (
            <View style={[styles.headerWrap]}>{isDesktop ? <DesktopNav /> : <MobileNav />}</View>
          );
        }}
      </Responsive>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  headerWrap: {
    zIndex: HEADER_Z_INDEX
  }
});
