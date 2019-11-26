import { MODULE_ACQUISITION_TYPES, MODULE_LINK_TYPES } from '@/constants';
import React, { PureComponent } from 'react';
import { Picker } from 'react-native';
import { getModuleTypeLabel } from './admin-utils';

interface Props {
    selectedValue: any;
    onValueChange: any;
    moduleCategory: string;
}

export default class ModuleTypePicker extends PureComponent<Props> {
    public render() {
        const { selectedValue, onValueChange, moduleCategory } = this.props;

        const moduleChoices =
            moduleCategory === 'link' ? MODULE_LINK_TYPES : MODULE_ACQUISITION_TYPES;

        const pickerItems = moduleChoices.map(type => (
            <Picker.Item label={getModuleTypeLabel(type)} value={type} key={type} />
        ));

        return (
            <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
                {pickerItems}
            </Picker>
        );
    }
}
