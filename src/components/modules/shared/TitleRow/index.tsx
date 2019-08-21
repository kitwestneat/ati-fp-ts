import * as React from 'react';
import TitleRowNoAd from './TitleRowNoAd';
import TitleRowWithAd from './TitleRowWithAd';

export interface TitleRowProps {
  patternColor: string;
  title: string;
  link: string;
  isDesktop: boolean;
  onLayout?: any;
}

interface Props extends TitleRowProps {
  withAd: boolean;
}

export default class TitleRow extends React.PureComponent<Props> {
  public render() {
    const { withAd, ...rest } = this.props;

    return withAd ? <TitleRowWithAd {...rest} /> : <TitleRowNoAd {...rest} />;
  }
}
