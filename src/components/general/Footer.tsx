// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/primitives';
import { Responsive } from '@/components/utils';

import {
  BREAKPOINTS,
  FOOTER_HEIGHT,
  HOME_LINK,
  PBH_NETWORK_LINKS,
  SECTION_SPACERS,
  SECTION_SPACING_VARIANTS,
  SOCIAL_LINKS_REDUCED
} from '@/constants';

interface Props {}

class Footer extends PureComponent<Props> {
  public vwStyles = (isDesktop: boolean) => ({
    spacerTop: {
      marginTop: 15
    },
    hPadding: {
      paddingHorizontal: isDesktop ? 30 : 8
    },
    siteLinkSize: {
      fontSize: isDesktop ? 12.5 : 10
    },
    socialLinkSize: {
      fontSize: isDesktop ? 16 : 13
    }
  });

  public render() {
    return (
      <Responsive>
        {({ minWidth }) => {
          const isDesktop = minWidth(BREAKPOINTS.LG);
          const { spacerTop, hPadding, siteLinkSize, socialLinkSize } = this.vwStyles(isDesktop);

          return (
            <>
              <View style={[styles.wrap, spacerTop]}>
                <View style={styles.linkList}>
                  {PBH_NETWORK_LINKS.map(({ href, text }) => (
                    <Text
                      key={text}
                      href={href}
                      style={[styles.text, hPadding, siteLinkSize]}
                      accessibilityRole="link"
                    >
                      {text.toUpperCase()}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={isDesktop ? [styles.desktopBottomPadding] : []}>
                <Text style={styles.text}>
                  <p>
PO Box 24091
                    <br />
Brooklyn, NY 11202-4091
                  </p>
                </Text>
              </View>
            </>
          );
        }}
      </Responsive>
    );
  }
}

export default Footer;

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    minHeight: FOOTER_HEIGHT,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  linkList: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 12.5,
    letterSpacing: 1,
    fontWeight: '400'
  },
  desktopBottomPadding: {
    width: '100%',
    height: 90,
    backgroundColor: 'black',
    textAlign: 'center',
  }
});
