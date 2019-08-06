import { ModuleBox } from '@/components/modules';
import { Container } from '@/components/primitives';
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Carousel from './Carousel';
import InstagramButton from './InstagramButton';
import Title from './Title';

import { Responsive } from '@/components/utils';
import { BREAKPOINTS } from '@/constants/index';
import { PostType } from '@/types';
import BetweenModuleAd from '../shared/BetweenModuleAd';

interface Props {
  posts: PostType[];
}

export default class Instagram extends PureComponent<Props> {
  public render() {
    const { posts } = this.props;

    return (
      <>
        <BetweenModuleAd />
        <Responsive>
          {({ minWidth }) => {
            const isDesktop = minWidth(BREAKPOINTS.LG);
            return (
              <Container type="content">
                <ModuleBox style={styles.moduleBox}>
                  <View style={styles.row}>
                    <View>
                      <Title isDesktop={isDesktop} />
                    </View>
                    <View>
                      <InstagramButton />
                    </View>
                  </View>

                  <Carousel isDesktop={isDesktop} posts={posts} />
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
