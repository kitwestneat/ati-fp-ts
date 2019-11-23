import Modal from 'modal-react-native-web';
import React, { PureComponent } from 'react';
import { Button, Picker, View } from 'react-native';

import { AllModuleDataTypes } from '../../types';
import { queryObj2Str, queryStr2Obj } from './admin-utils';

import AdminInput from './AdminInput';
import AdminTextInput from './AdminTextInput';
import ModuleTypePicker from './ModuleTypePicker';

import { MODULE_ACQUISITION_TYPES, SECTION_TYPES } from '@/constants';
import { KeyedModuleSpec } from './module-list-utils';
import SectionOptions from './ModuleOptions/SectionOptions';
import SplitTagBoxOptions from './ModuleOptions/SplitTagBoxOptions';
import TagTileBoxOptions from './ModuleOptions/TagTileBoxOptions';
import styles from './styles';

interface Props {
  isVisible: boolean;
  onCancel: VoidFunction;
  onSave: (m: KeyedModuleSpec) => void;
  item: KeyedModuleSpec;
}

interface State {
  newItem: KeyedModuleSpec;
  moduleCategory: string;
}

export default class ModuleEditDialog extends PureComponent<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      newItem: { ...this.props.item, isNew: false },
      moduleCategory:
        this.props.item.module_opts &&
        MODULE_ACQUISITION_TYPES.includes(this.props.item.module_opts.type)
          ? 'acquisition'
          : 'link'
    };
  }
  public save = () => {
    const { onSave } = this.props;
    const { newItem } = this.state;

    onSave(newItem as any);
  };

  public updateOptions = (updates: Partial<AllModuleDataTypes>) =>
    this.setState(({ newItem }: { newItem: any }) => ({
      newItem: {
        ...newItem,
        // eslint-disable-next-line camelcase
        module_opts: {
          ...newItem.module_opts,
          ...updates
        }
      }
    }));

  public updateQuery = (query: string) =>
    this.setState(({ newItem }) => ({
      newItem: {
        ...newItem,
        // eslint-disable-next-line id-blacklist
        query: queryStr2Obj(query) || undefined
      }
    }));

  public renderModuleSpecificOptions = (moduleOpts: any) => {
    switch (moduleOpts.type) {
      default:
        console.error('Unknown module type:', moduleOpts.type);
        break;
      case SECTION_TYPES.RECENT:
      case 'instagram':
      case 'newsletter':
      case 'tag':
        break;
      case 'trending':
        return <SectionOptions data={moduleOpts} updateOptions={this.updateOptions} />;
      case 'tagTileBox':
      case 'tagOverlapTitle':
      case 'recentAndTrending':
        return <TagTileBoxOptions data={moduleOpts} updateOptions={this.updateOptions} />;
      case 'splitTagBox':
        return <SplitTagBoxOptions data={moduleOpts} updateOptions={this.updateOptions} />;
    }

    return null;
  };

  public render() {
    const { isVisible, onCancel } = this.props;
    const { newItem, moduleCategory } = this.state;

    const queryStr = queryObj2Str(newItem.query);
    const typeHasQuery =
      newItem.module_opts && !['instagram', 'newsletter'].includes(newItem.module_opts.type);

    return (
      <Modal transparent={true} visible={isVisible}>
        <View style={styles.centerItems}>
          <View
            style={{
              ...styles.card,
              width: 700,
              backgroundColor: 'white',
              marginTop: '15vh',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#666'
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                ...styles.centerItems
              }}
            >
              <AdminInput
                label="Module Category"
                input={
                  <Picker
                    selectedValue={moduleCategory}
                    onValueChange={moduleCategory => this.setState({ moduleCategory })}
                  >
                    <Picker.Item label="link" value="link" />
                    <Picker.Item label="acquisition" value="acquisition" />
                  </Picker>
                }
              />
              <AdminInput
                label="Type"
                input={
                  <ModuleTypePicker
                    moduleCategory={moduleCategory}
                    selectedValue={newItem.module_opts && newItem.module_opts.type}
                    onValueChange={
                      (type: SECTION_TYPES) =>
                        this.updateOptions({
                          type
                        } as any) // Not sure why enum isn't working
                    }
                  />
                }
              />
              {newItem.module_opts &&
                this.renderModuleSpecificOptions(newItem.module_opts as AllModuleDataTypes)}
              {typeHasQuery && (
                <AdminInput
                  label="Query:"
                  input={
                    <AdminTextInput
                      onChangeText={(query: string) => this.updateQuery(query)}
                      value={queryStr}
                    />
                  }
                />
              )}
              <View style={{ flexGrow: 3 }}>
                <View style={{ flexDirection: 'row', ...styles.centerItems }}>
                  <View style={{ margin: '1rem' }}>
                    <Button title="Save" onPress={this.save} />
                  </View>
                  <View style={{ margin: '1rem' }}>
                    <Button title="Cancel" color="#CCC" onPress={onCancel} />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexGrow: 3 }} />
        </View>
      </Modal>
    );
  }
}
