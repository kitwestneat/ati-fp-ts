import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, ImageBackground, Dimensions } from 'react-native';
import { ModuleBox } from '@/components/modules';
import { Image, Container, HtmlText } from '@/components/primitives';
import { Responsive } from '@/components/utils';
import { COLOR_MAP } from '@/constants';
import { BREAKPOINTS } from '@/constants/index';
import { InfoBoxData, OFFSET_DIRECTION } from '@/types';

interface Props {
    data: InfoBoxData[];
}

type State = {
    readText: string;
    width: number;
    height: number;
    windowWidth: number;
    imgHeight: number;
}

export default class InfoBox extends PureComponent<Props, State> {
    state = {
        readText: 'Read More',
        width: 0,
        height: 0,
        windowWidth: 0,
        imgHeight: 0,
    }

    private mobileInfoBox = React.createRef;

    toggleReadText = (e: any) => {
        e.stopPropagation();
        const { readText } = this.state;
        let toggleText = readText === 'Read Less' ? 'Read More' : 'Read Less';

        this.setState({
            readText: toggleText
        })
    }

    // On Layout
    // Get the dimensions of the element holding the tag description. Use that number to help determine height of the entire InfoBox module. Will need to add additional px to the number obtained by this function.
    // Get the window width. Use that number in conjuction with the tag description dims to determine height of background image. Will need to subtract pts.
    getHeight = (e: any) => {
        let w = e.nativeEvent.layout.width;
        let h = e.nativeEvent.layout.height;
        let windowWidth = Dimensions.get('window').width;
        let imgHeight = (windowWidth * h)/w; 
        // Convert background height to react native's units of measurement for images
        let finalImgHeight = (imgHeight * 100)/windowWidth; 

        // On initial render, set state for h x w of description box, screen width, and background image height
        if (this.state.imgHeight === 0) {
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
        return (
            <ImageBackground source={{uri: data[0].imageSrc}} 
            style={[styles.imageDesktop]}> 
                <View style={[styles.infobox, styles.infoboxDesktop]}>
                    <ModuleBox offsetDirection={OFFSET_DIRECTION.RIGHT} patternColor={COLOR_MAP.PURPLE} backgroundColor={'transparent'} style={styles.moduleBoxDesktop}>
                        <View>
                            <Text style={styles.title}>{Capitalize(data[0].tag)}</Text>
                            <HtmlText html={data[0].description} css={htmlTextStyle} />
                        </View>
                    </ModuleBox>
                </View>
            </ImageBackground>
        )
    }

    renderMobile = (isTablet: any) => {
        const { data } = this.props;
        const { readText, height, windowWidth, imgHeight } = this.state;
        // Determine image height for device
        let imageHeight = isTablet ? imgHeight : (windowWidth > 350 ? Math.floor(imgHeight - 45) : Math.floor(imgHeight - 80));
        let closingPTag = '</p>';
        let indexOfFirstClosingPTag = data[0].description.indexOf(closingPTag);
        // Determine first paragraph of tag descritption
        let descriptionSubstring = data[0].description.substring(0, indexOfFirstClosingPTag + closingPTag.length);
        let toggleDescription = readText === 'Read More' ? descriptionSubstring : data[0].description;
        return (
            <Container style={{height: `${height + 100}px`}}>
                <Image source={{uri: data[0].imageSrc}} style={{ width: 100, height: imageHeight }}/>
                <View style={[styles.infobox, styles.infoboxMobile]}>
                    <ModuleBox patternColor={COLOR_MAP.PURPLE} backgroundColor={'transparent'}>
                        <View onLayout={this.getHeight} ref={this.mobileInfoBox}>
                            <Text style={styles.title} >{Capitalize(data[0].tag)}</Text>
                            <HtmlText html={toggleDescription} css={htmlTextStyle} />
                            <Text style={styles.read} onPress={this.toggleReadText} >{readText}</Text>
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

// Capitalize first letter of tag name
const Capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
        left: '10vw',
        zIndex: 2,
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
    htmlDescription: {
        fontFamily: 'Work Sans, sans-serif',
        fontSize: 17,
        marginTop: 0, 
        lineHeight: 24,
    },
    description: {
        fontFamily: 'Work Sans, sans-serif',
        fontSize: 17,
        lineHeight: 24,
    },
    read: {
        color: COLOR_MAP.BLUE,
        marginTop: '1em',
    }, 
})