import { SECTION_TYPES } from '@/constants';
import { isDevEnv } from '@/utils';
import { ModuleSpec } from '../../types';

export interface KeyedModuleSpec extends Partial<ModuleSpec> {
  key: number;
  isNew?: boolean;
}

let nextKey = 0;
function getModuleKey() {
  return nextKey++;
}

export function getListWithKeys<T>(list: T[]) {
  return list.map(i => ({
    ...i,
    key: getModuleKey()
  }));
}

export function getNewModule() {
  const key = getModuleKey();

  const newModule: KeyedModuleSpec = {
    module_opts: {
      type: SECTION_TYPES.NEWSLETTER
    },
    key,
    isNew: true
  };

  return newModule;
}

export interface ReplaceItemOpts {
  doDelete?: boolean;
}
export function replaceItem<T extends { key: any }>(
  list: T[],
  newItem: T,
  opts: ReplaceItemOpts = {}
) {
  const idx = list.findIndex(({ key }) => newItem.key === key);
  const newList = list.slice(0);

  if (opts.doDelete) {
    newList.splice(idx, 1);
  } else {
    newList[idx] = newItem;
  }

  return newList;
}

export async function saveList<T>(list: T[]) {
  const API_ENDPOINT = document.location.href;
  const formData = new FormData();
  formData.append('module_list', JSON.stringify(list));

  await fetch(API_ENDPOINT, {
    method: 'POST',
    body: formData
  });

  if (isDevEnv()) {
    return new Promise(resolve => setTimeout(resolve, 10000));
  }
}
