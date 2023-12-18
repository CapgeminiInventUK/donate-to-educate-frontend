import { FC } from 'react';
import styles from './ItemList.module.scss';
import { getFullItemList } from './getFullItemList';
import { ItemsIconType } from './getIcons';

interface ItemListProps {
  type: ItemsIconType;
}

const ItemList: FC<ItemListProps> = ({ type }) => {
  return (
    <div className={styles.container}>
      {getFullItemList(type).map(({ icon, name, items, itemIcon }) => {
        return (
          <div key={name}>
            <div className={styles.sectionHeader}>
              {icon}
              <h3>{name}</h3>
              <div className={styles.hr}></div>
            </div>
            <ul className={styles.list}>
              {items.map((item) => {
                return (
                  <li key={`${name}-${item}`} className={styles.listItem}>
                    {itemIcon}
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
