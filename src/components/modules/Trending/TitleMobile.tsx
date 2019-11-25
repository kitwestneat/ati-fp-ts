// @flow

import React, { PureComponent } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import TrendingLine from '@/assets/images/trending-line.svg';
import { Pattern } from '@/components/modules';
import { Ratio, Row, Text } from '@/components/primitives';
import { TITLE_FONT_SIZE } from '@/constants';

interface Props {
  patternColor: string;
  title: string;
  sectionLink: string;
  showIcon?: boolean;
}

interface LinkProps {
  accessibilityRole?: 'link';
  href?: string;
}

class TitleMobile extends PureComponent<Props> {
  public render() {
    const { patternColor, sectionLink, title, showIcon = true } = this.props;
    const linkProps: LinkProps = sectionLink
      ? { accessibilityRole: 'link', href: sectionLink }
      : {};

    return (
      <View {...linkProps}>
        <Pattern color={patternColor}>
          <Ratio ratio="3:1">
            <View
              style={[
                styles.colorBackground,
                {
                  paddingBottom: 30,
                  paddingLeft: 15,
                  paddingRight: 15,
                  backgroundColor: patternColor
                }
              ]}
            >
              <Row style={{ marginTop: 20, flexDirection: 'row' }}>
                <Text accessibilityRole="heading" aria-level="2" style={[styles.text, { flex: 3 }]}>
                  {title}
                </Text>
                {showIcon && (
                  <Image
                    style={{
                      width: 45,
                      height: 27,
                      flex: 1,
                      resizeMode: 'contain',
                      margin: 'auto'
                    }}
                    source={{ uri: TrendingLine }}
                  />
                )}
              </Row>
            </View>
          </Ratio>
        </Pattern>
      </View>
    );
  }
}

export default TitleMobile;

const styles = StyleSheet.create({
  colorBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  text: {
    lineHeight: TITLE_FONT_SIZE,
    fontSize: TITLE_FONT_SIZE,
    color: 'white',
    fontWeight: '600'
  }
});
