import { FC } from 'react';
import ItemList from '@/components/ItemList/ItemList';
import { ItemsIconType } from '@/components/ItemList/getIcons';
import styles from './ItemSelection.module.scss';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import BackButton from '@/components/BackButton/BackButton';
import FormButton from '@/components/FormButton/FormButton';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import Card from '@/components/Card/Card';
import { ItemSelectionProps } from '@/types/props';

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

const getButtonTextFromType = (type: string): string => {
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

const ItemSelection: FC<ItemSelectionProps> = ({
  schoolOrCharity,
  items,
  actionText,
  whatToExpect,
  id,
  name,
}) => {
  const navigate = useNavigate();
  const { state } = useLocationStateOrRedirect<{ type: ItemsIconType }>(Paths.HOME);
  const { type } = state;

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <div className={`${styles.banner} ${styles[type]}`}>
        <h2>{getTitleFromType(type)}</h2>
      </div>
      <Card className={styles.itemsCard}>
        <h2>What to expect</h2>
        <p>{whatToExpect ?? ''}</p>
        <ItemList type={type} items={items} />
        <div className={styles.actionButtons}>
          <p>{actionText ?? ''}</p>
          <FormButton
            theme="formButtonGreen"
            text={getButtonTextFromType(type)}
            fullWidth
            onClick={() =>
              navigate(getPathFromType(schoolOrCharity), { state: { type, id, name } })
            }
            ariaLabel="contact"
          />
        </div>
      </Card>
    </div>
  );
};

const getPathFromType = (type: string): string =>
  type === 'school' ? Paths.REQUEST_SCHOOL_PRODUCTS : Paths.REQUEST_CHARITY_PRODUCTS;

export default ItemSelection;
