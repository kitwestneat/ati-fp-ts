// @flow

import { Image, Text, View } from '@/components/primitives';
import React, { PureComponent } from 'react';
import { StyleSheet, TextStyle } from 'react-native';

const SLIDE_SIZE = 306;
const TEXTBOX_PADDING = {
  VERTICAL: 15,
  HORIZONTAL: 20
};
const TEXTBOX_HEIGHT = 110;

const FONT = {
  WOB: {
    MOBILE: {
      fontSize: 18,
      lineHeight: 20
    },
    DESKTOP: {
      fontSize: 20,
      lineHeight: 26
    }
  },
  BOW: {
    MOBILE: {
      fontSize: 16,
      lineHeight: 20
    },
    DESKTOP: {
      fontSize: 16,
      lineHeight: 20
    }
  }
};

export type CaptionStyle = 'black-on-white' | 'white-on-black';

interface Props {
  imageSrc: string;
  title: string;
  link: string;
  isDesktop: boolean;
  captionStyle?: CaptionStyle;
}

class InstagramSlide extends PureComponent<Props> {
  public render() {
    const { imageSrc, title, link, isDesktop, captionStyle = 'white-on-black' } = this.props;

    const isWob = captionStyle === 'white-on-black';

    const textColorStyle: TextStyle = isWob ? styles.wobText : styles.bowText;

    const fontDeviceKey = isDesktop ? 'DESKTOP' : 'MOBILE';
    const fontStyleKey = isWob ? 'WOB' : 'BOW';
    const fontStyles = FONT[fontStyleKey][fontDeviceKey];

    const textBoxStyle = isWob ? styles.wobTextBox : styles.bowTextBox;
    const lineCount = isWob ? 3 : 5;
    return (
      <View style={[styles.wrap]} accessibilityRole="link" href={link}>
        <Image
          style={styles.image}
          source={{
            uri: imageSrc
          }}
        />

        <View style={textBoxStyle}>
          <Text numberOfLines={lineCount} style={[textColorStyle, fontStyles]}>
            {title}
          </Text>
        </View>
      </View>
    );
  }
}

export default InstagramSlide;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 3,
    alignSelf: 'flex-start'
  },
  image: {
    height: SLIDE_SIZE,
    width: SLIDE_SIZE
  },
  wobTextBox: {
    backgroundColor: 'black',
    paddingVertical: TEXTBOX_PADDING.VERTICAL,
    paddingHorizontal: TEXTBOX_PADDING.HORIZONTAL,
    width: '100%',
    height: TEXTBOX_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bowTextBox: {
    backgroundColor: '#f7f7f7',
    paddingVertical: TEXTBOX_PADDING.VERTICAL,
    paddingHorizontal: TEXTBOX_PADDING.HORIZONTAL,
    width: '90%',
    marginTop: -15,
    marginHorizontal: 'auto',
    height: TEXTBOX_HEIGHT + 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wobText: {
    color: 'white',
    fontStyle: 'italic',
    fontWeight: '100'
  },
  bowText: {
    color: 'black',
    fontStyle: 'normal',
    fontWeight: '600'
  }
});
