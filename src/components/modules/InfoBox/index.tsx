import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, ImageBackground, Dimensions } from 'react-native';
import { ModuleBox } from '@/components/modules';
import { Image, Container, HtmlText } from '@/components/primitives';
import { Responsive } from '@/components/utils';
import { COLOR_MAP, BREAKPOINTS } from '@/constants';
import { InfoBoxData, OFFSET_DIRECTION } from '@/types';

interface Props {
    data: InfoBoxData[];
}

type State = {
    isExpanded: boolean;
    width: number;
    height: number;
    windowWidth: number;
    imgHeight: number;
}

export default class InfoBox extends PureComponent<Props, State> {
    state = {
        isExpanded: false,
        width: 0,
        height: 0,
        windowWidth: 0,
        imgHeight: 0,
    }

    toggleReadText = (e: any) => {
        e.stopPropagation();
        const { isExpanded } = this.state;

        this.setState({
            isExpanded: !isExpanded
        })
    }

    // On Layout
    // Get the dimensions of the element holding the tag description. Use that number to help determine height of the entire InfoBox module. Will need to add additional px to the number obtained by this function.
    // Get the window width. Use that number in conjuction with the tag description dims to determine height of background image. Will need to subtract pts.
    getHeight = (e: any) => {
        const { imgHeight } = this.state;
        const w = e.nativeEvent.layout.width;
        const h = e.nativeEvent.layout.height;
        const windowWidth = Dimensions.get('window').width;
        const prelimImgHeight = (windowWidth * h)/w; 
        // Convert background height to react native's units of measurement for images
        const finalImgHeight = (prelimImgHeight * 100)/windowWidth; 

        // On initial render, set state for h x w of description box, screen width, and background image height
        if (imgHeight === 0) {
            this.setState({ 
                width: w,
                height: h,
                windowWidth: windowWidth,
                imgHeight: finalImgHeight,
            })
        } else { // When toggling 'read more/read less' just update h x w for description box.
            this.setState({ 
                width: w,
                height: h,
            })
        }
    }

    renderDesktop = () => {
        const { data } = this.props;
        const { tag, imageSrc, description } = getInfo(data[0]);
        return (
            <ImageBackground source={{uri: imageSrc}} 
            style={[styles.imageDesktop]}> 
                <View style={[styles.infobox, styles.infoboxDesktop]}>
                    <ModuleBox offsetDirection={OFFSET_DIRECTION.RIGHT} patternColor={COLOR_MAP.PURPLE} backgroundColor={'transparent'} style={styles.moduleBoxDesktop}>
                        <View>
                            <Text style={styles.title}>{capitalize(tag)}</Text>
                            <HtmlText html={description} css={htmlTextStyle} />
                        </View>
                    </ModuleBox>
                </View>
            </ImageBackground>
        )
    }

    renderMobile = (isTablet: any) => {
        const { data } = this.props;
        const { tag, imageSrc, description } = getInfo(data[0]);
        const { isExpanded, height, windowWidth, imgHeight } = this.state;
        // Determine image height for device
        const imageHeight = isTablet ? imgHeight : (windowWidth > 350 ? Math.floor(imgHeight - 45) : Math.floor(imgHeight - 80));
        const toggleDescription = !isExpanded ? getDescriptionSubstring(description) : description;
        const toggleExpandText = !isExpanded ? 'Read More' : 'Read Less';
        return (
            <Container style={{height: `${height + 120}px`}}>
                <Image source={{uri: imageSrc}} style={{ width: 100, height: 90 }}/>
                <View style={[styles.infobox, styles.infoboxMobile]}>
                    <ModuleBox patternColor={COLOR_MAP.PURPLE} backgroundColor={'transparent'}>
                        <View onLayout={this.getHeight}>
                            <Text style={styles.title} >{capitalize(tag)}</Text>
                            <HtmlText html={toggleDescription} css={htmlTextStyle} />
                            <Text style={styles.read} onPress={this.toggleReadText} >{toggleExpandText}</Text>
                        </View>
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

// Get tag data 
const getInfo = (data: any) => {
    return { 
        tag: data.tag,
        imageSrc: data.imageSrc,
        description: data.description
    };
}

// Capitalize first letter of tag name
const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
        flex: 1,
        top: '50px',
    },
    infoboxDesktop: {
        width: '40vw',
        height: '100%',
        left: '15vw',
    },
    infoboxMobile: {
        position: 'absolute',
        width: '80vw',
        top: '70px',
        left: '10vw',
    },
    imageDesktop: {
        width: '100%',
    },
    moduleBoxDesktop: {
        width: '40vw',
    }, 
    title: {
        fontFamily: 'Libre Baskerville, serif',
        fontSize: 36,
        fontWeight: '700',
    },
    read: {
        color: COLOR_MAP.BLUE,
        marginTop: '1em',
    }, 
})