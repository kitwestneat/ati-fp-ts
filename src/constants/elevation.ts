import { WebViewStyle } from '@/types';
import { Platform, StyleProp } from 'react-native';

const penumbraOpacity = 0.14;
const umbraOpacity = 0.2;

interface ElevationsType {
  [t: string]: Array<StyleProp<WebViewStyle>>;
}

const ELEVATIONS: ElevationsType = {
  ios: [
    {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 0
    },
    {
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowRadius: 2,
      shadowOpacity: 0.5
    },
    {
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowRadius: 3,
      shadowOpacity: 0.5
    },
    {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 2
    },
    {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2
    }
  ],
  android: [
    {
      elevation: 0
    },
    {
      elevation: 1
    },
    {
      elevation: 2
    },
    {
      elevation: 3
    },
    {
      elevation: 4
    }
  ],
  web: [
    {
      boxShadow: `
        0 0px 0px 0px rgba(0, 0, 0, 0),
        0 0px 0px 0px rgba(0, 0, 0, 0)
      `
    },
    {
      boxShadow: `
        0 2px 2px 0px rgba(0, 0, 0, ${penumbraOpacity}),
        0 3px 1px -2px rgba(0, 0, 0, ${umbraOpacity})
  `
    },
    {
      boxShadow: `
        0 3px 4px 0px rgba(0, 0, 0, ${penumbraOpacity}),
        0 3px 3px -2px rgba(0, 0, 0, ${umbraOpacity})
      `
    },
    {
      boxShadow: `
      0 3px 4px 0px rgba(0, 0, 0, ${penumbraOpacity}),
      0 3px 3px -2px rgba(0, 0, 0, ${umbraOpacity})
    `
    },
    {
      boxShadow: `
      0 4px 5px 0px rgba(0, 0, 0, ${penumbraOpacity}),
      0 1px 10px -2px rgba(0, 0, 0, ${umbraOpacity})
    `
    }
  ]
};

// eslint-disable-next-line
export const elevation = (level: number) => ELEVATIONS[Platform.OS][level];
