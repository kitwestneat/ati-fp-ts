import { SECTION_TYPES } from '@/constants';
import { ViewStyle } from 'react-native';

export enum OFFSET_DIRECTION {
  LEFT = 'left',
  RIGHT = 'right'
}

export interface PostType {
  id: number;
  title: string;
  authorName?: string;
  imageSrc: string;
  link: string;
  categoryName: string;
  categoryColor: string;
  isDesktop?: boolean;
}

export interface ModuleData {
  type: SECTION_TYPES;
}

export interface SectionData {
  sectionLink: string;
  sectionColor: string;
  sectionTitle: string;
  posts: PostType[];
}

export interface RecentModuleData extends ModuleData {
  type: SECTION_TYPES.RECENT;
  posts: PostType[];
}

export interface TagTileBoxModuleData extends ModuleData, SectionData {
  type: SECTION_TYPES.TAG_TILE_BOX;

  // Order?: 1 | 2;
  order?: GridOrder;
}

export interface NewsletterModuleData extends ModuleData {
  type: SECTION_TYPES.NEWSLETTER;
}

export interface InstagramModuleData extends ModuleData {
  type: SECTION_TYPES.INSTAGRAM;
  posts: PostType[];
}

export interface TrendingModuleData extends ModuleData, SectionData {
  type: SECTION_TYPES.TRENDING;
}

export interface InfoBoxData extends ModuleData {
  type: SECTION_TYPES.TAG;
  name: string;
  imageSrc: string;
  description: string;
  paginate?: boolean;
}

export interface SplitTagBoxData extends ModuleData, SectionData {
  type: SECTION_TYPES.SPLIT_TAG_BOX;
  split?: string;
}

export interface RecentAndTrendingModuleData extends ModuleData {
  type: SECTION_TYPES.RECENT_AND_TRENDING;
  recentPosts: PostType[];
  trendingPosts: PostType[];
  sectionLink: string;
  sectionColor: string;
  order?: GridOrder;
  tag: string;
}

export type AllModuleDataTypes =
  | TrendingModuleData
  | NewsletterModuleData
  | TagTileBoxModuleData
  | RecentModuleData
  | InstagramModuleData
  | SplitTagBoxData
  | InfoBoxData
  | RecentAndTrendingModuleData;

export type ModuleOptsSpec = Omit<AllModuleDataTypes, 'posts'>;
export interface QuerySpec {
  posts_per_page?: number;
}

export interface ModuleSpec {
  module_opts: ModuleOptsSpec;
  query?: QuerySpec;
}

export type GridOrder = 1 | 2 | 3 | 4;

export interface WebAccessibilityProps {
  accessibilityRole?: 'link' | 'heading' | 'button';

  // Link
  href?: string;
  target?: string;

  // Heading
  'aria-level'?: string;

  // Button
  onClick?: () => void;
}

export interface WebViewStyle extends Omit<ViewStyle, 'transform'> {
  boxShadow?: string;
  transform?: {
    translateX?: string | number;
    translateY?: string | number;
  }[];
}

export type ShowAuthorNameType = 'always' | 'never' | 'desktop' | 'mobile';
