// @flow

import Carousel, { CarouselProps, CarouselSlideRenderControlProps } from 'nuka-carousel';
import React, { PureComponent } from 'react';

import { PostType } from '@/types';
import Arrow from './Arrow';
import Slide, { CaptionStyle } from './Slide';

interface Props {
  posts: PostType[];
  isDesktop: boolean;
  captionStyle?: CaptionStyle;
}

const SPACE_BETWEEN_SLIDES = {
  MOBILE: 10,
  DESKTOP: 30
};

// tslint:disable-next-line:no-empty
const EMPTY_FN = () => {};
const CONFIG_LG: CarouselProps = {
  slidesToShow: 3,
  slidesToScroll: 3,
  wrapAround: true,
  heightMode: 'first',
  renderBottomCenterControls: EMPTY_FN as any,
  renderCenterLeftControls: (props: CarouselSlideRenderControlProps) => (
    <Arrow dir="prev" {...props} />
  ),
  renderCenterRightControls: (props: CarouselSlideRenderControlProps) => (
    <Arrow dir="next" {...props} />
  ),
  cellSpacing: SPACE_BETWEEN_SLIDES.DESKTOP
};
const CONFIG_SM: CarouselProps = {
  frameOverflow: 'visible',
  slidesToShow: 1,
  slidesToScroll: 1,
  wrapAround: true,
  heightMode: 'first',
  renderBottomCenterControls: EMPTY_FN as any,
  renderCenterLeftControls: EMPTY_FN as any,
  renderCenterRightControls: EMPTY_FN as any,
  cellSpacing: SPACE_BETWEEN_SLIDES.MOBILE
};

class Instagram extends PureComponent<Props> {
  public render() {
    const { posts, isDesktop, captionStyle } = this.props;

    return (
      posts && (
        <Carousel {...(isDesktop ? CONFIG_LG : CONFIG_SM)}>
          {posts.map(({ id, ...post }, index: number) => (
            <Slide
              key={`slide-${index}`}
              captionStyle={captionStyle}
              isDesktop={isDesktop}
              {...post}
            />
          ))}
        </Carousel>
      )
    );
  }
}

export default Instagram;
