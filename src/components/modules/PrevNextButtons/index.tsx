import { Container } from '@/components/primitives';
import { Responsive } from '@/components/utils';
import { BREAKPOINTS, COLOR_MAP } from '@/constants';
import React, { PureComponent } from 'react';
import { Linking, StyleSheet } from 'react-native';
import Button from './Button';

interface Props {
    prevLink: string;
    nextLink: string;
}

export default class PrevNextButtons extends PureComponent<Props> {
    public static defaultProps = {
        prevLink: '',
        nextLink: '',
    }; 

    public goToURL = (url: string) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                // XXX is there a better way to use react-native-web only args?
                (Linking as any).openURL(url, '_self');
            } else {
                console.log('Don\'t know how to open URI: ' + url);
            }
          });
    }

    public render() {
        const { prevLink, nextLink } = this.props;

        return (
            <Responsive>
                {({ minWidth }) => {
                    const isDesktop = minWidth(BREAKPOINTS.LG);
                    return (
                        <Container type="content" style={[styles.container, { paddingHorizontal: isDesktop ? 0 : '15px'}]}>
                            <Button 
                                buttonText="previous" 
                                onPress={this.goToURL} 
                                link={prevLink} 
                                buttonWidth={isDesktop ? styles.buttonWidth : styles.buttonWidthMobile}
                                buttonActive={styles.buttonActive}
                                buttonDisabled={styles.buttonDisabled} 
                            />
                            <Button 
                                buttonText="next" 
                                onPress={this.goToURL} 
                                link={nextLink}  
                                buttonWidth={isDesktop ? styles.buttonWidth : styles.buttonWidthMobile}
                                buttonActive={styles.buttonActive} 
                                buttonDisabled={styles.buttonDisabled} 
                            />
                        </Container>
                    );
                }}
            </Responsive>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonWidth: {
        width: '200px',
    },
    buttonWidthMobile: {
        width: '45vw',
    },
    buttonActive: {
        padding: '1em',
        backgroundColor: COLOR_MAP.BLUE,
        color: '#FFF',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonDisabled: {
        backgroundColor: 'gray',
        cursor: 'default'
    }
});
