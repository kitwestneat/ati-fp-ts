// @flow

import React, { PureComponent } from "react";
import { View } from "react-native";

import { Container } from "components/primitives";
import { ModuleBox } from "components/modules";

import PostList from "./PostList";
import PostGrid from "./PostGrid";

import TitleSquare from "./TitleSquare";

import { Responsive } from "components/utils";

import { BREAKPOINTS } from "constants/index";

type Props = {
  posts: any,
  sectionColor: string,
  sectionLink: string,
  sectionTitle: string,
};

class Trending extends PureComponent<Props> {
  renderMobile = titleSquare => {
    const { posts } = this.props;
    return (
      <Container
        type="content"
        style={{
          paddingHorizontal: 15,
          alignItems: "center",
        }}
      >
        <View
          style={{
            maxWidth: 300,
            width: "100%",
          }}
        >
          {titleSquare}
        </View>
        <View style={{ marginTop: 30 }}>
          <ModuleBox>
            <PostList posts={posts} isDesktop={false} />
          </ModuleBox>
        </View>
      </Container>
    );
  };
  renderDesktop = titleSquare => {
    const { posts } = this.props;
    return (
      <Container type="content">
        <View
          style={{
            flexDirection: "row",
            margin: -15,
          }}
        >
          <View style={{ width: "25%", padding: 15 }}>{titleSquare}</View>

          <View style={{ width: "75%", padding: 15 }}>
            <PostGrid posts={posts} />
          </View>
        </View>
      </Container>
    );
  };
  render() {
    const { sectionColor, sectionLink, sectionTitle } = this.props;

    const titleSquare = (
      <TitleSquare
        title={sectionTitle}
        patternColor={sectionColor}
        sectionLink={sectionLink}
      />
    );

    return (
      <Responsive>
        {({ minWidth }) => {
          const isDesktop = minWidth(BREAKPOINTS.LG);
          return isDesktop
            ? this.renderDesktop(titleSquare)
            : this.renderMobile(titleSquare);
        }}
      </Responsive>
    );
  }
}

export default Trending;
