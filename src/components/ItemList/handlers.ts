/* eslint-disable no-console */
import { SectionsIconType } from '@/types/data';
import { convertCategoryToNumber, getFullItemList } from './getFullItemList';
import { Dispatch, SetStateAction } from 'react';

export const removeEmptyItems = (items: Record<number, string[]>): Record<number, string[]> => {
  return Object.keys(items).reduce((acc: Record<number, string[]>, key) => {
    if (items[Number(key)].length > 0) {
      acc[Number(key)] = items[Number(key)];
    }
    return acc;
  }, {});
};

export const getItems = (
  previousItems: Record<number, string[]>,
  value: boolean,
  itemKey: string,
  name: SectionsIconType
): Record<number, string[]> => {
  const categoryNumber = convertCategoryToNumber(name);
  const currentItems = previousItems[categoryNumber] ?? [];

  if (!value) {
    const newItems = currentItems.filter((item) => item !== itemKey);
    return removeEmptyItems({ ...previousItems, [categoryNumber]: newItems });
  }

  if (currentItems.includes(itemKey)) {
    return previousItems;
  }

  return { ...previousItems, [categoryNumber]: [...currentItems, itemKey] };
};

export const handleToggle = (
  value: boolean,
  item: string,
  name: SectionsIconType,
  setItems: Dispatch<SetStateAction<Record<number, string[]>>>
): void => {
  setItems((items) => getItems(items, value, item, name));
};

export const selectAll = (
  checked: boolean,
  name: SectionsIconType,
  itemsList: string[],
  allSelectedNames: SectionsIconType[],
  setAllSelectedNames: Dispatch<SetStateAction<SectionsIconType[]>>,
  setItems: Dispatch<SetStateAction<Record<number, string[]>>>
): void => {
  if (allSelectedNames.indexOf(name) !== -1) {
    setAllSelectedNames(allSelectedNames.filter((selectedName) => selectedName !== name));
  } else {
    setAllSelectedNames([...allSelectedNames, name]);
  }
  itemsList.forEach((item) => {
    handleToggle(checked, item, name, setItems);
  });
};

export const getSelectedNames = (items: Record<number, string[]>): SectionsIconType[] => {
  console.log(items);
  return getFullItemList().reduce((acc: SectionsIconType[], { name, items: itemsList }) => {
    const categoryNumber = convertCategoryToNumber(name);
    const selectedItems = items[categoryNumber] || [];
    if (selectedItems.length === itemsList.length) {
      acc = [...acc, name];
    }
    return acc;
  }, []);
};
