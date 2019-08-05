// @flow

import React, { PureComponent } from 'react';

import { ModuleBox } from '@/components/modules';
import { Text } from '@/components/primitives';
import { COLOR_MAP, TITLE_FONT_SIZE } from '@/constants';
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
    return { fontSize: TITLE_FONT_SIZE, lineHeight: TITLE_FONT_SIZE };
  };

  public render() {
    const {
      showPattern,
      patternColor,
      backgroundColor,
      style,
      children,
      title,
      onLayout
    } = this.props;
    return (
      <ModuleBox
        patternColor={showPattern ? patternColor : ''}
        backgroundColor={backgroundColor}
        style={[this.getBorderTop(), style]}
        onLayout={onLayout}
      >
        {children ? (
          children
        ) : (
          <Text
            accessibilityRole="heading"
            aria-level="2"
            serif
            style={[this.getTextStyles(), { fontWeight: '600' }]}
          >
            {title}
          </Text>
        )}
      </ModuleBox>
    );
  }
}

export default ModuleTitle;
