// @flow

import React, { PureComponent } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

import { Container, Image } from '@/components/primitives';
import { Responsive } from '@/components/utils';

import { BREAKPOINTS } from '@/constants';

import DesktopBackground from '@/assets/images/hu-newsletter-desktop-bg.jpg';
import MobileBackground from '@/assets/images/hu-newsletter-mobile-bg.jpg';
import Rasputin from '@/assets/images/hu-newsletter-rasputin.png';
import Callout from '../shared/SignUpForm/Callout';
import SignUpForm from '../shared/SignUpForm/SignUpForm';

class HistoryNewsletter extends PureComponent {
  public render() {
    return (
      <Responsive>
        {({ width }) => {
          const isDesktop = width > BREAKPOINTS.MD;

          const copy = {
            headline: 'Learn About The History They Don\'t Want You To Know',
            subheadline: isDesktop
              ? 'Join the History Uncovered newsletter, see history through a whole new lens.'
              : 'Join the History Uncovered newsletter.'
          };
          const calloutStyles = {
            headline: {
              lineHeight: 30
            },
            subheadline: {
              marginTop: 5,
              lineHeight: 20,
              fontSize: 20
            }
          };

          return (
            <ImageBackground
              style={styles.wrap}
              imageStyle={{ resizeMode: 'cover' }}
              source={{ uri: isDesktop ? DesktopBackground : MobileBackground }}
            >
              <Container
                type="content"
                style={[
                  isDesktop
                    ? styles.container
                    : { paddingVertical: 30, width: 448, maxWidth: '100%' }
                ]}
              >
                {isDesktop && (
                  <View
                    style={[
                      styles.column,
                      isDesktop
                        ? {
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end'
                          }
                        : { alignItems: 'center' }
                    ]}
                  >
                    <View style={styles.imageWrap}>
                      <Image resizeMode="contain" source={{ uri: Rasputin }} />
                    </View>
                  </View>
                )}
                <View style={styles.column}>
                  <SignUpForm>
                    <Callout copy={copy} styles={calloutStyles} />
                  </SignUpForm>
                </View>
              </Container>
            </ImageBackground>
          );
        }}
      </Responsive>
    );
  }
}

export default HistoryNewsletter;

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  imageWrap: {
    marginTop: -30,
    width: '100%',
    marginBottom: -10
  },
  column: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center'
  }
});
