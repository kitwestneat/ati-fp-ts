// @flow

import React, { PureComponent } from 'react';

import { ModuleBox } from '@/components/modules';
import { Text } from '@/components/primitives';
import { COLOR_MAP } from '@/constants';
import { ViewStyle } from 'react-native';

interface Props {
  children?: string;
  showPattern?: boolean;
  patternColor: string;
  backgroundColor?: string;
  style: ViewStyle;
  title: string;
  isDesktop?: boolean;
  onLayout?: any;
}

class ModuleTitle extends PureComponent<Props> {
  public static defaultProps = {
    showPattern: true,
    color: COLOR_MAP.TEXT_COLOR
  };

  public getBorderTop = () => ({
    borderTopColor: this.props.patternColor,
    borderTopWidth: 2
  });

  public getTextStyles = () => {
    const { isDesktop } = this.props;
    return isDesktop ? { fontSize: 40, lineHeight: 44 } : { fontSize: 38, lineHeight: 36 };
  };

  public render() {
    const { showPattern, patternColor, backgroundColor, style, children, title, onLayout } = this.props;
    return (
      <ModuleBox patternColor={showPattern ? patternColor : ''} backgroundColor={backgroundColor} style={[this.getBorderTop(), style]} onLayout={onLayout}>
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
