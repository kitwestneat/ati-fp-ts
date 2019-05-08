import React, { PureComponent, Fragment } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { Image, Section } from '@/components/primitives';

import { PostImage, ModuleBox, Pattern, OverlapScaffold } from '@/components/modules';

import { SECTION_TYPES, SMALL_SECTIONS, SECTION_SPACING_VARIANTS, COLOR_MAP } from '@/constants';
import { InfoBoxData, OFFSET_DIRECTION } from '@/types';


interface Props {
    data: InfoBoxData[];
}

export default class InfoBox extends PureComponent<Props> {
    render() {

        const { data } = this.props;
        const tag = data.find(item => {
            return item.type === 'tag';
        })
        console.log("data: ", data);
        console.log("tag: ", tag);

        return (
            <Fragment>
                <ImageBackground source={{uri: data[0].imageSrc}} style={styles.image}>
                    <View style={styles.container} >
                        {/* <Image source={{uri: data[0].imageSrc}} style={styles.image} />
                        <Pattern offsetDirection={OFFSET_DIRECTION.LEFT} color={'red'}>
                        </Pattern>
                            <View style={styles.infobox}>
                                <Text style={styles.title}>{Capitalize(data[0].tag)}</Text>
                                <Text style={styles.description}>{data[0].description}</Text>
                            </View> */}
                        <ModuleBox offsetDirection={OFFSET_DIRECTION.LEFT} patternColor={COLOR_MAP.PURPLE} 
                        transparentBG={true} style={styles.infobox}>
                            <Text style={styles.title}>{Capitalize(data[0].tag)}</Text>
                            <Text style={styles.description}>{data[0].description}</Text>
                        </ModuleBox>
                    </View>
                </ImageBackground>
            </Fragment>
        )
    }
}

const Capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
    }

const styles = StyleSheet.create({
    container: {
        width: '405px',
        position: 'absolute',
        left: '20%',
        top: '10%',
        //height: '300px',
        //overflow: 'hidden'
    },
    image: {
        // width: 100, 
        // height: 40, 
        // flex: 1,
        // justifyContent: 'flex-start',
        width: '100%',
        height: '400px',
    },
    infobox: {
        // position: 'absolute',
        // left: '20%',
        // top: '10%',
        // marginLeft: '100px',
        width: '405px',
        padding: '1em',
        backgroundColor: 'white',
        //zIndex: 5,
        //flex: 1,
    },
    title: {
        fontFamily: 'serif',
        fontSize: 36,
    },
    description : {
        fontFamily: 'sans-serif',
        marginTop: '1em',
    }
})