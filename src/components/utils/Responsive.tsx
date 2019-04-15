// @flow

import React, { PureComponent, createContext, ReactNode } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

const { Provider, Consumer } = createContext<ResponsiveChildProps>({
  width: 0,
  height: 0,
  minWidth: () => true,
  maxWidth: () => true
});

type Coordinate = [number, number];
type GetSlope = [Coordinate, Coordinate];
type Slope = { slope: number };
type GetIntercept = { point: Coordinate } & Slope;
type FluidSizeType = {
  min: number;
  max: number;
  lockMin?: number;
  lockMax?: number;
};
type Props = {
  children: ReactNode;
};

interface ResponsiveChildProps {
  width: number;
  height: number;
  minWidth: (breakpoint: number) => boolean;
  maxWidth: (breakpoint: number) => boolean;
}

export class ResponsiveProvider extends PureComponent<Props, ScaledSize> {
  state: ScaledSize = Dimensions.get('window');

  componentWillMount() {
    Dimensions.addEventListener('change', this.handler);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handler);
  }

  handler = ({ window: windowDims }: { window: ScaledSize }) => {
    return this.setState(windowDims);
  };

  minWidth = (breakpoint: number) => breakpoint <= this.state.width;
  maxWidth = (breakpoint: number) => breakpoint > this.state.width;

  getSlope = ([[x1, y1], [x2, y2]]: GetSlope) => (y2 - y1) / (x2 - x1);
  getIntercept = ({ point: [x, y], slope }: GetIntercept) => y - slope * x;
  makeLockFunc = () => {
    const { width } = this.state;

    return ({ min: y1, max: y2, lockMin: x1 = 400, lockMax: x2 = 1000 }: FluidSizeType) => {
      const slope = this.getSlope([[x1, y1], [x2, y2]]);
      const intercept = this.getIntercept({ point: [x1, y1], slope });

      return width < x1 ? y1 : width >= x2 ? y2 : slope * width + intercept;
    };
  };

  render() {
    const { width, height } = this.state;

    return (
      <Provider
        value={{
          width,
          height,
          minWidth: this.minWidth,
          maxWidth: this.maxWidth
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default ({ children }: { children: (dimProps: ResponsiveChildProps) => ReactNode }) => {
  return <Consumer>{(dimProps: ResponsiveChildProps) => children(dimProps)}</Consumer>;
};
