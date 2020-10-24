// @flow

import React, { PureComponent } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';

import { Container } from '@/components/primitives';
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
              lineHeight: 25,
              fontSize: 25
            },
            subheadline: {
              marginTop: 15,
              lineHeight: 23,
              fontSize: 20
            }, 
            emailInput: {
              marginTop: 25
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
                  { height: '100%' },
                  isDesktop
                    ? styles.container
                    : { paddingVertical: 60, width: 448, maxWidth: '100%' }
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
                      <Image
                        resizeMode="contain"
                        source={{ uri: Rasputin }}
                        style={{ position: 'absolute', top: -30, bottom: 0, left: 0, right: 0 }}
                      />
                    </View>
                  </View>
                )}
                <View
                  style={[styles.column, isDesktop ? styles.signupDesktop : styles.signupMobile]}
                >
                  <View>
                    <SignUpForm moreStyles={calloutStyles.emailInput}>
                      <Callout copy={copy} styles={calloutStyles} />
                    </SignUpForm>
                  </View>
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
    flexWrap: 'nowrap',
    padding: 0
  },
  imageWrap: {
    marginTop: -30,
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  column: {
    flex: 1,
    justifyContent: 'center'
  },
  signupMobile: {
    paddingRight: 80,
    paddingLeft: 35,
    paddingVertical: 20
  },
  signupDesktop: {
    paddingVertical: 50,
    paddingRight: 200
  }
});
