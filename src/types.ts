import { SECTION_TYPES } from '@/constants';

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
