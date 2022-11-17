import {
  FaEnvelope,
  FaPodcast,
} from 'react-icons/fa';

export const SOCIAL_TYPES = {
  PODCAST: 'podcast',
  NEWSLETTER: 'newsletter',
  MEMBERS: 'members',
};

export const SOCIAL_MAP = {
  [SOCIAL_TYPES.MEMBERS]: {
    href: '/membership-page',
    text: 'Members',
  },
  [SOCIAL_TYPES.PODCAST]: {
    href: 'https://allthatsinteresting.com/history-uncovered',
    text: 'Podcast',
    iconComponent: FaPodcast,
  },
  [SOCIAL_TYPES.NEWSLETTER]: {
    href: 'https://allthatsinteresting.com/signup/',
    text: 'Newsletter',
    iconComponent: FaEnvelope,
  },
};

export const SOCIAL_LINKS_REDUCED = [
  SOCIAL_MAP[SOCIAL_TYPES.NEWSLETTER],
];

export const SOCIAL_LINKS_STANDARD = [
  SOCIAL_MAP[SOCIAL_TYPES.MEMBERS],
  SOCIAL_MAP[SOCIAL_TYPES.PODCAST],
  SOCIAL_MAP[SOCIAL_TYPES.NEWSLETTER],
];
