import React, { PureComponent } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';

import { queryObj2Str } from './admin-utils';

import { AllModuleDataTypes, TagTileBoxModuleData, TrendingModuleData } from '../../types';
import { KeyedModuleSpec } from './module-list-utils';
import styles from './styles';

interface Props {
  item: KeyedModuleSpec;
  onOpenEditClick: VoidFunction;
  onOpenDeleteClick: VoidFunction;
  onMove: VoidFunction;
  onMoveEnd: VoidFunction;
}

function renderSectionOptions(moduleOpts: TagTileBoxModuleData | TrendingModuleData) {
  const { sectionLink, sectionColor, sectionTitle } = moduleOpts;
  return (
    <View>
      <Text>Section Title: {sectionTitle}</Text>
      <Text>Section Link: {sectionLink}</Text>
      <Text>
        Section Color: <Text>{sectionColor}</Text>
        <View style={{ width: '1em', backgroundColor: sectionColor, height: '1em' }} />
      </Text>
    </View>
  );
}

function renderModuleSpecificOpts(moduleOpts: AllModuleDataTypes) {
  switch (moduleOpts.type) {
    default:
      console.error('Unknown module type:', moduleOpts.type);
      break;
    case 'recent':
      break;
    case 'instagram':
      break;
    case 'newsletter':
      break;
    case 'trending':
      return renderSectionOptions(moduleOpts);
    case 'tagTileBox':
      const sectionOpts = renderSectionOptions(moduleOpts);
      const { order } = moduleOpts;

      return (
        <>
          {sectionOpts}
          <View>
            <Text>2x Box on Bottom?: {order === 2 ? 'yes' : 'no'}</Text>
          </View>
        </>
      );
  }

  return null;
}

export default class ModuleListItem extends PureComponent<Props> {
  public render() {
    const { item, onOpenEditClick, onOpenDeleteClick, onMove, onMoveEnd } = this.props;

    const { module_opts, query } = item;
    const moduleOpts = (module_opts || {}) as AllModuleDataTypes;
    const { type } = moduleOpts;
    const moduleOptsBox = module_opts ? renderModuleSpecificOpts(moduleOpts) : null;

    const handle = {
      borderLeftColor: (moduleOpts as any).sectionColor || '#999',
      borderLeftWidth: 5,
      paddingLeft: 10,
      marginLeft: -5
    };

    const showQuery = typeof query === 'object';
    const queryStr = queryObj2Str(query);

    return (
      <TouchableOpacity style={styles.card} onPressIn={onMove} onPressOut={onMoveEnd}>
        <View style={handle}>
          <View>
            <Text>Type: {type}</Text>
          </View>
          {moduleOptsBox}
          {showQuery && (
            <View>
              <Text>Query: {queryStr}</Text>
            </View>
          )}
        </View>
        <View style={{ margin: '1rem', flexDirection: 'row' }}>
          <View style={{ flexGrow: 1, margin: 5 }}>
            <Button title="EDIT" onPress={onOpenEditClick} />
          </View>
          <View style={{ flexGrow: 1, margin: 5 }}>
            <Button title="DELETE" onPress={onOpenDeleteClick} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
