import { FC, useState } from 'react';
import styles from './ItemList.module.scss';
import { convertCategoryToNumber, getFullItemList } from './getFullItemList';
import Checkbox from '../Checkbox/Checkbox';
import { SectionsIconType, getSectionsIcon } from './getIcons';

interface ItemListEditProps {
  setItems: React.Dispatch<React.SetStateAction<Record<number, string[]>>>;
  items: Record<number, string[]>;
}

const ItemListEdit: FC<ItemListEditProps> = ({ setItems, items }) => {
  const [allSelectedNames, setAllSelectedNames] = useState<string[]>([]);
  const handleToggle = (value: boolean, itemKey: string, name: SectionsIconType): void => {
    const categoryNumber = convertCategoryToNumber(name);
    setItems((previousItems) => {
      const currentItems = previousItems[categoryNumber] ?? [];

      if (value) {
        if (currentItems.includes(itemKey)) {
          return previousItems;
        }
        return { ...previousItems, [categoryNumber]: [...currentItems, itemKey] };
      }

      const newItems = currentItems.filter((item) => item !== itemKey);
      return { ...previousItems, [categoryNumber]: newItems };
    });
  };

  const selectAll = (checked: boolean, name: SectionsIconType, itemsList: string[]): void => {
    if (allSelectedNames.indexOf(name) > -1) {
      allSelectedNames.splice(allSelectedNames.indexOf(name, 0), 1);
    } else {
      setAllSelectedNames([...allSelectedNames, name]);
    }
    itemsList.forEach((item) => {
      handleToggle(checked, item, name);
    });
  };

  return (
    <div className={styles.container}>
      {getFullItemList().map(({ name, items: itemsList }) => {
        return (
          <div key={`${name}-edit`}>
            <div className={styles.sectionHeader}>
              {getSectionsIcon(name)}
              <h3>{name}</h3>
              <div className={styles.hr}></div>
            </div>
            <ul className={styles.list}>
              <li
                className={`${styles.selectAll} ${allSelectedNames.indexOf(name) > -1 ? styles.bold : ''}`}
              >
                <Checkbox
                  onChange={(checked) => selectAll(checked, name, itemsList)}
                  ariaLabel={`${name}-select-all-edit`}
                />
                <span>Select all</span>
              </li>
              {itemsList.map((item) => {
                const categoryNumber = convertCategoryToNumber(name);
                const checkValue =
                  items && categoryNumber in items && items[categoryNumber].includes(item);
                return (
                  <li
                    key={`${name}-${item}-edit`}
                    className={`${styles.listItem} ${checkValue ? styles.bold : ''}`}
                  >
                    <Checkbox
                      onChange={(checked) => handleToggle(checked, item, name)}
                      value={checkValue}
                      ariaLabel={`${name}-${item}-edit`}
                    />
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ItemListEdit;
