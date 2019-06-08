// @flow

import React, { PureComponent } from 'react';

import { Text } from '@/components/primitives';
import { ModuleBox } from '@/components/modules';
import { COLOR_MAP } from '@/constants';
import { ViewStyle } from 'react-native';

type Props = {
  children?: string;
  showPattern?: boolean;
  patternColor: string;
  style: ViewStyle;
  title: string;
  isDesktop?: boolean;
  onLayout?: any;
};

class ModuleTitle extends PureComponent<Props> {
  static defaultProps = {
    showPattern: true,
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
    const { showPattern, patternColor, style, children, title, onLayout } = this.props;
    return (
      <ModuleBox patternColor={showPattern ? patternColor : ''} style={[this.getBorderTop(), style]} onLayout={onLayout}>
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
