// @flow

import React, { PureComponent } from 'react';
import PageSections from '@/PageFactory';
import { AppWrap, Header, Footer, Main } from '@/components/general';
import { Skybox, Floorboard } from '@/components/ads';
import { startAds } from '@/components/ads/ad-utils';
import { Section } from '@/components/primitives';

import { SECTION_SPACING_VARIANTS } from '@/constants/index';

import { Route } from 'react-router-dom';
import TagPage from '@/TagPage';

type Props = {
  data: any;
};

class App extends PureComponent<Props> {
  componentDidMount() {
    startAds();
  }

  render() {
    const { data } = this.props;

    if (!data) {
      throw new Error('cannot load post data');
    }

    const homePageData = data.filter((el:any) => {
      const excludedTypes = ['tag', 'splitTagBox'];
      return !excludedTypes.includes(el.type);
    });

    return (
      <AppWrap>
        <Header />
        <Main>
          <Section>
            <Skybox />
          </Section>

          <PageSections data={homePageData} />

          <Section topSpacing={SECTION_SPACING_VARIANTS.LARGE}>
            <Floorboard />
          </Section>

          <Footer />
        </Main>

        <Route path='/tag/history' render={() => <TagPage {...this.props}/>} />
      </AppWrap>
    );
  }
}

export default App;
