import React, { PureComponent } from 'react';
import { SectionData } from '../../../types';
import AdminInput from '../AdminInput';
import AdminTextInput from '../AdminTextInput';

type Data = Omit<SectionData, 'type'>;
interface Props {
  data: Data;
  updateOptions(val: Partial<Data>): void;
}

export default class SectionOptions extends PureComponent<Props> {
  public render() {
    const { data, updateOptions } = this.props;
    const { sectionTitle, sectionLink, sectionColor } = data;

    return (
      <>
        <AdminInput
          label="Section Title:"
          input={
            <AdminTextInput
              onChangeText={(sectionTitle: string) => updateOptions({ sectionTitle })}
              value={sectionTitle}
            />
          }
        />
        <AdminInput
          label="Section Link:"
          input={
            <AdminTextInput
              onChangeText={(sectionLink: string) => updateOptions({ sectionLink })}
              value={sectionLink}
            />
          }
        />
        <AdminInput
          label="Section Color:"
          input={
            <input
              onChange={ev => {
                updateOptions({ sectionColor: ev.target.value });
              }}
              type="color"
              value={sectionColor}
            />
          }
        />
      </>
    );
  }
}
