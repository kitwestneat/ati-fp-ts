// @flow

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import { Leaderboard, MobileMrec } from '@/components/ads';
import { ModuleTitle } from '@/components/modules';

import { Row, View } from '@/components/primitives';

import { SECTION_SPACERS, SECTION_SPACING_VARIANTS } from '@/constants';

interface Props {
  patternColor: string;
  title: string;
  link: string;
  isDesktop: boolean;
  onLayout?: any;
}

class TitleRow extends PureComponent<Props> {

  public renderMobile = () => {
    const showPattern = false;
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
          {this.renderTitle(showPattern)}
        </Row>
      </>
    );
  };

  public renderDesktop = () => {
    return (
      <View style={styles.titleRow}>
        <View style={{ alignItems: 'center'}}>
          <Leaderboard />
        </View>

        <View style={styles.titleWrap}>{this.renderTitle()}</View>
      </View>
    );
  };

  public renderTitle = (showPattern?: boolean) => {
    const { link, title, patternColor , onLayout } = this.props;
    return (
      <View style={{ alignItems: 'flex-start', width: '300px' }} accessibilityRole="link" href={link} >
        <ModuleTitle
          title={title}
          showPattern={showPattern}
          patternColor={patternColor}
          backgroundColor={'transparent'}
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

export default TitleRow;

const styles = StyleSheet.create({
  titleRow: {
    zIndex: 20,
  },
  titleWrap: {
    marginTop: 60,
  }
});
