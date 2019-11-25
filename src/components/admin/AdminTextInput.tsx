import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

import styles from './styles';

export default React.memo(function AdminTextInput({ style, ...rest }: TextInputProps) {
    const theStyle = [
        styles.adminTextInput,
        (style as object)
    ];
    return <TextInput {...rest} style={theStyle} />;
});
