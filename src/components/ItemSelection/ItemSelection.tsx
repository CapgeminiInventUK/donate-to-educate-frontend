import BackButton from '@/components/BackButton/BackButton';
import Card from '@/components/Card/Card';
import FormButton from '@/components/FormButton/FormButton';
import ItemList from '@/components/ItemList/ItemList';
import Paths from '@/config/paths';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import type { ItemsIconType } from '@/types/data';
import type { ItemSelectionProps } from '@/types/props';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ItemSelection.module.scss';
import { getButtonTextFromType, getPathFromType, getTitleFromType } from './getFromTypes';

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
          <p>{whatToExpect}</p>
        </div>
        <ItemList type={type} items={items} />
        <div className={styles.actionButtons}>
          <h2>Next steps</h2>
          <p>{actionText}</p>
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

export default ItemSelection;
