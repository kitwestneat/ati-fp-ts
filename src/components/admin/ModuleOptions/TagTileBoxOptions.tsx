import React, { PureComponent } from 'react';
import { Switch, Text } from 'react-native';
import { Omit, TagTileBoxModuleData } from '../../../types';
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
    const { order } = data;

    return (
      <>
        <SectionOptions data={data} updateOptions={updateOptions} />
        <AdminInput
          label="2x Box on Bottom?"
          input={
            <>
              <Switch
                onValueChange={(isOrder2): void => updateOptions({ order: isOrder2 ? 2 : 1 })}
                value={order === 2}
              />
              <Text style={{ fontSize: 'smaller', fontStyle: 'italic', marginLeft: 10 } as any}>
                (defaults to top)
              </Text>
            </>
          }
        />
      </>
    );
  }
}
