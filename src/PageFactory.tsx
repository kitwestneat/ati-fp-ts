import {
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

import { SECTION_SPACING_VARIANTS, SECTION_TYPES, SMALL_SECTIONS } from '@/constants';
import { ModuleData } from './types';

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
  [SECTION_TYPES.TRENDING]: Trending,
  [SECTION_TYPES.TAG_OVERLAP_TITLE]: TagPostsOverlapTitle,
  [SECTION_TYPES.PREV_NEXT_BUTTONS]: PrevNextButtons
};

interface Props {
  data: ModuleData[];
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
              <Module {...item} />
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
