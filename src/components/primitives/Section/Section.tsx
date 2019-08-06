// @flow

import React, { PureComponent } from 'react';

import { Row } from '@/components/primitives';

import { Responsive } from '@/components/utils';
import { BREAKPOINTS, SECTION_SPACERS, SECTION_SPACING_VARIANTS } from '@/constants/index';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  topSpacing: SECTION_SPACING_VARIANTS;
  style?: StyleProp<ViewStyle>;
}

class Section extends PureComponent<Props> {
  public static defaultProps = {
    topSpacing: SECTION_SPACING_VARIANTS.SMALL
  };

  public render() {
    const { children, style, topSpacing } = this.props;

    return (
      <Responsive>
        {({ minWidth }) => {
          const isDesktop = minWidth(BREAKPOINTS.LG);
          const spacing = isDesktop
            ? SECTION_SPACERS[topSpacing]
            : SECTION_SPACERS[SECTION_SPACING_VARIANTS.SMALL];
          const halfSpacing = Math.floor(spacing / 2);
          return (
            <Row
              style={[{ alignItems: 'center', marginTop: halfSpacing, marginBottom: 15 }, style]}
            >
              {children}
            </Row>
          );
        }}
      </Responsive>
    );
  }
}

export default Section;
