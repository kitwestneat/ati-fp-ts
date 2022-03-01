import {
  FaFacebookF,
  FaEnvelope,
  FaPodcast,
} from 'react-icons/fa';

export const SOCIAL_TYPES = {
  FACEBOOK: 'facebook',
  PODCAST: 'podcast',
  NEWSLETTER: 'newsletter',
};

export const SOCIAL_MAP = {
  [SOCIAL_TYPES.FACEBOOK]: {
    href: 'https://www.facebook.com/allthatsinteresting',
    text: 'Facebook',
    iconComponent: FaFacebookF,
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
  SOCIAL_MAP[SOCIAL_TYPES.FACEBOOK],
  SOCIAL_MAP[SOCIAL_TYPES.NEWSLETTER],
];

export const SOCIAL_LINKS_STANDARD = [
  SOCIAL_MAP[SOCIAL_TYPES.FACEBOOK],
  SOCIAL_MAP[SOCIAL_TYPES.PODCAST],
  SOCIAL_MAP[SOCIAL_TYPES.NEWSLETTER],
];
