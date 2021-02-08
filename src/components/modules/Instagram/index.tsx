import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import BetweenModuleAd from '../shared/BetweenModuleAd';
import Carousel from './Carousel';
import InstagramButton from './InstagramButton';
import Title from './Title';
import { ModuleBox } from '@/components/modules';
import { Container } from '@/components/primitives';

import { Responsive } from '@/components/utils';
import { ATI_INSTAGRAM_URL, BREAKPOINTS, COLOR_MAP, HU_INSTAGRAM_URL } from '@/constants/index';
import { PostType } from '@/types';

interface Props {
  posts: PostType[];
  isHU?: boolean;
}

export default class Instagram extends PureComponent<Props> {
  public render() {
    const { posts = [], isHU = false } = this.props;

    const themeColor = isHU ? COLOR_MAP.RED : COLOR_MAP.VERMILION;

    const url = isHU ? HU_INSTAGRAM_URL : ATI_INSTAGRAM_URL;

    const captionStyle = isHU ? 'black-on-white' : 'white-on-black';

    if (!posts || !posts.length) {
      console.error('No Instagram posts defined.');

      return null;
    }

    return (
            <>
                <BetweenModuleAd />
                <Responsive>
                  {({ minWidth }) => {
                    const isDesktop = minWidth(BREAKPOINTS.LG);
                    return (
                      <Container type='content'>
                        <ModuleBox style={styles.moduleBox}>
                          <View
                            style={[
                              styles.row,
                              isHU && !isDesktop ? {} : { paddingHorizontal: 30 }
                            ]}
                          >
                            <View>
                              <Title
                                isHU={isHU}
                                hashColor={themeColor}
                                isDesktop={isDesktop}
                                href={url}
                              />
                            </View>
                            <View>
                              <InstagramButton color={themeColor} url={url} />
                            </View>
                          </View>

                          <View style={{ paddingHorizontal: 30 }}>
                            <Carousel
                              isDesktop={isDesktop}
                              posts={posts}
                              captionStyle={captionStyle}
                            />
                          </View>
                        </ModuleBox>
                      </Container>
                    );
                  }}
                </Responsive>
            </>
    );
  }
}

const styles = StyleSheet.create({
  moduleBox: {
    paddingHorizontal: 75,
    paddingVertical: 45
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30
  }
});
