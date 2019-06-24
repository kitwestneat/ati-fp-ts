// @flow

import React, { PureComponent, ReactElement, ReactNode } from 'react';
import { View } from 'react-native';
import { Container } from '../../primitives';

interface Props {
  overlap: number;
  containerPadding: number;
  titleOverlap?: boolean;
  titleWidth?: number;
  isDesktop?: boolean;
}
class OverlapScaffold extends PureComponent<Props> {
  public static defaultProps = {
    overlap: 0,
    containerPadding: 0,
    titleOverlap: false,
    titleWidth: 0,
    isDesktop: false,
  };

  public static Main = ({ children }: { children: JSX.Element }) => children;
  public static Overlap = ({ children }: { children: JSX.Element }) => children;

  // XXX this function is funky
  public getScaffoldContentByType = (type: any) => {
    const ScaffoldChild = React.Children.toArray(this.props.children).find(
      child => !!child && typeof child === 'object' && (child as ReactElement).type === type
    );

    if (!ScaffoldChild || !(ScaffoldChild as ReactElement).props) {
      return null;
    }

    return React.Children.toArray((ScaffoldChild as ReactElement).props.children)[0];
  };

  public getMainPost = () => {
    const MainPost = this.getScaffoldContentByType(OverlapScaffold.Main);
    return React.cloneElement(MainPost, {
      bottomOverlap: this.props.overlap,
      containerPadding: this.props.containerPadding, 
      isDesktop: this.props.isDesktop
    });
  };

  public render() {
    const { overlap, containerPadding, titleOverlap, titleWidth, isDesktop } = this.props;

    return (
      <>
        <View style={{ 
            zIndex: 10, 
            flex: 1, 
            flexShrink: 0, 
            width: '100%', 
            alignItems: titleOverlap && !isDesktop ? 'center' : 'flex-start',
            marginTop: titleOverlap && !isDesktop ? overlap : 0,
          }}
        >
          {titleOverlap && !isDesktop &&
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'white',
                height: 30, 
                width: titleWidth,
                top: -45,
                zIndex: 10,
              }}
            />
          }
          {this.getMainPost()}
        </View>
        <Container
          style={{
            marginTop: -overlap,
            paddingHorizontal: containerPadding,
            zIndex: 10,
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
        <Container
          style={{
            marginTop: -overlap,
            paddingHorizontal: containerPadding
          }}
          type="content"
        >
          {this.getScaffoldContentByType(OverlapScaffold.Overlap)}
        </Container>
      </>
    );
  }
}

export default OverlapScaffold;
