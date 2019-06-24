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
  SECTION_SPACING,
  SOCIAL_LINKS_REDUCED
} from '@/constants';

interface Props {}

class Footer extends PureComponent<Props> {
  public renderHomeLink = () => {
    return (
      <View style={styles.linkList}>
        <Text
          accessibilityRole="link"
          style={[styles.text, { paddingHorizontal: 30 }]}
          href={HOME_LINK.href}
        >
          {HOME_LINK.text.toUpperCase()}
        </Text>
      </View>
    );
  };

  public vwStyles = (isDesktop: boolean) => ({
    spacerTop: {
      marginTop: SECTION_SPACING[isDesktop ? 'LG' : 'SM']
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
            <View style={[styles.wrap, spacerTop]}>
              {isDesktop && this.renderHomeLink()}

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

              <View style={styles.linkList}>
                {SOCIAL_LINKS_REDUCED.map(({ text, href, iconComponent: SocialIcon }) => (
                  <Text
                    key={text}
                    href={href}
                    style={[styles.text, hPadding, socialLinkSize]}
                    accessibilityRole="link"
                  >
                    <SocialIcon />
                  </Text>
                ))}
              </View>
            </View>
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
    height: FOOTER_HEIGHT,
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
  }
});
