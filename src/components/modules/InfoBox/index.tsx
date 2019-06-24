import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { ModuleBox } from '@/components/modules';
import { Image, Container, HtmlText } from '@/components/primitives';
import { Responsive, Capitalize } from '@/components/utils';
import { COLOR_MAP, BREAKPOINTS } from '@/constants';
import { InfoBoxData, OFFSET_DIRECTION } from '@/types';
import { isDevEnv } from '../../../utils';

interface Props extends InfoBoxData {
    name: string;
    imageSrc: string;
    description: string;
    paginate?: boolean;
}

type State = {
    isExpanded: boolean;
    height: number;
}

export default class InfoBox extends PureComponent<Props, State> {
    state = {
        isExpanded: false,
        height: 0,
    }

    toggleReadText = (e: any) => {
        e.stopPropagation();

        this.setState(prevState => (
            { isExpanded: !prevState.isExpanded }
        ))
    }

    // On Layout
    // Get the dimensions of the element holding the tag description. Use that number to help determine height of the entire InfoBox module. Will need to add additional px to the number obtained by this function.
    // Get the window width. Use that number in conjuction with the tag description dims to determine height of background image. Will need to subtract pts.
    getHeight = (e: any) => {
        const h = e.nativeEvent.layout.height;
        // On layout change, set state for height of description box
        // Needed to help determine the height of the container
        this.setState({ 
            height: h,
        })
    }

    isPaginated = () => isDevEnv() ? window.location.pathname.includes('/page/') : this.props.paginate;

    renderDesktop = () => {
        const { name, imageSrc,description } = this.props;
        const paginate = this.isPaginated();
        return (
            <ImageBackground source={{uri: imageSrc}} style={[styles.imageDesktop, { marginBottom: paginate ? 0 : 70 }]}> 
                <Container type='content'>
                    <View style={[styles.infobox, styles.infoboxDesktop]}>
                        <ModuleBox offsetDirection={OFFSET_DIRECTION.RIGHT} patternColor={COLOR_MAP.PURPLE} backgroundColor={'transparent'}>
                            {paginate ? 
                            <View>
                                <Text style={[styles.title, styles.titlePaginate, { padding: '1em' }]}>{Capitalize(name)}</Text>
                            </View> 
                            :
                            <View>
                                <Text style={styles.title}>{Capitalize(name)}</Text>
                                <HtmlText html={description} css={htmlTextStyle} />
                            </View>
                            }
                        </ModuleBox>
                    </View>
                </Container>
            </ImageBackground>
        )
    }

    renderMobile = (isTablet: any) => {
        const { name, imageSrc, description } = this.props;
        const { isExpanded, height } = this.state;
        const toggleDescription = !isExpanded ? getDescriptionSubstring(description) : description;
        const toggleExpandText = !isExpanded ? 'Read More' : 'Read Less';
        const paginate = this.isPaginated();
        return (
            <Container style={{height: `${height + 120}px`, minHeight: paginate && isTablet ? 400 : 200, marginBottom: 30 }}>
                <Image source={{uri: imageSrc}} style={{ width: 180, height: 100 }}/>
                <View style={[styles.infobox, styles.infoboxMobile, { top: paginate ? '30px' : '70px'}]}>
                    <ModuleBox patternColor={COLOR_MAP.PURPLE} backgroundColor={'transparent'}>
                        {paginate ?
                        <View onLayout={this.getHeight}>
                            <Text style={[styles.title, styles.titlePaginate]}>{Capitalize(name)}</Text>
                        </View>
                        :
                        <View onLayout={this.getHeight}>
                            <Text style={styles.title} >{Capitalize(name)}</Text>
                            <HtmlText html={toggleDescription} css={htmlTextStyle} />
                            <Text style={styles.read} onPress={this.toggleReadText} >{toggleExpandText}</Text>
                        </View>
                        }
                    </ModuleBox>
                </View>
            </Container>
        )
    }

    render() {
        return (
            <Responsive>
                {({ minWidth }) => {
                    const isDesktop = minWidth(BREAKPOINTS.LG);
                    const isTablet = minWidth(BREAKPOINTS.MD);
                    return isDesktop ? this.renderDesktop() : this.renderMobile(isTablet);
                    }
                }
            </Responsive>
        )
    }
}

// Return first paragraph of the tag description
const getDescriptionSubstring = (str: string) => {
    const closingPTag = '</p>';
    const indexOfFirstClosingPTag = str.indexOf(closingPTag);
    const descriptionSubstring = str.substring(0, indexOfFirstClosingPTag + closingPTag.length);
    return descriptionSubstring;
}

// Style for tag description
// HtmlText component expects an object, not styles created with React Native Stylesheet
const htmlTextStyle = {
    fontFamily: 'Work Sans, sans-serif',
    fontSize: 17,
    lineHeight: 1.5,
};

const styles = StyleSheet.create({
    infobox: {
        top: '50px',
    },
    infoboxDesktop: {
        width: '50%',
        height: '100%',
    },
    infoboxMobile: {
        position: 'absolute',
        maxWidth: '80vw',
        left: '10vw',
    },
    imageDesktop: {
        width: '100%',
        minHeight: 500,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Libre Baskerville, serif',
        fontSize: 36,
        fontWeight: '700',
    },
    titlePaginate: {
        textAlign: 'center',
    },
    read: {
        color: COLOR_MAP.BLUE,
        marginTop: '1em',
    }, 
})