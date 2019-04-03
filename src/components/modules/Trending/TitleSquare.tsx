// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { Pattern } from '@/components/modules';
import { Ratio, Text, Row } from '@/components/primitives';
import TrendingLine from '@/assets/images/trending-line.svg';

type Props = {
  patternColor: string;
  title: string;
  sectionLink: string;
};

type LinkProps = {
  accessibilityRole?: 'link';
  href?: string;
};

class TitleSquare extends PureComponent<Props> {
  render() {
    const { patternColor, sectionLink, title } = this.props;
    const linkProps: LinkProps = sectionLink
      ? { accessibilityRole: 'link', href: sectionLink }
      : {};

    return (
      <View {...linkProps}>
        <Pattern color={patternColor}>
          <Ratio ratio='1:1'>
            <View style={[styles.colorBackground, { padding: 30, backgroundColor: patternColor }]}>
              <Row>
                <Image style={{ width: 45, height: 27 }} source={{ uri: TrendingLine }} />
              </Row>
              <Row style={{ marginTop: 20 }}>
                <Text style={styles.text}>{title}</Text>
              </Row>
            </View>
          </Ratio>
        </Pattern>
      </View>
    );
  }
}

export default TitleSquare;

const styles = StyleSheet.create({
  colorBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  text: {
    lineHeight: 37,
    fontSize: 40,
    color: 'white',
    fontWeight: '600'
  }
});
