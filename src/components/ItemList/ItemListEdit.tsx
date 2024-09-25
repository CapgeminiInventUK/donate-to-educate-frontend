import { FC, useEffect, useState } from 'react';
import styles from './ItemList.module.scss';
import { convertCategoryToNumber, getFullItemList } from './getFullItemList';
import Checkbox from '../Checkbox/Checkbox';
import { getSectionsIcon } from './getIcons';
import { SectionsIconType } from '@/types/data';
import { ItemListEditProps } from '@/types/props';
import { getSelectedNames, handleToggle, selectAll } from './handlers';

const ItemListEdit: FC<ItemListEditProps> = ({ setItems, items }) => {
  const [allSelectedNames, setAllSelectedNames] = useState<SectionsIconType[]>([]);

  useEffect(() => {
    setAllSelectedNames(getSelectedNames(items));
  }, [items]);

  return (
    <div className={styles.container}>
      {getFullItemList().map(({ name, items: itemsList }) => {
        const isAllSelected = allSelectedNames.includes(name);
        return (
          <div key={`${name}-edit`}>
            <div className={styles.sectionHeader}>
              {getSectionsIcon(name)}
              <h3>{name}</h3>
              <div className={styles.hr}></div>
            </div>
            <ul className={styles.list}>
              <li
                className={`${styles.selectAll} ${allSelectedNames.includes(name) ? styles.bold : ''}`}
              >
                <Checkbox
                  onChange={(checked) =>
                    selectAll(
                      checked,
                      name,
                      itemsList,
                      allSelectedNames,
                      setAllSelectedNames,
                      setItems
                    )
                  }
                  ariaLabel={`${name}-select-all-edit`}
                  value={isAllSelected}
                />
                <span>Select all</span>
              </li>
              {itemsList.map((item) => {
                const categoryNumber = convertCategoryToNumber(name);
                const checkValue = categoryNumber in items && items[categoryNumber]?.includes(item);
                return (
                  <li
                    key={`${name}-${item}-edit`}
                    className={`${styles.listItem} ${checkValue ? styles.bold : ''}`}
                  >
                    <Checkbox
                      onChange={(checked) => handleToggle(checked, item, name, setItems)}
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
