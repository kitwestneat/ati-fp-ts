// @flow

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import { ModuleTitle } from '@/components/modules';

import { Row, View } from '@/components/primitives';
import { TitleRowProps } from '.';

class TitleRowNoAd extends PureComponent<TitleRowProps> {
  public renderMobile = () => {
    const showPattern = false;
    return (
      <Row
        style={{
          alignItems: 'center',
          paddingHorizontal: 40
        }}
      >
        {this.renderTitle(showPattern)}
      </Row>
    );
  };

  public renderDesktop = () => {
    return <View style={styles.titleRow}>{this.renderTitle()}</View>;
  };

  public renderTitle = (showPattern?: boolean) => {
    const { link, title, patternColor, onLayout } = this.props;
    return (
      <View
        style={{ alignItems: 'flex-start', width: '300px' }}
        accessibilityRole="link"
        href={link}
      >
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

export default TitleRowNoAd;

const styles = StyleSheet.create({
  titleRow: {
    zIndex: 20
  }
});
