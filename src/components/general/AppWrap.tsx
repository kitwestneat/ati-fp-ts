// @flow

import React, { PureComponent } from 'react';

import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { ResponsiveProvider } from '@/components/utils';
import { COLOR_MAP } from '@/constants/index';

interface Props {
  children: React.ReactElement[];
}
class AppWrap extends PureComponent<Props> {
  public render() {
    return (
      <ResponsiveProvider>
        <SafeAreaView style={styles.root}>
          <StatusBar backgroundColor={'black'} barStyle="light-content" />

          <KeyboardAvoidingView style={styles.keyboardAvoidWrap} behavior="padding">
            {this.props.children}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ResponsiveProvider>
    );
  }
}

export default AppWrap;

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLOR_MAP.SITE_BG,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: Platform.OS === 'web' ? '100vh' : '100%',
    width: '100%'
  },
  keyboardAvoidWrap: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});
