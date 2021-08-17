// @flow

import React, { PureComponent } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { elevation, HEADER_HEIGHT } from '@/constants';

interface Props {
  isDrawerOpen: boolean;
  toggleDrawer: any;
  drawerAnimation: any;
  children: any;
}

class NavDrawer extends PureComponent<Props> {
  public render() {
    const { isDrawerOpen, toggleDrawer, drawerAnimation, children } = this.props;

    const drawerPosition = drawerAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['-100%', '0%']
    });

    const overlayOpacity = drawerAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    return (
      <>
        {isDrawerOpen && (
          <Animated.View
            onTouchStart={toggleDrawer}
            style={[styles.overlay, { opacity: overlayOpacity }]}
          />
        )}

        <Animated.View style={[styles.wrap, { transform: [{ translateX: drawerPosition }] }]}>
          {children}
        </Animated.View>
      </>
    );
  }
}
export default NavDrawer;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,.32)',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100%'
  },
  wrap: {
    ...(elevation(2) as object),
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100%',
    paddingTop: HEADER_HEIGHT
  }
});
