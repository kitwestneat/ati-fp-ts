import * as React from 'react';
import { Picker } from 'react-native';
import AdminInput from '../AdminInput';

interface Data {
  type: 'instagram';
  isHU: boolean;
}

interface Props {
  data: Data;
  updateOptions(val: Partial<Data>): void;
}

export default class InstagramOptions extends React.PureComponent<Props> {
  public render() {
    const { data, updateOptions} = this.props;
    return (
      <AdminInput
        label="Account:"
        input={
          // Picker doesn't like boolean values very much
          <Picker
            selectedValue={data.isHU ? 'HU' : 'ATI'}
            onValueChange={isHU => updateOptions({ isHU: isHU == 'HU' })}
          >
            <Picker.Item label="ATI" value="ATI" />
            <Picker.Item label="HU" value="HU" />
          </Picker>
        }
      />);
  }
}