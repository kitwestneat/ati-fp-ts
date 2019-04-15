import {
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
  StyleProp
} from 'react-native';
import React, { PureComponent, ComponentType } from 'react';
import { Omit, WebViewStyle } from '@/types';

interface Props extends Omit<TouchableOpacityProps, 'style'> {
  style?: StyleProp<WebViewStyle>;
}

export default class TouchableOpacity extends PureComponent<Props> {
  render() {
    const RNWTouchableOpacity = (RNTouchableOpacity as any) as ComponentType<Props>;

    return <RNWTouchableOpacity {...this.props} />;
  }
}
