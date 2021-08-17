// @flow

import { PureComponent, ReactNode } from 'react';
import { Animated, Easing } from 'react-native';

// XXX
interface Props { children: (props: ChildProps) => ReactNode; }

interface State {
  drawerAnimation: any;
  isDrawerOpen: boolean;
  isAnimatingIn: boolean;
  isAnimatingOut: boolean;
}

interface ChildProps {
  drawerAnimation: Animated.Value;
  isDrawerOpen: boolean;
  toggleDrawer(): void;
}

class DrawerAnimationToggle extends PureComponent<Props, State> {
  public state: State = {
    drawerAnimation: new Animated.Value(0),
    isDrawerOpen: false,
    isAnimatingIn: false,
    isAnimatingOut: false
  };

  public toggleDrawer = () => {
    const { isAnimatingIn, isAnimatingOut, isDrawerOpen } = this.state;
    if (!isDrawerOpen || isAnimatingOut) {
      this.showDrawer();
    }

    if (isDrawerOpen || isAnimatingIn) {
      this.hideDrawer();
    }
  };

  public showDrawer = () => {
    const { drawerAnimation } = this.state;

    this.setState({ isDrawerOpen: true, isAnimatingIn: true }, () =>
      Animated.timing(drawerAnimation, {
        useNativeDriver: true,
        toValue: 1,
        duration: 250,
        easing: Easing.bezier(0.4, 0, 0.2, 1)
      }).start(() => this.setState({ isAnimatingIn: false }))
    );
  };

  public hideDrawer = () => {
    const { drawerAnimation } = this.state;

    this.setState({ isAnimatingOut: true }, () =>
      Animated.timing(drawerAnimation, {
        useNativeDriver: true,
        toValue: 0,
        duration: 250,
        easing: Easing.bezier(0.4, 0, 0.2, 1)
      }).start(() => this.setState({ isDrawerOpen: false, isAnimatingOut: false }))
    );
  };

  public render() {
    const { drawerAnimation, isDrawerOpen } = this.state;

    return this.props.children({
      drawerAnimation,
      isDrawerOpen,
      toggleDrawer: this.toggleDrawer
    });
  }
}
export default DrawerAnimationToggle;
