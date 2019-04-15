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

export interface RecentModuleData {
  type: 'recent';
  posts: PostType[];
}

export interface TagTileBoxModuleData {
  type: 'tagTileBox';
  posts: PostType[];

  sectionLink: string;
  sectionColor: string;
  sectionTitle: string;
  order?: 1 | 2;
}

export interface NewsletterModuleData {
  type: 'newsletter';
}

export interface TrendingModuleData {
  type: 'trending';

  sectionLink: string;
  sectionColor: string;
  sectionTitle: string;
}

export type AllModuleDataTypes =
  | TrendingModuleData
  | NewsletterModuleData
  | TagTileBoxModuleData
  | RecentModuleData;

export type GridOrder = 1 | 2;

export interface LinkProps {
  accessibilityRole?: 'link';
  href?: string;
}

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface WebViewStyle extends Omit<ViewStyle, 'transform'> {
  boxShadow?: string;
  transform?: {
    translateX?: string | number;
    translateY?: string | number;
  }[];
}
