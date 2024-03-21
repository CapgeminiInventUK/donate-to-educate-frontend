import { FC } from 'react';
import styles from './ItemList.module.scss';
import { ItemsIconType, SectionsIconType, getItemsIcon, getSectionsIcon } from './getIcons';
import { convertNumberToCategory } from './getFullItemList';

interface ItemListProps {
  type: ItemsIconType;
  items?: Record<string, SectionsIconType>;
}

const ItemList: FC<ItemListProps> = ({ type, items = {} }) => {
  const itemsArray = Object.entries(items).reduce(
    (acc, [item, section]) => {
      const existingSection = acc.findIndex((it) => it.name === section);
      if (existingSection !== -1) {
        acc[existingSection].items.push(item);
      } else {
        acc.push({ name: section, items: [item] });
      }
      return acc;
    },
    [] as { name: SectionsIconType; items: string[] }[]
  );

  return (
    <div className={styles.container}>
      {itemsArray.map(({ name, items }) => {
        const category = convertNumberToCategory(Number(name));
        return (
          <div key={category}>
            <div className={styles.sectionHeader}>
              {getSectionsIcon(category)}
              <h3>{category}</h3>
              <div className={styles.hr}></div>
            </div>
            <ul className={styles.list}>
              {items.map((item) => {
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
