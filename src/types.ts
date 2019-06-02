import { SECTION_TYPES } from '@/constants';
import { ViewStyle } from 'react-native';

export enum OFFSET_DIRECTION {
  LEFT = 'left',
  RIGHT = 'right'
}

export interface PostType {
  id: number;
  title: string;
  imageSrc: string;
  link: string;
  categoryName: string;
  categoryColor: string;
}

export interface ModuleData {
  type: SECTION_TYPES;
}

export interface RecentModuleData extends ModuleData {
  type: SECTION_TYPES.RECENT;
  posts: PostType[];
}

export interface TagTileBoxModuleData extends ModuleData {
  type: SECTION_TYPES.TAG_TILE_BOX;
  posts: PostType[];

  sectionLink: string;
  sectionColor: string;
  sectionTitle: string;
  order?: 1 | 2;
}

export interface NewsletterModuleData extends ModuleData {
  type: SECTION_TYPES.NEWSLETTER;
}

export interface InstagramModuleData extends ModuleData {
  type: SECTION_TYPES.INSTAGRAM;
  posts: PostType[];
}

export interface TrendingModuleData extends ModuleData {
  type: SECTION_TYPES.TRENDING;

  sectionLink: string;
  sectionColor: string;
  sectionTitle: string;
}

export interface InfoBoxData extends ModuleData {
  type: SECTION_TYPES.TAG;
  name: string;
  imageSrc: string;
  description: string;
  paginate?: boolean;
}

export interface SplitTagBoxData extends ModuleData {
  type: SECTION_TYPES.SPLIT_TAG_BOX,
  // order: GridOrder;
  sectionTitle: string;
  sectionLink: string;
  sectionColor: string;
  split?: string;
  posts: PostType[];
}

export type AllModuleDataTypes =
  | TrendingModuleData
  | NewsletterModuleData
  | TagTileBoxModuleData
  | RecentModuleData
  | InstagramModuleData;

export type ModuleOptsSpec = Omit<AllModuleDataTypes, 'posts'>;
export interface QuerySpec {
  posts_per_page?: number;
}

export interface ModuleSpec {
  module_opts: ModuleOptsSpec;
  query?: QuerySpec;
}

export type GridOrder = 1 | 2 | 3;

export interface WebAccessibilityProps {
  accessibilityRole?: 'link' | 'heading' | 'button';

  // link
  href?: string;
  target?: string;

  // heading
  'aria-level'?: string;

  // button
  onClick?: () => void;
}

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface WebViewStyle extends Omit<ViewStyle, 'transform'> {
  boxShadow?: string;
  transform?: {
    translateX?: string | number;
    translateY?: string | number;
  }[];
}
