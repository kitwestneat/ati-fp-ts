// @flow

import React, { PureComponent, ReactNode, ReactElement } from 'react';
import { View } from 'react-native';
import { Container } from '@/components/primitives';

type Props = {
  overlap: number;
  containerPadding: number;
};
class OverlapScaffold extends PureComponent<Props> {
  static defaultProps = {
    overlap: 0,
    containerPadding: 0
  };

  static Main = ({ children }: { children: JSX.Element }) => children;
  static Overlap = ({ children }: { children: JSX.Element }) => children;

  // XXX this function is funky
  getScaffoldContentByType = (type: any) => {
    const ScaffoldChild = React.Children.toArray(this.props.children).find(
      child => !!child && typeof child === 'object' && (child as ReactElement).type === type
    );

    if (!ScaffoldChild || !(ScaffoldChild as ReactElement).props) {
      return null;
    }

    return React.Children.toArray((ScaffoldChild as ReactElement).props.children)[0];
  };

  getMainPost = () => {
    const MainPost = this.getScaffoldContentByType(OverlapScaffold.Main);
    return React.cloneElement(MainPost, {
      bottomOverlap: this.props.overlap,
      containerPadding: this.props.containerPadding
    });
  };

  render() {
    const { overlap, containerPadding } = this.props;

    return (
      <>
        <View style={{ zIndex: 10, flex: 1, flexShrink: 0, width: '100%' }}>
          {this.getMainPost()}
        </View>
        <Container
          style={{
            marginTop: -overlap,
            paddingHorizontal: containerPadding,
            zIndex: 10
          }}
          type='content'
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
          type='content'
        >
          {this.getScaffoldContentByType(OverlapScaffold.Overlap)}
        </Container>
      </>
    );
  }
}

export default OverlapScaffold;
