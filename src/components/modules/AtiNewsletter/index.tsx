// @flow

import React, { PureComponent } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

import { Container, Image } from '@/components/primitives';
import { Responsive } from '@/components/utils';

import { BREAKPOINTS } from '@/constants';

import DesktopBackground from '@/assets/images/ati-newsletter-desktop-bg.jpg';
import MobileBackground from '@/assets/images/ati-newsletter-desktop-bg.jpg'; // XXX
import Planet from '@/assets/images/ati-newsletter-planet.png';
import Callout from '../shared/SignUpForm/Callout';
import SignUpForm from '../shared/SignUpForm/SignUpForm';

class AtiNewsletter extends PureComponent {
  public render() {
    return (
      <Responsive>
        {({ width }) => {
          const isDesktop = width > BREAKPOINTS.MD;

          const copy = {
            headline: 'See The World You Weren\'t Meant To See',
            subheadline: isDesktop
              ? 'Join the All That\'s Interesting newsletter and see the world like never before.'
              : 'Join the All That\'s Interesting newsletter.'
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
                  { height: '100%' },
                  isDesktop
                    ? styles.container
                    : { paddingVertical: 30, width: 448, maxWidth: '100%' }
                ]}
              >
                <View style={styles.column}>
                  <SignUpForm>
                    <Callout copy={copy} styles={calloutStyles} />
                  </SignUpForm>
                </View>
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
                      <Image resizeMode="contain" source={{ uri: Planet }} />
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
