// @flow

import React, { PureComponent } from 'react';
import PageSections from '@/PageFactory';
import { AppWrap, Header, Footer, Main } from '@/components/general';
import { startAds } from '@/components/ads/ad-utils';
import { Section } from '@/components/primitives';

import { SECTION_SPACING_VARIANTS } from '@/constants/index';

import { InfoBox } from '@/components/modules';

type Props = {
  data?: any;
  tagData: any;
};

class TagPage extends PureComponent<Props> {
  componentDidMount() {
    startAds();
  }

  render() {
    const { data, tagData } = this.props;

    if (!data) {
      throw new Error('cannot load post data');
    }

    return (
      <AppWrap>
        <Header />
        <Main>
            <Section>
                <InfoBox data={tagData} />
            </Section>

            <Section topSpacing={SECTION_SPACING_VARIANTS.LARGE}>
                <PageSections data={data} />
            </Section>
        
            <Footer />
        </Main>
      </AppWrap>
    );
  }
}

export default TagPage;
