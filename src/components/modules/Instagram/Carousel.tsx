// @flow

import React, { PureComponent } from 'react';
import Carousel, { CarouselSlideRenderControlProps, CarouselProps } from 'nuka-carousel';

import Arrow from './Arrow';
import Slide from './Slide';
import { PostType } from '@/types';

type Props = {
  posts: PostType[];
  isDesktop: boolean;
};

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
const EMPTY_FN = () => {};
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
  render() {
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
