import React from 'react';
import { IconType } from 'react-icons/lib/cjs/iconBase';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/primitives';

interface LinkProp {
    text: string;
    href: string;
    iconComponent?: IconType;
};

interface Props {
  links: LinkProp[];
}

function makeSocialLink({ text, href, iconComponent: Icon }: LinkProp): JSX.Element {
    const makeIconLink = () => (
        <View key={text} style={styles.linkItem}>
          <Text accessibilityRole="link" href={href}>
            {Icon && <Icon fill="white" />}
          </Text>
        </View>
      );

    if (Icon) {
        return makeIconLink();
    }

    return (<View key={text} style={styles.linkItem}>
                <Text accessibilityRole="link"
                      style={styles.textLinkItem}
                      href={href}>
                    {text}
                </Text>
            </View>);
}


const SocialLinks = ({ links }: Props) => {
  return (
    <View style={[styles.tagLinks]}>
      {links.map(makeSocialLink)}
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
  },
  textLinkItem: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    borderRadius: 5,
  },
});
