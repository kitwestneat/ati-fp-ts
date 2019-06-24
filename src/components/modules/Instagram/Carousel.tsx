// @flow

import Carousel, { CarouselProps, CarouselSlideRenderControlProps } from 'nuka-carousel';
import React, { PureComponent } from 'react';

import { PostType } from '@/types';
import Arrow from './Arrow';
import Slide from './Slide';

interface Props {
  posts: PostType[];
  isDesktop: boolean;
}

const SPACE_BETWEEN_SLIDES = {
  MOBILE: 10,
  DESKTOP: 30
};

const CONFIG_LG: CarouselProps = {
  slidesToShow: 3,
  slidesToScroll: 3,
  wrapAround: true,
  heightMode: 'first',
  renderBottomCenterControls: undefined,
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
  renderBottomCenterControls: undefined,
  renderCenterLeftControls: undefined,
  renderCenterRightControls: undefined,
  cellSpacing: SPACE_BETWEEN_SLIDES.MOBILE
};

class Instagram extends PureComponent<Props> {
  public render() {
    const { posts, isDesktop } = this.props;

    return (
      posts && (
        <Carousel {...(isDesktop ? CONFIG_LG : CONFIG_SM)}>
          {posts.map(({ id, ...post }, index: number) => (
            <Slide key={`slide-${index}`} isDesktop={isDesktop} {...post} />
          ))}
        </Carousel>
      )
    );
  }
}

export default Instagram;
