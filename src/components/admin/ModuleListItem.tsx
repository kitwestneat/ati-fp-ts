import React, { PureComponent } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';

import { AllModuleDataTypes, } from '../../types';
import { queryObj2Str, getModuleTypeLabel } from './admin-utils';

import { KeyedModuleSpec } from './module-list-utils';
import styles from './styles';

interface Props {
  item: KeyedModuleSpec;
  onOpenEditClick: VoidFunction;
  onOpenDeleteClick: VoidFunction;
  onMove: VoidFunction;
  onMoveEnd: VoidFunction;
}

function renderSectionOptions(moduleOpts: any) {
  if (moduleOpts.type == 'recentAndTrending') {
    return null;
  }

  const { sectionLink, sectionColor, sectionTitle, split } = moduleOpts;
  return (
    <View>
      <Text>Section Title: {sectionTitle}</Text>
      <Text>Section Link: {sectionLink}</Text>
      <Text>
        Section Color: <Text>{sectionColor}</Text>
        <View style={{ width: '1em', backgroundColor: sectionColor, height: '1em' }} />
      </Text>
      {moduleOpts.split && 
        <Text>Split: {split}</Text>
      }
    </View>
  );
}

function renderModuleSpecificOpts(moduleOpts: any) {
  switch (moduleOpts.type) {
    default:
      console.error('Unknown module type:', moduleOpts.type);
      break;
    case 'instagram':
      return (<><Text>Account: {moduleOpts.isHU ? 'History Uncovered' : 'ATI'}</Text></>);
    case 'recent':
    case 'newsletter':
    case 'tag':
    case 'recentAndTrending':
      break;
    case 'trending':
      return renderSectionOptions(moduleOpts);
    case 'tagTileBox':
    case 'tagOverlapTitle':
    case 'splitTagBox':
      const sectionOpts = renderSectionOptions(moduleOpts);
      const { order } = moduleOpts;

      return (
        <>
          {sectionOpts}
          <View>
            <Text>2x Box Location: {order === 2 ? 'bottom' : 'top'}</Text>
          </View>
        </>
      );
  }

  return null;
}

export default class ModuleListItem extends PureComponent<Props> {
  public render() {
    const { item, onOpenEditClick, onOpenDeleteClick, onMove, onMoveEnd } = this.props;

    // eslint-disable-next-line camelcase
    const { module_opts, query } = item;
    // eslint-disable-next-line camelcase
    const moduleOpts = (module_opts || {}) as AllModuleDataTypes;
    const { type } = moduleOpts;
    // eslint-disable-next-line camelcase
    const moduleOptsBox = module_opts ? renderModuleSpecificOpts(moduleOpts) : null;

    const handle = {
      borderLeftColor: (moduleOpts as any).sectionColor || '#999',
      borderLeftWidth: 5,
      paddingLeft: 10,
      marginLeft: -5
    };

    const queryStr = queryObj2Str(query);
    const showQuery = queryStr != '' && !queryStr.includes('instagram');

    return (
      <TouchableOpacity style={styles.card} onPressIn={onMove} onPressOut={onMoveEnd}>
        <View style={handle}>
          <View>
            <Text>Type: {getModuleTypeLabel(type)}</Text>
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
