import {
  AtiNewsletter,
  HistoryNewsletter,
  InfoBox,
  Instagram,
  MostRecent,
  Newsletter,
  PrevNextButtons,
  RecentAndTrending,
  SplitTagBox,
  TagPostsOverlapTitle,
  TagPostsSingleColumn,
  Trending
} from '@/components/modules';
import { Section } from '@/components/primitives';
import React, { Fragment, PureComponent } from 'react';

import { Responsive } from '@/components/utils';
import { BREAKPOINTS, SECTION_SPACING_VARIANTS, SECTION_TYPES, SMALL_SECTIONS } from '@/constants';
import { ModuleData, PostType, ShowAuthorNameType } from './types';

interface ComponentMap {
  [t: string]: React.ElementType;
}

export const SECTION_TYPE_COMPONENT_MAP: ComponentMap = {
  [SECTION_TYPES.TAG]: InfoBox,
  [SECTION_TYPES.RECENT_AND_TRENDING]: RecentAndTrending,
  [SECTION_TYPES.SPLIT_TAG_BOX]: SplitTagBox,
  [SECTION_TYPES.RECENT]: MostRecent,
  [SECTION_TYPES.TAG_TILE_BOX]: TagPostsSingleColumn,
  [SECTION_TYPES.INSTAGRAM]: Instagram,
  [SECTION_TYPES.NEWSLETTER]: Newsletter,
  [SECTION_TYPES.HISTORY_NEWSLETTER]: HistoryNewsletter,
  [SECTION_TYPES.ATI_NEWSLETTER]: AtiNewsletter,
  [SECTION_TYPES.TRENDING]: Trending,
  [SECTION_TYPES.TAG_OVERLAP_TITLE]: TagPostsOverlapTitle,
  [SECTION_TYPES.PREV_NEXT_BUTTONS]: PrevNextButtons
};

interface Props {
  data: ModuleData[];
}

function filterAuthorName({
  posts,
  isDesktop,
  showAuthorName = 'never'
}: {
  posts: PostType[];
  isDesktop: boolean;
  showAuthorName?: ShowAuthorNameType;
}) {
  const shouldFilter =
    showAuthorName === 'never' ||
    (isDesktop && showAuthorName === 'mobile') ||
    (!isDesktop && showAuthorName === 'desktop');

  const newPosts =
    posts && shouldFilter ? posts.map(({ authorName, ...post }: any) => post) : posts;

  return newPosts;
}

class PageSections extends PureComponent<Props> {
  public render() {
    const { data } = this.props;
    return (
      <Fragment>
        {data.map((item, index) => {
          const spacingVariant = getSpacingVariant(item, index);

          const Module = getSectionComponentBySectionType(item.type);

          return (
            <Section key={index + item.type} topSpacing={spacingVariant}>
              <Responsive>
                {({ minWidth }) => {
                  const isDesktop = minWidth(BREAKPOINTS.LG);
                  const isTablet = minWidth(BREAKPOINTS.MD);

                  const moduleData = item as any;
                  const { posts, showAuthorName, ...rest } = moduleData;

                  const newPosts = filterAuthorName({ posts, showAuthorName, isDesktop });

                  return (
                    <Module {...rest} posts={newPosts} isDesktop={isDesktop} isTablet={isTablet} />
                  );
                }}
              </Responsive>
            </Section>
          );
        })}
      </Fragment>
    );
  }
}

export default PageSections;

export const isSmallType = ({ type }: ModuleData): boolean => SMALL_SECTIONS.includes(type);

export const getSpacingVariant = (currentSection: ModuleData, index: number) => {
  if (index === 0 || isSmallType(currentSection)) {
    return SECTION_SPACING_VARIANTS.SMALL;
  }

  return SECTION_SPACING_VARIANTS.LARGE;
};

export const getSectionComponentBySectionType = (sectionType: SECTION_TYPES) =>
  SECTION_TYPE_COMPONENT_MAP[sectionType];
