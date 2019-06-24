import { Text } from '@/components/primitives';
import { SOCIAL_LINKS_STANDARD, TAG_LINKS } from '@/constants';
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Logo, NavBar, SocialLinks } from '../NavBar';

interface Links {
  type: string;
  text: string;
  href: string;
}

export default class DesktopNav extends PureComponent {
  public render() {
    return (
      <NavBar
        renderRight={() => <Logo style={{ marginLeft: 15 }} />}
        renderCenter={() => <TagLinks links={TAG_LINKS} />}
        renderLeft={() => <SocialLinks links={SOCIAL_LINKS_STANDARD} />}
      />
    );
  }
}

const TagLinks = ({ links }: { links: Links[] }) => {
  return (
    <View style={[styles.tagLinks]}>
      {links.map(({ type, text, href }) => (
        <Text
          key={type}
          style={[styles.headerText, styles.linkItem]}
          accessibilityRole="link"
          href={href}
        >
          {text}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tagLinks: {
    flexDirection: 'row'
  },
  linkItem: {
    paddingHorizontal: 15,
    fontSize: 21
  },
  headerText: {
    color: 'white',
    fontWeight: '400'
  }
});
