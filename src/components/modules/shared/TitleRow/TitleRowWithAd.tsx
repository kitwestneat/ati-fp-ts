// @flow

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import { Leaderboard, MobileMrec } from '@/components/ads';
import { ModuleTitle } from '@/components/modules';

import { Row, View } from '@/components/primitives';

import { SECTION_SPACERS, SECTION_SPACING_VARIANTS } from '@/constants';
import { TitleRowProps } from '.';

class TitleRowWithAd extends PureComponent<TitleRowProps> {
  public renderMobile = () => {
    return (
      <>
        <Row style={{ alignItems: 'center' }}>
          <MobileMrec />
        </Row>
        <Row
          style={{
            marginTop: SECTION_SPACERS[SECTION_SPACING_VARIANTS.SMALL],
            alignItems: 'center',
            paddingHorizontal: 40
          }}
        >
          {this.renderTitle()}
        </Row>
      </>
    );
  };
  public renderDesktop = () => {
    return (
      <View style={styles.titleRow}>
        <View style={styles.titleWrap}>{this.renderTitle()}</View>

        <View style={{ flexShrink: 0 }}>
          <Leaderboard />
        </View>
      </View>
    );
  };

  public renderTitle = () => {
    const { link, title, isDesktop, patternColor, onLayout } = this.props;
    return (
      <View style={{ width: '100%' }} accessibilityRole="link" href={link}>
        <ModuleTitle
          isDesktop={isDesktop}
          title={title}
          patternColor={patternColor}
          style={{ minHeight: 110, justifyContent: 'center' }}
          onLayout={onLayout}
        />
      </View>
    );
  };
  public render() {
    const { isDesktop } = this.props;
    return isDesktop ? this.renderDesktop() : this.renderMobile();
  }
}

export default TitleRowWithAd;

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  titleWrap: {
    flexGrow: 1,
    flexShrink: 1,
    marginRight: 30
  }
});
