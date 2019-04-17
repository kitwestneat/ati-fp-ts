// @flow

import React, { PureComponent } from 'react';

import { Text } from '@/components/primitives';
import { ModuleBox } from '@/components/modules';
import { COLOR_MAP } from '@/constants';
import { ViewStyle } from 'react-native';

type Props = {
  children?: string;
  patternColor: string;
  style: ViewStyle;
  title: string;
  isDesktop?: boolean;
};

class ModuleTitle extends PureComponent<Props> {
  static defaultProps = {
    color: COLOR_MAP.TEXT_COLOR
  };

  getBorderTop = () => ({
    borderTopColor: this.props.patternColor,
    borderTopWidth: 2
  });

  getTextStyles = () => {
    const { isDesktop } = this.props;
    return isDesktop ? { fontSize: 40, lineHeight: 44 } : { fontSize: 38, lineHeight: 36 };
  };

  render() {
    const { patternColor, style, children, title } = this.props;
    return (
      <ModuleBox patternColor={patternColor} style={[this.getBorderTop(), style]}>
        {children ? (
          children
        ) : (
          <Text
            accessibilityRole="heading"
            aria-level="2"
            serif
            style={[{ fontWeight: '600' }, this.getTextStyles()]}
          >
            {title}
          </Text>
        )}
      </ModuleBox>
    );
  }
}

export default ModuleTitle;
