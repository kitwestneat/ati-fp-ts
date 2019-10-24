import React, { PureComponent } from 'react';
import { Picker, PickerProps } from 'react-native';
import { MODULE_ACQUISITION_TYPES, MODULE_LINK_TYPES } from '@/constants';

interface Props {
  selectedValue: any,
  onValueChange: any,
  moduleCategory: string,
}

export default class ModuleTypePicker extends PureComponent<Props> {
  public render() {
    const { selectedValue, onValueChange, moduleCategory } = this.props;

    const moduleChoices = moduleCategory === "link" ? MODULE_LINK_TYPES : MODULE_ACQUISITION_TYPES;

    const pickerItems = moduleChoices.map(type => (
      <Picker.Item label={type} value={type} key={type} />
    ));

    return <Picker selectedValue={selectedValue} onValueChange={onValueChange}>{pickerItems}</Picker>;
  }
}
