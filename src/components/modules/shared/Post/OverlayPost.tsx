// @flow

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import { PostImage, PostLabel } from '@/components/modules';
import { Text, View } from '@/components/primitives';
import { WebAccessibilityProps, WebViewStyle } from '@/types';
import { PostType } from '@/types';

export interface OverlayPostProps extends PostType {
  layoutVariant: 'overlay';

  style: WebViewStyle;
  bottomOverlap: number;
  center: boolean;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  isDesktop: boolean;
  fontStyles: any;
  containerPadding: string;
  title: string;
  categoryName: string;
  categoryColor: string;
  numberOfLines: number;
  link: string;
  showLabel?: boolean;
}

class OverlayPost extends PureComponent<OverlayPostProps> {
  public static defaultProps = {
    center: false,
    isDesktop: false,
    bottomOverlap: 0,
    showLabel: false
  };

  public render() {
    const {
      numberOfLines,
      fontStyles,
      containerPadding,
      title,
      authorName,
      categoryName,
      categoryColor,
      bottomOverlap,
      imageSrc,
      imageWidth,
      imageHeight,
      isDesktop,
      link,
      center,
      showLabel
    } = this.props;

    const localFontStyles = isDesktop
      ? { fontSize: 34, lineHeight: 39 }
      : { fontSize: 20, lineHeight: 24 };

    const labelWrapPosition = getLabelWrapPositionStyles(center);
    const linkProps: WebAccessibilityProps = link ? { accessibilityRole: 'link', href: link } : {};
    const mobilePadding = isDesktop ? {} : { padding: 20, paddingBottom: 10 };

    return (
      <View {...linkProps}>
        <PostImage contrastOverlay width={imageWidth} height={imageHeight} imageSrc={imageSrc} />

        <View
          style={[
            styles.detailsWrap,
            mobilePadding,
            {
              bottom: bottomOverlap,
              paddingHorizontal: containerPadding ? containerPadding : 25
            }
          ]}
        >
          <View style={styles.detailsInner}>
            <View style={[styles.labelWrap, labelWrapPosition]}>
              {showLabel && (
                <PostLabel fill categoryColor={categoryColor} categoryName={categoryName} />
              )}
            </View>
            <View>
              <Text
                numberOfLines={numberOfLines}
                style={[
                  styles.titleText,
                  localFontStyles,
                  fontStyles,
                  center && { textAlign: 'center' }
                ]}
                html={title}
              />
            </View>
            {authorName && (
              <View>
                <Text
                  numberOfLines={1}
                  style={[
                    localFontStyles,
                    fontStyles,
                    center && { textAlign: 'center' },
                    styles.authorText
                  ]}
                >
                  {'By ' + authorName}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default OverlayPost;

const styles = StyleSheet.create({
  postBox: {
    width: '100%',
    position: 'relative',
    zIndex: 5
  },
  titleText: {
    color: 'white',
    fontWeight: '600'
  },
  authorText: {
    color: '#CCCCCC',
    fontSize: 15
  },
  detailsWrap: {
    position: 'absolute',
    width: '100%',
    left: 0,
    padding: 25
  },
  detailsInner: {
    position: 'relative'
  },
  labelWrap: {
    position: 'absolute',
    top: -8
  }
});

const getLabelWrapPositionStyles = (center: boolean) =>
  center
    ? {
        left: '50%',
        transform: [
          {
            translateY: '-100%'
          },
          {
            translateX: '-50%'
          }
        ]
      }
    : {
        left: 0,
        transform: [
          {
            translateY: '-100%'
          }
        ]
      };
