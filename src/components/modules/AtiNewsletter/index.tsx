// @flow

import React, { PureComponent } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';

import { Container } from '@/components/primitives';
import { Responsive } from '@/components/utils';

import { BREAKPOINTS } from '@/constants';

import DesktopBackground from '@/assets/images/ati-newsletter-desktop-bg.jpg';
import MobileBackground from '@/assets/images/ati-newsletter-mobile-bg.jpg';
import Planet from '@/assets/images/ati-newsletter-planet.png';
import Callout from '../shared/SignUpForm/Callout';
import SignUpForm from '../shared/SignUpForm/SignUpForm';

class AtiNewsletter extends PureComponent {
  public render() {
    return (
      <Responsive>
        {({ width }) => {
          const isDesktop = width >= BREAKPOINTS.LG;
          const isTablet = width >= BREAKPOINTS.MD && width < BREAKPOINTS.LG;

          const copy = {
            headline: 'See The World You Weren\'t Meant To See',

            subheadline: isTablet || isDesktop
              ? 'Join the All That\'s Interesting newsletter and see the world like never before.'
              : 'Join the All That\'s Interesting newsletter.'
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
              source={{ uri: isTablet || isDesktop ? DesktopBackground : MobileBackground }}
            >
              <Container
                type="content"
                style={[
                  { height: '100%' },
                  isTablet || isDesktop
                    ? styles.container
                    : { paddingVertical: 60, width: 448, maxWidth: '100%' }
                ]}
              >
                <View
                  style={[styles.column, isDesktop ? styles.signupDesktop : isTablet ? styles.signUpTablet : styles.signupMobile]}
                >
                  <View>
                    <SignUpForm moreStyles={calloutStyles.emailInput}>
                      <Callout copy={copy} styles={calloutStyles} />
                    </SignUpForm>
                  </View>
                </View>
                {(isTablet || isDesktop) && (
                  <View
                    style={[
                      styles.column,
                      isTablet || isDesktop
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
                        source={{ uri: Planet }}
                        style={{ position: 'absolute', top: -10, bottom: 20, left: 0, right: 0 }}
                      />
                    </View>
                  </View>
                )}
              </Container>
            </ImageBackground>
          );
        }}
      </Responsive>
    );
  }
}

export default AtiNewsletter;

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
  signUpTablet: {
    paddingVertical: 50,
    paddingLeft: 75
  },
  signupDesktop: {
    paddingVertical: 50,
    paddingLeft: 200
  }
});
