import React, {PureComponent} from 'react';
import { View, Text } from '@/components/primitives';
import { TouchableOpacity } from 'react-native';

interface Props {
    buttonText: string;
    onPress: any;
    link: string;
    buttonWidth?: any;
    buttonActive?: any;
    buttonDisabled?: any;
}

export default class Button extends PureComponent<Props>{
    render() {
        const { buttonText, onPress, link, buttonWidth, buttonActive, buttonDisabled } = this.props;
        const isDisabled = link === '' ? false : true;

        return (
            <View pointerEvents={isDisabled ? "none" : "auto"}>
                <TouchableOpacity style={buttonWidth}>
                    <Text 
                        onPress={() => onPress(link)} 
                        style={[buttonActive, isDisabled ? buttonDisabled : {}]}
                    >
                        {buttonText}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}