// @flow

import { Skybox } from '@/components/ads';
import { startAds } from '@/components/ads/ad-utils';
import { AppWrap, Footer, Header, Main } from '@/components/general';
import { Section } from '@/components/primitives';
import PageSections from '@/PageFactory';
import React, { PureComponent } from 'react';

import { SECTION_SPACING_VARIANTS } from '@/constants/index';

interface Props {
  data: any;
}

class TagPage extends PureComponent<Props> {
  public componentDidMount() {
    startAds();
  }

  public render() {
    const { data } = this.props;

    const tagPageData = data.filter((el: any) => {
      const excludedTypes = ['recent', 'tagTileBox', 'instagram', 'newsletter'];
      return !excludedTypes.includes(el.type);
    });

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

          <Section topSpacing={SECTION_SPACING_VARIANTS.LARGE}>
              <PageSections data={tagPageData} />
          </Section>
      
          <Footer />
        </Main>
      </AppWrap>
    );
  }
}

export default TagPage;
