import { FC, useState } from 'react';
import ItemList from '@/components/ItemList/ItemList';
import { ItemsIconType, SectionsIconType } from '@/components/ItemList/getIcons';
import styles from './SchoolEdit.module.scss';
import { Navigate, useLocation } from 'react-router-dom';
import Paths from '@/config/paths';
import BackButton from '@/components/BackButton/BackButton';

const getTitleFromType = (type: string): string => {
  switch (type) {
    case 'tick':
      return 'Request products';
    case 'heart':
      return 'Donate products';
    case 'plus':
      return 'Extra stock to share with the community';
    default:
      throw new Error(`Unknown type ${type}`);
  }
};

const SchoolEdit: FC = () => {
  const location = useLocation();
  const [items] = useState<Record<string, SectionsIconType>>({
    Blazer: 'Clothing and uniform',
    Computer: 'Computing and technology',
  });

  if (!(location.state && 'type' in location.state)) {
    return <Navigate to={Paths.HOME} />;
  }

  const { type } = location.state as { type: ItemsIconType };

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <div className={`${styles.banner} ${styles[type]}`}>
        <h2>{getTitleFromType(type)}</h2>
      </div>
      <div className={styles.card}>
        <ItemList type={type} items={items} />
      </div>
    </div>
  );
};

export default SchoolEdit;
