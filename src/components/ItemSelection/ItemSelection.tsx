import { FC } from 'react';
import ItemList from '@/components/ItemList/ItemList';
import styles from './ItemSelection.module.scss';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import BackButton from '@/components/BackButton/BackButton';
import FormButton from '@/components/FormButton/FormButton';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import Card from '@/components/Card/Card';
import { ItemSelectionProps } from '@/types/props';
import { ItemsIconType } from '@/types/data';

const getTitleFromType = (type: string): string => {
  switch (type) {
    case 'tick':
      return 'Request products';
    case 'heart':
      return 'Donate products';
    case 'plus':
      return 'Check extra stock';
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
  previewMode,
  postcode,
}) => {
  const navigate = useNavigate();
  const { state } = useLocationStateOrRedirect<{ type: ItemsIconType }>(Paths.HOME);
  const { type } = state;

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <div className={`${styles.banner} ${styles[type]}`}>
        <h1>{getTitleFromType(type)}</h1>
      </div>
      <Card className={styles.itemsCard}>
        <div className={styles.helpBanner}>
          <h2>What to expect</h2>
          <p>{whatToExpect ?? ''}</p>
        </div>
        <ItemList type={type} items={items} />
        <div className={styles.actionButtons}>
          <h2>Next steps</h2>
          <p>{actionText ?? ''}</p>
          <FormButton
            theme={previewMode ? 'formButtonGreenDisabled' : 'formButtonGreen'}
            text={getButtonTextFromType(type)}
            disabled={previewMode}
            fullWidth={true}
            onClick={() =>
              navigate(getPathFromType(schoolOrCharity), { state: { type, id, name, postcode } })
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
