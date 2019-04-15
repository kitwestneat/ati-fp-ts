import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { TouchableOpacity } from '@/components/primitives';

// see CarouselSlideRenderControlProps
interface Props {
  dir: 'prev' | 'next';
  currentSlide: number;
  slideCount: number;
  previousSlide(): void;
  nextSlide(): void;
}

export default class Arrow extends PureComponent<Props> {
  render() {
    const { dir, currentSlide, previousSlide, nextSlide, slideCount } = this.props;

    const isPrev = dir === 'prev';

    const handleClick = isPrev ? previousSlide : nextSlide;
    const disabled = (isPrev && currentSlide === 0) || (!isPrev && currentSlide === slideCount);

    const ArrowComponent = isPrev ? FaChevronLeft : FaChevronRight;

    return (
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.button,
          {
            transform: [
              {
                translateX: isPrev ? '-175%' : '175%'
              }
            ]
          }
        ]}
        onPress={handleClick}
      >
        <ArrowComponent style={{ color: 'white', width: '80%' }} />
      </TouchableOpacity>
    );
  }
}

const ARROW_SIZE = 30;

const styles = StyleSheet.create({
  button: {
    borderRadius: ARROW_SIZE / 2,
    backgroundColor: 'black',
    width: ARROW_SIZE,
    height: ARROW_SIZE,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
