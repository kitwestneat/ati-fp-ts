import React, { PureComponent, Fragment } from 'react';
import {
  MostRecent,
  TagPostsSingleColumn,
  Instagram,
  Newsletter,
  Trending
} from '@/components/modules';
import { ResponsiveSuperLeaderboard } from '@/components/ads';
import { Section } from '@/components/primitives';

import { SECTION_TYPES, SMALL_SECTIONS, SECTION_SPACING_VARIANTS } from '@/constants';
import { ModuleData } from './types';

interface ComponentMap {
  [t: string]: React.ReactNode;
}

export const SECTION_TYPE_COMPONENT_MAP: ComponentMap = {
  [SECTION_TYPES.AD]: ResponsiveSuperLeaderboard,
  [SECTION_TYPES.RECENT]: MostRecent,
  [SECTION_TYPES.TAG_TILE_BOX]: TagPostsSingleColumn,
  [SECTION_TYPES.INSTAGRAM]: Instagram,
  [SECTION_TYPES.NEWSLETTER]: Newsletter,
  [SECTION_TYPES.TRENDING]: Trending
};

interface Props {
  data: ModuleData[];
}

class PageSections extends PureComponent<Props> {
  render() {
    const { data } = this.props;
    return (
      <Fragment>
        {data.map((item, index, array) => {
          const spacingVariant = getSequenceAwareSpacingVariant(item, index, array);

          // XXX maybe give Module a real type
          const Module: any = getSectionComponentNameBySectionType(item.type);

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

export const getSequenceAwareSpacingVariant = (
  currentSection: ModuleData,
  index: number,
  array: ModuleData[]
) => {
  if (index === 0) {
    return SECTION_SPACING_VARIANTS.SMALL;
  }

  const prevSection: ModuleData | null = index === 0 ? null : array[index - 1];

  return isSmallType(currentSection) || (prevSection && isSmallType(prevSection))
    ? SECTION_SPACING_VARIANTS.SMALL
    : SECTION_SPACING_VARIANTS.LARGE;
};

export const getSectionComponentNameBySectionType = (sectionType: SECTION_TYPES) =>
  SECTION_TYPE_COMPONENT_MAP[sectionType];
