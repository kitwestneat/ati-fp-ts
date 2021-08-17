import React, { PureComponent } from 'react';
import { Picker } from 'react-native';
import { TagTileBoxModuleData } from '../../../types';
import AdminInput from '../AdminInput';
import SectionOptions from './SectionOptions';

type Data = Omit<TagTileBoxModuleData, 'type'>;
interface Props {
  data: Data;
  updateOptions: (k: Partial<Data>) => void;
}

export default class TagTileBoxOptions extends PureComponent<Props> {
  public render(): JSX.Element {
    const { updateOptions, data } = this.props;

    return (
      <>
        <SectionOptions data={data} updateOptions={updateOptions} />
        <AdminInput
          label="2x Box Location"
          input={
            <Picker
              selectedValue={data.order as any}
              onValueChange={(order: 1 | 2) => {
                updateOptions({ order });
              }}
            >
              <Picker.Item label="Top" value={1 as any} />
              <Picker.Item label="Bottom" value={2 as any} />
            </Picker>
          }
        />
      </>
    );
  }
}
