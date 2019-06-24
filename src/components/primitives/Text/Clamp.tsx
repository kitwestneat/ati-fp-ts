// @flow

import React, { PureComponent } from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle, View } from 'react-native';

interface Props {
  numberOfLines: number;
  children: React.ReactNode;
  style: StyleProp<TextStyle>;
}

interface State {
  isTruncating: boolean;
  containerWidth: number;
  preEllipsisText: string;
  restOfText: string;
}

export default class Clamp extends PureComponent<Props, State> {
  public state = {
    isTruncating: false,
    containerWidth: 0,
    preEllipsisText: '',
    restOfText: ''
  };

  public handleSingleLineLayout = (event: any) => {
    const singleLineWidth = event.nativeEvent.layout.width;
    const { numberOfLines, children: text } = this.props;
    const { containerWidth } = this.state;

    if (typeof text != 'string') {
      return;
    }

    const averageCharsPerLine = getAverageCharsPerLine({
      singleLineWidth,
      textLength: text.length,
      containerWidth
    });

    const { preEllipsisText, restOfText } = getText({
      text,
      numberOfLines,
      averageCharsPerLine
    });

    this.setState(state => ({
      preEllipsisText,
      restOfText,
      isTruncating: false
    }));
  };

  public handleContainerLayout = ({
    nativeEvent: {
      layout: { width }
    }
  }: any): void => {
    if (width === this.state.containerWidth) {
      return;
    }
    this.setState(state => ({
      containerWidth: width,
      isTruncating: true
    }));
  };

  public renderTextOnSingleLine = () => {
    const { numberOfLines, style, ...rest } = this.props;
    return (
      <View style={styles.singleLineContainer}>
        <Text
          onLayout={this.handleSingleLineLayout}
          numberOfLines={1}
          style={[style, styles.singleLineText]}
          {...rest}
        >
          {this.props.children}
        </Text>
      </View>
    );
  };

  public render() {
    const { numberOfLines, ...rest } = this.props;
    const { isTruncating, preEllipsisText, restOfText } = this.state;

    return (
      <View onLayout={this.handleContainerLayout} style={styles.container}>
        {isTruncating && this.renderTextOnSingleLine()}

        <PreEllipsisLines {...rest} text={preEllipsisText} />
        <EllipsisLine {...rest} text={restOfText} />
      </View>
    );
  }
}

const PreEllipsisLines = ({ text, ...rest }: TextProps & { text: string }) => {
  return (
    <Text importantForAccessibility="no" {...rest}>
      {text}
    </Text>
  );
};

const EllipsisLine = ({ text, ...rest }: TextProps & { text: string }) => {
  return text && text.length ? (
    <Text numberOfLines={1} {...rest}>
      {text}
    </Text>
  ) : null;
};

const getAverageCharsPerLine = ({
  textLength,
  singleLineWidth,
  containerWidth
}: {
  textLength: number;
  singleLineWidth: number;
  containerWidth: number;
}) => {
  return (textLength * containerWidth) / singleLineWidth;
};

const getLineBreakIndex = ({ charsPerLine, text }: { charsPerLine: number; text: string }) => {
  return text.slice(0, charsPerLine).lastIndexOf(' ');
};

interface getTextProps {
  text: string;
  numberOfLines: number;
  averageCharsPerLine: number;
}
interface getTextReturn {
  preEllipsisText: string;
  restOfText: string;
}
const getText = (config: getTextProps): getTextReturn => {
  const { text: fullText, numberOfLines, averageCharsPerLine } = config;

  const preEllipsisLineCountArray = Array.from({ length: numberOfLines - 1 });
  const reducer = getReducer(averageCharsPerLine);
  const initial = {
    preEllipsisText: '',
    restOfText: fullText
  };

  return preEllipsisLineCountArray.reduce(reducer, initial);
};

const getReducer = (charsPerLine: number) => ({
  preEllipsisText,
  restOfText
}: getTextReturn): getTextReturn => {
  const lineBreakIndex =
    restOfText.length < charsPerLine
      ? restOfText.length
      : getLineBreakIndex({
          text: restOfText,
          charsPerLine
        });

  return {
    preEllipsisText: preEllipsisText + restOfText.slice(0, lineBreakIndex),
    restOfText: restOfText.slice(lineBreakIndex)
  };
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  singleLineContainer: { position: 'absolute', visibility: 'hidden' },
  singleLineText: { flex: 1 }
});
