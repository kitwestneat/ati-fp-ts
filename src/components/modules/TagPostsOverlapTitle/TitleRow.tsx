// @flow

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import { ModuleTitle } from '@/components/modules';
import { Leaderboard, MobileMrec } from '@/components/ads';

import { Row, View, Container } from '@/components/primitives';

import { SECTION_SPACERS, SECTION_SPACING_VARIANTS } from '@/constants';

type Props = {
  patternColor: string;
  title: string;
  link: string;
  isDesktop: boolean;
  onLayout?: any;
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
        <View style={{ alignItems: 'center'}}>
          <Leaderboard />
        </View>

        <View style={styles.titleWrap}>{this.renderTitle()}</View>
      </View>
    );
  };

  renderTitle = () => {
    const { link, title, patternColor, isDesktop , onLayout } = this.props;
    // XXX should moduletitle get isDesktop?
    return (
      <View style={{ alignItems: 'flex-start' }} accessibilityRole="link" href={link} >
        <ModuleTitle
          title={title}
          patternColor={patternColor}
          style={{ minHeight: 110, justifyContent: 'center' }}
          onLayout={onLayout}
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
    width: '100%'
  },
  titleWrap: {
    marginTop: 60,
  }
});
