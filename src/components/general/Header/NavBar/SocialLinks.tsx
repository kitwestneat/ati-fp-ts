import React from 'react';
import { IconType } from 'react-icons/lib/cjs/iconBase';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/primitives';

interface Props {
  links: Array<{
    text: string;
    href: string;
    iconComponent: IconType;
  }>;
}

const SocialLinks = ({ links }: Props) => {
  return (
    <View style={[styles.tagLinks]}>
      {links.map(({ text, href, iconComponent: Icon }) => (
        <View key={text} style={styles.linkItem}>
          <Text accessibilityRole="link" href={href}>
            <Icon fill="white" />
          </Text>
        </View>
      ))}
    </View>
  );
};

export default SocialLinks;

const styles = StyleSheet.create({
  tagLinks: {
    flexDirection: 'row'
  },
  linkItem: {
    paddingHorizontal: 15
  }
});
