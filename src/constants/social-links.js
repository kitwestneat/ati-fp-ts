import {
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
  FaPinterest,
} from 'react-icons/fa';

export const SOCIAL_TYPES = {
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  PINTEREST: 'pinterest',
  NEWSLETTER: 'newsletter',
};

export const SOCIAL_MAP = {
  [SOCIAL_TYPES.FACEBOOK]: {
    href: 'https://www.facebook.com/allthatsinteresting',
    text: 'Facebook',
    iconComponent: FaFacebookF,
  },
  [SOCIAL_TYPES.TWITTER]: {
    href: 'https://twitter.com/' + (window.pbh_config_get('twitter_account') || 'AllThatsIntere1'),
    text: 'Twitter',
    iconComponent: FaTwitter,
  },
  [SOCIAL_TYPES.PINTEREST]: {
    href: 'https://www.pinterest.com/allthatisintere/',
    text: 'Pinterest',
    iconComponent: FaPinterest,
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
  SOCIAL_MAP[SOCIAL_TYPES.PINTEREST],
  SOCIAL_MAP[SOCIAL_TYPES.TWITTER],
  SOCIAL_MAP[SOCIAL_TYPES.NEWSLETTER],
];
