let nextKey = 0;
function getModuleKey() {
  return nextKey++;
}

export function getListWithKeys(list) {
  return list.map(i => ({
    ...i,
    key: getModuleKey(),
  }));
}

export function getNewModule() {
  const key = getModuleKey();

  const newModule = {
    module_opts: {
      type: "newsletter",
    },
    key,
    isNew: true,
  };

  return newModule;
}

export function replaceItem(list, newItem, opts = {}) {
  const idx = list.findIndex(({ key }) => newItem.key === key);
  const newList = list.slice(0);

  if (opts.doDelete) {
    newList.splice(idx, 1);
  } else {
    newList[idx] = newItem;
  }

  return newList;
}

export async function saveList(list) {
  const API_ENDPOINT = document.location.href;
  const formData = new FormData();
  formData.append("module_list", JSON.stringify(list));

  await fetch(API_ENDPOINT, {
    method: "POST",
    body: formData,
  });
}
