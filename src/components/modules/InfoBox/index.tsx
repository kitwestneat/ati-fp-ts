import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableHighlight } from 'react-native';
import { ModuleBox } from '@/components/modules';
import { Image, Container } from '@/components/primitives';
import { Responsive } from '@/components/utils';
import { COLOR_MAP } from '@/constants';
import { BREAKPOINTS } from '@/constants/index';
import { InfoBoxData, OFFSET_DIRECTION } from '@/types';

interface Props {
    data: InfoBoxData[];
}

type State = {
    readText: string;
    numberOfLines: number;
    height: number;
}

export default class InfoBox extends PureComponent<Props, State> {
    state = {
        readText: 'Read More',
        numberOfLines: 6,
        height: 0,
    }

    toggleReadText = () => {
        const { readText, numberOfLines } = this.state;
        let toggleText = readText === 'Read Less' ? 'Read More' : 'Read Less';
        let toggleNumberOfLines = numberOfLines ? 0 : 6; // Zero is to see all the tag description

        this.setState({
            readText: toggleText,
            numberOfLines: toggleNumberOfLines,
        })
    }

    // Get the height of the element hlding the tag description
    // Use that number to help determine height of the entire InfoBox module 
    // Will need to add additional px to the number obtained by this function
    getHeight = (e: any) => {
        this.setState({ height: e.nativeEvent.layout.height })
    }

    renderDesktop = () => {
        const { data } = this.props;
        const { height } = this.state; 
        return (
            <ImageBackground source={{uri: data[0].imageSrc}} 
            style={[styles.imageDesktop]}> 
                <View style={[styles.infobox, styles.infoboxDesktop, {height: `${height - 10}px`}]}>
                    <ModuleBox offsetDirection={OFFSET_DIRECTION.RIGHT} patternColor={COLOR_MAP.PURPLE} backgroundColor={'transparent'} style={{width: '40vw'}}>
                        <View onLayout={this.getHeight}>
                            <Text style={styles.title}>{Capitalize(data[0].tag)}</Text>
                            <Text style={styles.description}>{data[0].description}</Text>
                        </View>
                    </ModuleBox>
                </View>
            </ImageBackground>
        )
    }

    renderMobile = (isTablet: any) => {
        const { data } = this.props;
        const { readText, numberOfLines, height } = this.state;
        let imageHeight = isTablet ? 40 : 85; // Determine image height for tablet and mobile
        return (
            <Container style={{height: `${height + 120}px`}}>
                <Image source={{uri: data[0].imageSrc}} style={{ width: 100, height: imageHeight }}/>
                <View style={[styles.infobox, styles.infoboxMobile]}>
                    <ModuleBox patternColor={COLOR_MAP.PURPLE} backgroundColor={'transparent'}>
                        <View onLayout={this.getHeight}>
                            <Text style={styles.title} >{Capitalize(data[0].tag)}</Text>
                            <Text numberOfLines={numberOfLines} ellipsizeMode={'tail'} style={[styles.description]}>
                                {data[0].description}
                            </Text>
                            <TouchableHighlight onPress={this.toggleReadText}>
                                <Text style={styles.read} >{readText}</Text>
                            </TouchableHighlight>
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

const styles = StyleSheet.create({
    infobox: {
        top: '50px',
        marginBottom: '100px',
    },
    infoboxDesktop: {
        width: '40vw',
        left: '15vw',
    },
    infoboxMobile: {
        position: 'absolute',
        width: '80vw',
        left: '10vw',
    },
    imageDesktop: {
        width: '100%',
    },
    title: {
        fontFamily: 'Libre Baskerville, serif',
        fontSize: 36,
        fontWeight: '700',
    },
    description: {
        fontFamily: 'Work Sans, sans-serif',
        fontSize: 17,
        marginTop: '1em',
        lineHeight: 24,
    },
    read: {
        color: COLOR_MAP.BLUE,
        marginTop: '1em',
    }, 
})