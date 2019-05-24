import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { ModuleBox } from '@/components/modules';
import { Image, Container, HtmlText } from '@/components/primitives';
import { Responsive } from '@/components/utils';
import { COLOR_MAP, BREAKPOINTS } from '@/constants';
import { InfoBoxData, OFFSET_DIRECTION } from '@/types';

// interface Props {
//     data: InfoBoxData[];
// }

// type Props = { data: InfoBoxData[] };

interface Props extends InfoBoxData {
    name: string;
    imageSrc: string;
    description: string;
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

        // On layout change, set state for height description box
        // Needed to help determine the height of the container
        this.setState({ 
            height: h,
        })
    }

    renderDesktop = () => {
        const { name, imageSrc,description } = this.props;
        //const { name, imageSrc, description } = getInfo(data);
        console.log("props: ", this.props);
        return (
            <ImageBackground source={{uri: imageSrc}} style={[styles.imageDesktop]}> 
                <Container type='content'>
                    <View style={[styles.infobox, styles.infoboxDesktop]}>
                        <ModuleBox offsetDirection={OFFSET_DIRECTION.RIGHT} patternColor={COLOR_MAP.PURPLE} backgroundColor={'transparent'}>
                            <View>
                                <Text style={styles.title}>{capitalize(name)}</Text>
                                <HtmlText html={description} css={htmlTextStyle} />
                            </View>
                        </ModuleBox>
                    </View>
                </Container>
            </ImageBackground>
        )
    }

    renderMobile = () => {
        const { name, imageSrc, description } = this.props;
        //const { name, imageSrc, description } = getInfo(data[0]);
        const { isExpanded, height } = this.state;
        const toggleDescription = !isExpanded ? getDescriptionSubstring(description) : description;
        const toggleExpandText = !isExpanded ? 'Read More' : 'Read Less';
        return (
            <Container style={{height: `${height + 120}px`, marginBottom: 30}}>
                <Image source={{uri: imageSrc}} style={{ width: 190, height: 100 }}/>
                <View style={[styles.infobox, styles.infoboxMobile]}>
                    <ModuleBox patternColor={COLOR_MAP.PURPLE} backgroundColor={'transparent'}>
                        <View onLayout={this.getHeight}>
                            <Text style={styles.title} >{capitalize(name)}</Text>
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
                    return isDesktop ? this.renderDesktop() : this.renderMobile();
                    }
                }
            </Responsive>
        )
    }
}

// Get tag data 
const getInfo = (data: any) => {
    return { 
        name: data.name,
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
        top: '50px',
    },
    infoboxDesktop: {
        width: '55%',
        height: '100%',
    },
    infoboxMobile: {
        position: 'absolute',
        width: '80vw',
        top: '70px',
        left: '10vw',
    },
    imageDesktop: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 70,
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