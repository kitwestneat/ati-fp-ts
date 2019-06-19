import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ModuleBox, OverlapScaffold, Post, Pattern } from '@/components/modules';
import { Container, Row, Image } from '@/components/primitives';
import { Responsive } from '@/components/utils';
import { BREAKPOINTS, CONTAINER_PADDING, COLOR_MAP } from '@/constants';
import { TagTileBoxModuleData, PostType, OFFSET_DIRECTION, GridOrder } from '@/types';
import PostGrid  from './PostGrid';
import TrendingLine from '@/assets/images/trending-line.svg';

interface Props extends TagTileBoxModuleData {
    postsOne: PostType[];
    postsTwo: PostType[];
    sectionLink: string;
    sectionColor: string;
    sectionTitle: string;
    order?: GridOrder;
    tag: string;
}

export default class RecentAndTrending extends PureComponent<Props> {
    scaffoldProps = (isDesktop: boolean) =>
    isDesktop
      ? {
          containerPadding: 45,
          overlap: 30
        }
      : {
          containerPadding: CONTAINER_PADDING.MOBILE,
          overlap: 15
        };

    MainPostImageProps = (isDesktop: boolean) =>
    isDesktop
      ? {
          imageWidth: 1200,
          imageHeight: 627
        }
      : {
          imageWidth: 375,
          imageHeight: 250
        };


    render() {
        const {
            sectionColor,
            postsOne: [mainPost, ...secondaryPosts],
            postsTwo, 
            tag
        } = this.props;

        return (
            <Responsive>
            {({ minWidth }) => {
                const isDesktop = minWidth(BREAKPOINTS.LG);

                const localFontStyles = isDesktop
                    ? { fontSize: 24, lineHeight: 29 }
                    : { fontSize: 20, lineHeight: 24 };
                return (
                    <Container type='content' style={{flexDirection: isDesktop? 'row' : 'column', justifyContent: 'space-between'}}>
                      <View style={{width: isDesktop ? '68%' : '100%'}}>
                        <Text style={[styles.headerText, localFontStyles, {marginLeft: isDesktop ? 0 : '15px'}]}>Recently in {capitalize(tag)}</Text>
            
                        <Row style={{}}>
                            <OverlapScaffold {...this.scaffoldProps(isDesktop)} isDesktop={isDesktop}>
                                <OverlapScaffold.Main>
                                    <Post
                                    layoutVariant='overlay'
                                    isDesktop={isDesktop}
                                    center
                                    {...this.MainPostImageProps(isDesktop)}
                                    {...mainPost}
                                    />
                                </OverlapScaffold.Main>
                
                                <OverlapScaffold.Overlap>
                                    <ModuleBox offsetDirection={OFFSET_DIRECTION.RIGHT} patternColor={sectionColor}>
                                    {isDesktop ? (
                                        <PostGrid order={1} posts={secondaryPosts} />
                                    ) : (
                                        <PostGrid order={2} itemsPerRow={1} posts={secondaryPosts} />
                                    )}
                                    </ModuleBox>
                                </OverlapScaffold.Overlap>
                            </OverlapScaffold>
                        </Row>
                      </View>

                      <View style={[isDesktop ? styles.trendingDesktopContainer : styles.trendingMobileContainer]}>
                          {isDesktop ? (
                                <Text style={[styles.headerText, localFontStyles, !isDesktop ? styles.trendingMobileTextStyles : {}]}>Trending in {capitalize(tag)}</Text>
                            ) : (
                                <View style={{paddingHorizontal: '40px'}}>
                                    <Pattern color={COLOR_MAP.GREEN}>
                                        <View style={[styles.colorBackground, { padding: '15px', backgroundColor: COLOR_MAP.GREEN, flexDirection: 'row', justifyContent: 'center' }]}>
                                            <Text style={styles.text}>Trending in {capitalize(tag)}</Text>
                                            <View style={{width: '20%'}}>
                                                <Image width={45} height={27} source={{ uri: TrendingLine }} />
                                            </View>
                                        </View>
                                    </Pattern>
                                </View>
                          )}
                          {isDesktop ? (
                                <PostGrid order={3} itemsPerRow={1} posts={postsTwo} />
                            ) : (
                                <View style={{paddingHorizontal: '15px', marginTop: 30}}>
                                    <ModuleBox>
                                        <PostGrid order={4} itemsPerRow={1} posts={postsTwo} />
                                    </ModuleBox>
                                </View>
                            )}
                      </View>
                    </Container>
                  );
                }
            }
            </Responsive>
        );
    }
}

// Capitalize first letter of tag name
const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const styles = StyleSheet.create({
    headerText: {
        fontWeight: '600',
        marginBottom: '15px',
    },
    trendingDesktopContainer: {
        width: '27%',
    },
    trendingMobileContainer: {
        width: '100%',
        marginTop: 30,
    },
    trendingMobileTextStyles: {
        marginLeft: '15px',
        marginTop: '1em',
    },
    colorBackground: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    text: {
        lineHeight: 37,
        fontSize: 40,
        color: 'white',
        fontWeight: '600'
    }
})