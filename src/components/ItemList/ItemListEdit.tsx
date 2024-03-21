import { FC } from 'react';
import styles from './ItemList.module.scss';
import { convertCategoryToNumber, getFullItemList } from './getFullItemList';
import Checkbox from '../Checkbox/Checkbox';
import { SectionsIconType, getSectionsIcon } from './getIcons';

interface ItemListEditProps {
  setItems: React.Dispatch<React.SetStateAction<Record<string, SectionsIconType>>>;
  items: Record<string, SectionsIconType>;
}

const ItemListEdit: FC<ItemListEditProps> = ({ setItems, items }) => {
  const handleToggle = (value: boolean, itemKey: string, name: SectionsIconType): void => {
    const categoryNumber = convertCategoryToNumber(name);
    setItems((previousItems) => {
      // Add
      if (value) {
        return { ...previousItems, [itemKey]: categoryNumber as unknown as SectionsIconType };
      }

      // Remove
      const { [itemKey]: _, ...rest } = previousItems;
      return rest;
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
              {itemsList.map((item) => {
                // eslint-disable-next-line no-console
                console.log(items[item], item, items);
                const checkValue =
                  items && item in items && convertCategoryToNumber(name) === Number(items[item]);
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
