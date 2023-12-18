import { FC, useState } from 'react';
import styles from './ItemList.module.scss';
import { getFullItemList } from './getFullItemList';
import Checkbox from '../Checkbox/Checkbox';
import { ItemsIconType } from './getIcons';

interface ItemListEditProps {
  type: ItemsIconType;
}
const ItemListEdit: FC<ItemListEditProps> = ({ type }) => {
  const [items, setItems] = useState({});

  const handleToggle = (value: boolean, itemKey: string): void =>
    setItems((previousItems) => ({ ...previousItems, [itemKey]: value }));
  // eslint-disable-next-line no-console
  console.log(items);
  return (
    <div className={styles.container}>
      {getFullItemList(type).map(({ icon, name, items }) => {
        return (
          <div key={`${name}-edit`}>
            <div className={styles.sectionHeader}>
              {icon}
              <h3>{name}</h3>
              <div className={styles.hr}></div>
            </div>
            <ul className={styles.list}>
              {items.map((item) => {
                return (
                  <li key={`${name}-${item}-edit`} className={styles.listItem}>
                    <Checkbox onChange={(checked) => handleToggle(checked, item)} />
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
