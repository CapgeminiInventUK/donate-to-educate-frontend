import { FC } from 'react';
import styles from './ItemList.module.scss';
import { getItemsIcon, getSectionsIcon } from './getIcons';
import { convertNumberToCategory } from './getFullItemList';
import { ItemListProps } from '@/types/props';

const ItemList: FC<ItemListProps> = ({ type, items = {} }) => {
  return (
    <div className={styles.container}>
      {Object.entries(items).map(([categoryNumber, itemList]) => {
        const category = convertNumberToCategory(Number(categoryNumber));

        if (itemList.length === 0) {
          return null;
        }

        return (
          <div key={category}>
            <div className={styles.sectionHeader}>
              {getSectionsIcon(category)}
              <h3>{category}</h3>
              <div className={styles.hr}></div>
            </div>
            <ul className={styles.list}>
              {itemList.map((item) => {
                return (
                  <li key={`${category}-${item}`} className={styles.listItem}>
                    {getItemsIcon(type)}
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

export default ItemList;
