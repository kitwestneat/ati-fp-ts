// @flow

import React, { createContext, PureComponent, ReactNode } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

const { Provider, Consumer } = createContext<ResponsiveChildProps>({
  width: 0,
  height: 0,
  minWidth: () => true,
  maxWidth: () => true
});

type Coordinate = [number, number];
type GetSlope = [Coordinate, Coordinate];
interface Slope { slope: number; }
type GetIntercept = { point: Coordinate } & Slope;
interface FluidSizeType {
  min: number;
  max: number;
  lockMin?: number;
  lockMax?: number;
}
interface Props {
  children: ReactNode;
}

interface ResponsiveChildProps {
  width: number;
  height: number;
  minWidth: (breakpoint: number) => boolean;
  maxWidth: (breakpoint: number) => boolean;
}

export class ResponsiveProvider extends PureComponent<Props, ScaledSize> {
  public state: ScaledSize = Dimensions.get('window');

  public componentWillMount() {
    Dimensions.addEventListener('change', this.handler);
  }

  public componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handler);
  }

  public handler = ({ window: windowDims }: { window: ScaledSize }) => {
    return this.setState(windowDims);
  };

  public minWidth = (breakpoint: number) => breakpoint <= this.state.width;
  public maxWidth = (breakpoint: number) => breakpoint > this.state.width;

  public getSlope = ([[x1, y1], [x2, y2]]: GetSlope) => (y2 - y1) / (x2 - x1);
  public getIntercept = ({ point: [x, y], slope }: GetIntercept) => y - slope * x;
  public makeLockFunc = () => {
    const { width } = this.state;

    return ({ min: y1, max: y2, lockMin: x1 = 400, lockMax: x2 = 1000 }: FluidSizeType) => {
      const slope = this.getSlope([[x1, y1], [x2, y2]]);
      const intercept = this.getIntercept({ point: [x1, y1], slope });

      return width < x1 ? y1 : width >= x2 ? y2 : slope * width + intercept;
    };
  };

  public render() {
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
