// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';

import { Container, Image } from '@/components/primitives';
import { Responsive } from '@/components/utils';

import SignUpForm from './SignUpForm';

import { BREAKPOINTS, COLOR_MAP } from '@/constants/index';

import NewsletterImage from '@/assets/images/newsletter.png';

interface Props {}
class Newsletter extends PureComponent<Props> {
  public render() {
    return (
      <Responsive>
        {({ width }) => {
          return (
            <View style={styles.wrap}>
              <Container
                type="content"
                style={[
                  width > BREAKPOINTS.MD
                    ? styles.container
                    : { paddingVertical: 30, width: 448, maxWidth: '100%' }
                ]}
              >
                <View
                  style={[
                    styles.column,
                    width > BREAKPOINTS.MD
                      ? {
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                          paddingTop: '5%'
                        }
                      : { alignItems: 'center' }
                  ]}
                >
                  <View style={styles.imageWrap}>
                    <Image
                      width={332}
                      height={260}
                      resizeMode="contain"
                      source={{ uri: NewsletterImage }}
                    />
                  </View>
                </View>
                <View style={styles.column}>
                  <SignUpForm />
                </View>
              </Container>
            </View>
          );
        }}
      </Responsive>
    );
  }
}

export default Newsletter;

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: COLOR_MAP.BLUE,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  imageWrap: {
    maxWidth: 332,
    width: '100%'
  },
  column: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center'
  }
});
