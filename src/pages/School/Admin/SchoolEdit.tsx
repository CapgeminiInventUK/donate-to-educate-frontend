import { FC, useState } from 'react';
import styles from './SchoolEdit.module.scss';
import ItemListEdit from '@/components/ItemList/ItemListEdit';
import FormButton from '@/components/FormButton/FormButton';
import ItemList from '@/components/ItemList/ItemList';
import { ItemsIconType } from '@/components/ItemList/getIcons';

const type = 'tick';

const SchoolEdit: FC = () => {
  const [preview, setPreview] = useState(false);

  return (
    <div className={styles.container}>
      <div className={`${styles.banner} ${styles[type]}`}>
        <h2>{getBannerText(type)}</h2>
      </div>
      <div className={styles.card}>
        {!preview && (
          <>
            <ItemListEdit type={type} />
            <FormButton
              theme={'formButtonGrey'}
              onClick={(): void => setPreview(true)}
              text={'Preview'}
            />
          </>
        )}
        {preview && (
          <>
            <ItemList type={type} />
            <FormButton
              theme={'formButtonDarkBlue'}
              onClick={(): void => setPreview(false)}
              text={'Edit'}
            />
          </>
        )}
      </div>
    </div>
  );
};

const getBannerText = (type: ItemsIconType): string => {
  switch (type) {
    case 'tick':
      return 'Request products';
    case 'heart':
      return 'Donate products';
    case 'plus':
      return 'Extra stock to share with the community';
    default:
      throw new Error(`Unknown type ${String(type)}`);
  }
};

export default SchoolEdit;
