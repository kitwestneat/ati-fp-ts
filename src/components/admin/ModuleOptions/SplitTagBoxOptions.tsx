import React, { PureComponent } from 'react';
import { Picker } from 'react-native';
import { Omit, SplitTagBoxData } from '../../../types';
import AdminInput from '../AdminInput';
import TagTileBoxOptions from './TagTileBoxOptions';

type Data = Omit<SplitTagBoxData, 'type'>;
interface Props {
  data: Data;
  updateOptions: (k: Partial<Data>) => void;
}

export default class SplitTagBoxOptions extends PureComponent<Props> {
  public render() {
    const { data, updateOptions } = this.props;

    return (<>
        <TagTileBoxOptions data={data} updateOptions={updateOptions} />
        
    <AdminInput
      label="Split:"
      input={
        <Picker
          selectedValue={data.split}
          onValueChange={split => {
            updateOptions({ split });
          }}
        >
          <Picker.Item label="left" value="left" />
          <Picker.Item label="right" value="right" />
        </Picker>
      }
    />
         </>);
  }
}