// @flow

import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Container } from '../../primitives';
import Post from './Post';
import { PostType } from '@/types';

interface Props {
  overlap: number;
  bottomOverlap: number;
  containerPadding: number;
  mainPost: PostType;
  mainPostProps?: any;
  titleOverlap?: boolean;
  titleWidth?: number;
  isDesktop?: boolean;
}
class OverlapScaffold extends PureComponent<Props> {
  public static defaultProps = {
    overlap: 0,
    bottomOverlap: 0,
    containerPadding: 0,
    titleOverlap: false,
    titleWidth: 0,
    isDesktop: false
  };

  public getMainPost = () => {
    const { mainPost, mainPostProps, bottomOverlap, containerPadding, isDesktop } = this.props;

    const props = {
      bottomOverlap,
      containerPadding,
      isDesktop,
      ...mainPost,
      ...mainPostProps
    };

    return <Post layoutVariant="overlay" {...props} />;
  };

  public renderMainPostView() {
    const { bottomOverlap, titleOverlap, titleWidth, isDesktop } = this.props;

    return (
      <View
        style={{
          zIndex: 10,
          flex: 1,
          flexShrink: 0,
          width: '100%',
          alignItems: titleOverlap && !isDesktop ? 'center' : 'flex-start',
          marginTop: titleOverlap ? -bottomOverlap * 2 : 0
        }}
      >
        {titleOverlap && !isDesktop && (
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'white',
              height: 30,
              width: titleWidth,
              zIndex: 10
            }}
          />
        )}
        {this.getMainPost()}
      </View>
    );
  }

  public render() {
    const { overlap, containerPadding, children } = this.props;

    const overlapPaddingView = (
      <Container
        style={{
          marginTop: -overlap,
          paddingHorizontal: containerPadding,
          zIndex: 10
        }}
        type="content"
      >
        <View
          style={{
            backgroundColor: 'white',
            height: overlap
          }}
        />
      </Container>
    );

    const childrenView = (
      <Container
        style={{
          marginTop: -overlap,
          paddingHorizontal: containerPadding,
          zIndex: 99
        }}
        type="content"
      >
        {children}
      </Container>
    );

    return (
      <>
        {this.renderMainPostView()}
        {overlapPaddingView}
        {childrenView}
      </>
    );
  }
}

export default OverlapScaffold;
