import { FC, useState } from 'react';
import ItemList from '@/components/ItemList/ItemList';
import { ItemsIconType, SectionsIconType } from '@/components/ItemList/getIcons';
import styles from './ItemSelection.module.scss';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import BackButton from '@/components/BackButton/BackButton';
import FormButton from '@/components/FormButton/FormButton';

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

export const getButtonTextFromType = (type: string): string => {
  switch (type) {
    case 'tick':
      return 'Request products';
    case 'heart':
      return 'Donate products';
    case 'plus':
      return 'Take extra stock';
    default:
      throw new Error(`Unknown type ${type}`);
  }
};

interface ItemSelectionProps {
  schoolOrCharity: 'school' | 'charity';
}

const ItemSelection: FC<ItemSelectionProps> = ({ schoolOrCharity }) => {
  const location = useLocation();
  const navigate = useNavigate();
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
        <div className={styles.actionButtons}>
          <FormButton
            theme="formButtonGreen"
            text={getButtonTextFromType(type)}
            fullWidth
            onClick={() => navigate(getPathFromType(schoolOrCharity), { state: { type } })}
            ariaLabel="contact"
          />
        </div>
      </div>
    </div>
  );
};

const getPathFromType = (type: string): string =>
  type === 'school' ? Paths.REQUEST_SCHOOL_PRODUCTS : Paths.REQUEST_CHARITY_PRODUCTS;

export default ItemSelection;
