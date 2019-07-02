// @flow

import { Floorboard, Skybox } from '@/components/ads';
import { startAds } from '@/components/ads/ad-utils';
import { AppWrap, Footer, Header, Main } from '@/components/general';
import { Section } from '@/components/primitives';
import PageSections from '@/PageFactory';
import React, { PureComponent } from 'react';

import { SECTION_SPACING_VARIANTS } from '@/constants/index';

interface Props {
  data: any;
}

class App extends PureComponent<Props> {
  public componentDidMount() {
    startAds();
  }

  public render() {
    const { data } = this.props;

    if (!data) {
      throw new Error('cannot load post data');
    }

    return (
      <AppWrap>
        <Header />
        <Main>
          <Section>
            <Skybox />
          </Section>

          <PageSections data={data} />

          <Section topSpacing={SECTION_SPACING_VARIANTS.LARGE}>
            <Floorboard />
          </Section>

          <Footer />
        </Main>
      </AppWrap>
    );
  }
}

export default App;
