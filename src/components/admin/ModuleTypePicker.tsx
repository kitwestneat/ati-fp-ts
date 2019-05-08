import React, { PureComponent } from 'react';
import { Picker, PickerProps } from 'react-native';

const MODULE_TYPES = ['recent', 'tagTileBox', 'tagSideRail', 'instagram', 'newsletter', 'trending'];

export default class ModuleTypePicker extends PureComponent<PickerProps> {
  render() {
    const pickerItems = MODULE_TYPES.map(type => (
      <Picker.Item label={type} value={type} key={type} />
    ));

    return <Picker {...this.props}>{pickerItems}</Picker>;
  }
}
