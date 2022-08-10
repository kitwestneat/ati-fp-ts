import React, { PureComponent, ReactNode } from 'react';
import {
  FaUser,
} from 'react-icons/fa';
import { Text } from '@/components/primitives';
import { StyleSheet, View } from 'react-native';
import DrawerScaffolding from './DrawerScaffolding';

import { BUG_REPORT_STRING, SOCIAL_LINKS_STANDARD, TAG_LINKS } from '@/constants';

interface Props {
  isDrawerOpen: boolean;
  toggleDrawer: any;
  drawerAnimation: any;
}

export default class DrawerContents extends PureComponent<Props> {
  public render() {
    const { isDrawerOpen, toggleDrawer, drawerAnimation } = this.props;

    return (
      <DrawerScaffolding
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        drawerAnimation={drawerAnimation}
      >
        <DrawerInner>
          <View>
            <LinkGroup>
              {TAG_LINKS.map(({ type, href, text }) => (
                <View key={type} style={styles.linkItem}>
                  <Text style={styles.tagText} accessibilityRole="link" href={href}>
                    {text}
                  </Text>
                </View>
              ))}
            </LinkGroup>

            <Line />

            <LinkGroup>
              {SOCIAL_LINKS_STANDARD.map(({ href, text, iconComponent: SocialIcon }) => (
                <View key={text} style={styles.linkItem}>
                  <View style={styles.icon}>
                    {SocialIcon
                        ? <SocialIcon size={21} />
                        : <FaUser size={21} />}
                  </View>
                  <Text style={styles.tagText} accessibilityRole="link" href={href}>
                    {text}
                  </Text>
                </View>
              ))}

              <AdReportLink />
            </LinkGroup>
          </View>
        </DrawerInner>
      </DrawerScaffolding>
    );
  }
}

const styles = StyleSheet.create({
  inner: {
    backgroundColor: 'white',
    padding: 25,
    flex: 1,
    justifyContent: 'space-between'
  },
  linkItem: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center'
  },
  linkGroup: {},
  tagText: {
    fontSize: 21
  },
  line: {
    width: 25,
    height: 1,
    backgroundColor: '#CCC',
    marginVertical: 25
  },
  icon: {
    marginRight: 21
  }
});

const Line = () => <View style={styles.line} />;

const LinkGroup = ({ children }: { children: ReactNode }) => (
  <View style={styles.linkGroup}>{children}</View>
);

const AdReportLink = () => (
  <View style={styles.linkItem}>
    <Text style={styles.tagText} accessibilityRole="link" href="/report-bad-ad">
      {BUG_REPORT_STRING}
    </Text>
  </View>
);

const DrawerInner = ({ children }: { children: ReactNode }) => (
  <View style={styles.inner}>{children}</View>
);
