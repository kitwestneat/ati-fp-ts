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
          <Picker
            selectedValue={data.isHU}
            onValueChange={isHU => {
              updateOptions({ isHU });
            }}
          >
            <Picker.Item label="ATI" value={false} />
            <Picker.Item label="HU" value={true} />
          </Picker>
        }
      />);
  }
}