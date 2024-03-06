import { Container, Row } from '@/components/primitives';
import { Responsive } from '@/components/utils';
import { BREAKPOINTS, SECTION_SPACERS, SECTION_SPACING_VARIANTS } from '@/constants';
import { GridOrder, PostType, RecentAndTrendingModuleData } from '@/types';
import React, { PureComponent } from 'react';
import BetweenModuleAd from '../shared/BetweenModuleAd';
import RecentPosts from './RecentPosts';
import TrendingPosts from './TrendingPosts';

interface Props extends RecentAndTrendingModuleData {
  recentPosts: PostType[];
  trendingPosts: PostType[];
  sectionLink: string;
  sectionColor: string;
  order?: GridOrder;
  tag: string;
}

export default class RecentAndTrending extends PureComponent<Props> {
  public render() {
    const {
      sectionColor,
      recentPosts,
      trendingPosts,
      tag
    } = this.props;

    return (
      <Responsive>
        {({ minWidth }) => {
          const isDesktop = minWidth(BREAKPOINTS.LG);

          let RecentPostsModule: any = null;
          if (recentPosts && recentPosts.length > 0) {
              const [mainPost, ...secondaryPosts] = recentPosts;
              RecentPostsModule = (<RecentPosts
                        isDesktop={isDesktop}
                        tag={tag}
                        mainPost={mainPost}
                        secondaryPosts={secondaryPosts}
                        sectionColor={sectionColor}
                      />);
          }

          return (
            <>
              <BetweenModuleAd />
              <Container
                type="content"
                style={{
                  flexDirection: isDesktop ? 'row' : 'column',
                  justifyContent: 'space-between'
                }}
              >
                {RecentPostsModule}
                {(trendingPosts && trendingPosts.length > 0)
                  ? <TrendingPosts isDesktop={isDesktop} tag={tag} trendingPosts={trendingPosts} />
                  : null}
              </Container>
            </>
          );
        }}
      </Responsive>
    );
  }
}
