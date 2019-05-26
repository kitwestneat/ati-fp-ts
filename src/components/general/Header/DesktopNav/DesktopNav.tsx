import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/primitives';
import { NavBar, SocialLinks, Logo } from '../NavBar';
import { TAG_LINKS, SOCIAL_LINKS_STANDARD } from '@/constants';

interface Links {
  type: string;
  text: string;
  href: string;
}

export default class DesktopNav extends PureComponent {
  render() {
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
