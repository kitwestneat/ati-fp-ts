// @flow

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import { ModuleTitle } from '@/components/modules';
import { Leaderboard, MobileMrec } from '@/components/ads';

import { Row, View } from '@/components/primitives';

import { SECTION_SPACERS, SECTION_SPACING_VARIANTS } from '@/constants';

type Props = {
  patternColor: string;
  title: string;
  link: string;
  isDesktop: boolean;
};

class TitleRow extends PureComponent<Props> {
  renderMobile = () => {
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
  renderDesktop = () => {
    return (
      <View style={styles.titleRow}>
        <View style={styles.titleWrap}>{this.renderTitle()}</View>

        <View style={{ flexShrink: 0 }}>
          <Leaderboard />
        </View>
      </View>
    );
  };

  renderTitle = () => {
    const { link, title, patternColor } = this.props;
    // XXX should moduletitle get isDesktop?
    return (
      <View style={{ width: '100%' }} accessibilityRole="link" href={link}>
        <ModuleTitle
          title={title}
          patternColor={patternColor}
          style={{ minHeight: 110, justifyContent: 'center' }}
        />
      </View>
    );
  };
  render() {
    const { isDesktop } = this.props;
    return isDesktop ? this.renderDesktop() : this.renderMobile();
  }
}

export default TitleRow;

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
