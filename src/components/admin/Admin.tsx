import React, { PureComponent } from 'react';
import { FaCheck, FaSave } from 'react-icons/fa';
import { ActivityIndicator, Button, Text } from 'react-native';

import { generateFakeData } from './admin-utils';
import FloatingActionButton from './FloatingActionButton';
import { getListWithKeys, KeyedModuleSpec, saveList } from './module-list-utils';
import ModuleListCtl from './ModuleListCtl';
import styles from './styles';
import { ModuleSpec } from '@/types';
import { ResponsiveProvider } from '@/components/utils';
import { View } from '@/components/primitives';
import PageSections from '@/PageFactory';

const SAVING_STATES = {
  NOT_SAVING: 0,
  SAVING: 1,
  SAVED: 2
};

interface State {
  moduleList: KeyedModuleSpec[];
  isPreview: boolean;
  savingState: number;
}

interface Props {
  moduleList: ModuleSpec[];
  tagId?: number;
}

export default class Admin extends PureComponent<Props, State> {
  public state: State;

  public constructor(props: Props) {
    super(props);

    window.disableLazyLoad = true;
    const moduleList: KeyedModuleSpec[] = getListWithKeys(this.props.moduleList);

    // Load initial data from props, but ignore after
    this.state = {
      moduleList,
      isPreview: false,
      savingState: SAVING_STATES.NOT_SAVING
    };
  }

  public updateModuleList = ({ moduleList }: { moduleList: KeyedModuleSpec[] }) =>
    this.setState({ moduleList });
  public saveModuleList = async () => {
    console.log('saving');

    this.setState({ savingState: SAVING_STATES.SAVING });
    await saveList(this.state.moduleList, this.props.tagId);
    this.setState({ savingState: SAVING_STATES.SAVED });
    setTimeout(() => this.setState({ savingState: SAVING_STATES.NOT_SAVING }), 2000);

    console.log('done');
  };

  public render() {
    const { moduleList, isPreview, savingState } = this.state;

    const data = moduleList.map(generateFakeData);

    const tag = (window as any).tag_slug || this.props.tagId;

    return (
      <View>
        {tag &&
          <View style={styles.centerItems}>
            <View style={[styles.card, styles.centerItems]}>
              <Text style={styles.headline}>Editing Tag: {tag}</Text>
            </View>
          </View>
        }
        <Button
          onPress={() => this.setState({ isPreview: !isPreview })}
          title={isPreview ? 'Close' : 'Preview'}
        />
        {!isPreview ? (
          <ModuleListCtl
            moduleList={moduleList}
            updateModuleList={this.updateModuleList}
          />
        ) : (
          <View>
            <ResponsiveProvider>
              <PageSections data={data} />
            </ResponsiveProvider>
          </View>
        )}
        <FloatingActionButton
          onPress={this.saveModuleList}
          icon={<FaSave color='white' />}
          index={0}
          disabled={savingState != SAVING_STATES.NOT_SAVING}
        />
        {savingState != SAVING_STATES.NOT_SAVING && (
          <View style={styles.savingAlert}>
            {savingState == SAVING_STATES.SAVING && (
                            <>
                                <ActivityIndicator size='large' />
                                <Text>Saving...</Text>
                            </>
            )}
            {savingState == SAVING_STATES.SAVED && (
                            <>
                                <FaCheck />
                                <Text>Saved.</Text>
                            </>
            )}
          </View>
        )}
      </View>
    );
  }
}
