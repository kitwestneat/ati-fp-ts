import React, { PureComponent } from 'react';
import { View } from 'react-native';
import DraggableFlatList from '@/third-party/react-native-draggable-flatlist';

import FloatingActionButton from './FloatingActionButton';
import ModuleListItem from './ModuleListItem';
import ModuleEditDialog from './ModuleEditDialog';
import ModuleDeleteDialog from './ModuleDeleteDialog';

import { getNewModule, replaceItem, KeyedModuleSpec, ReplaceItemOpts } from './module-list-utils';
import styles from './styles';

interface Props {
  moduleList: KeyedModuleSpec[];
  updateModuleList: (o: { moduleList: KeyedModuleSpec[] }) => void;
}

interface State {
  currentlyEditing: number;
  currentlyDeleting: number;
}

export default class ModuleListCtl extends PureComponent<Props, State> {
  state = {
    currentlyEditing: -1,
    currentlyDeleting: -1
  };

  addItem = () => {
    const { moduleList, updateModuleList } = this.props;

    const module: KeyedModuleSpec = getNewModule();

    updateModuleList({ moduleList: moduleList.concat(module) });

    this.setState({ currentlyEditing: module.key });
  };

  updateItem = (newItem: KeyedModuleSpec, opts?: ReplaceItemOpts) => {
    const { moduleList, updateModuleList } = this.props;

    const newList = replaceItem(moduleList, newItem, opts);
    updateModuleList({ moduleList: newList });

    this.closeEdit();
  };

  deleteItem = (item: KeyedModuleSpec) => this.updateItem(item, { doDelete: true });

  closeEdit = () => this.setState({ currentlyEditing: -1 });
  closeDelete = () => this.setState({ currentlyDeleting: -1 });

  cancel = (item: KeyedModuleSpec) => {
    // if we were editing a new item, have cancel delete it
    if (item.isNew) {
      this.deleteItem(item);
    }

    this.closeEdit();
  };

  renderItem = ({ item, move, moveEnd }: { item: KeyedModuleSpec; move: any; moveEnd: any }) => {
    const { currentlyDeleting, currentlyEditing } = this.state;

    const isEditing = item.key === currentlyEditing;
    const isDeleting = item.key === currentlyDeleting;

    const onDelete = () => this.deleteItem(item);
    const onEditCancel = () => this.cancel(item);

    return (
      <>
        <ModuleListItem
          item={item}
          onOpenEditClick={() => this.setState({ currentlyEditing: item.key })}
          onOpenDeleteClick={() => this.setState({ currentlyDeleting: item.key })}
          onMove={move}
          onMoveEnd={moveEnd}
        />
        {isEditing && (
          <ModuleEditDialog
            isVisible={true}
            onSave={this.updateItem}
            onCancel={onEditCancel}
            item={item}
          />
        )}
        {isDeleting && (
          <ModuleDeleteDialog isVisible={true} onCancel={this.closeDelete} onOk={onDelete} />
        )}
      </>
    );
  };

  render() {
    const { moduleList, updateModuleList } = this.props;
    const { currentlyEditing, currentlyDeleting } = this.state;

    const watchedState = {
      currentlyEditing,
      currentlyDeleting
    };

    return (
      <View style={styles.centerItems}>
        <DraggableFlatList
          data={moduleList}
          renderItem={this.renderItem}
          extraData={watchedState}
          onMoveEnd={({ data }: { data: KeyedModuleSpec[] }) =>
            updateModuleList({ moduleList: data })
          }
        />
        <FloatingActionButton onPress={this.addItem} index={1} />
      </View>
    );
  }
}
