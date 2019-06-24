import React, { PureComponent } from 'react';
import { Container } from '@/components/primitives';
import { Responsive } from '@/components/utils';
import { BREAKPOINTS } from '@/constants';
import { TagTileBoxModuleData, PostType, GridOrder } from '@/types';
import RecentPosts from './RecentPosts';
import TrendingPosts from './TrendingPosts';

interface Props extends TagTileBoxModuleData {
    recentPosts: PostType[];
    trendingPosts: PostType[];
    sectionLink: string;
    sectionColor: string;
    sectionTitle: string;
    order?: GridOrder;
    tag: string;
}

export default class RecentAndTrending extends PureComponent<Props> {
    render() {
        const {
            sectionColor,
            recentPosts: [mainPost, ...secondaryPosts],
            trendingPosts, 
            tag
        } = this.props;

        return (
            <Responsive>
            {({ minWidth }) => {
                const isDesktop = minWidth(BREAKPOINTS.LG);
                return (
                    <Container type='content' style={{flexDirection: isDesktop? 'row' : 'column', justifyContent: 'space-between'}}>
                        <RecentPosts 
                            isDesktop={isDesktop}
                            tag={tag}
                            mainPost={mainPost}
                            secondaryPosts={secondaryPosts}
                            sectionColor={sectionColor}
                        />
                        <TrendingPosts 
                            isDesktop={isDesktop}
                            tag={tag}
                            trendingPosts={trendingPosts}
                        />
                    </Container>
                  );
                }
            }
            </Responsive>
        );
    }
}