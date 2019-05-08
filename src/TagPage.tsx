// @flow

import React, { PureComponent } from 'react';
//import PageSections from '@/PageFactory';
import { AppWrap, Header, Footer, Main } from '@/components/general';
import { Skybox, Floorboard } from '@/components/ads';
import { startAds } from '@/components/ads/ad-utils';
import { Section } from '@/components/primitives';

import { SECTION_SPACING_VARIANTS } from '@/constants/index';

import { InfoBox } from '@/components/modules';

type Props = {
  data: any;
};

class TagPage extends PureComponent<Props> {
  componentDidMount() {
    startAds();
  }

  render() {
    const { data } = this.props;

    if (!data) {
      throw new Error('cannot load post data');
    }

    return (
      <AppWrap>
        <Header />
        <Main>
            <Section>
                <InfoBox data={data} />
            </Section>

            {/* <Section topSpacing={SECTION_SPACING_VARIANTS.LARGE}>
                <Floorboard />
            </Section> */}
        </Main>
        <Footer />
      </AppWrap>
    );
  }
}

export default TagPage;
