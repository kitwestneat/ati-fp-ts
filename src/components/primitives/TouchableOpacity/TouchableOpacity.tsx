import { Omit, WebViewStyle } from '@/types';
import React, { ComponentType, PureComponent } from 'react';
import {
  StyleProp,
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps
} from 'react-native';

interface Props extends Omit<TouchableOpacityProps, 'style'> {
  style?: StyleProp<WebViewStyle>;
}

export default class TouchableOpacity extends PureComponent<Props> {
  public render() {
    const RNWTouchableOpacity = (RNTouchableOpacity as any) as ComponentType<Props>;

    return <RNWTouchableOpacity {...this.props} />;
  }
}
