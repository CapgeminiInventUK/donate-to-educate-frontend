import FormButton from '@/components/FormButton/FormButton';
import { FC } from 'react';
import styles from './DeclineDeleteModal.module.scss';
import { DeclineDeleteModalProps } from '@/types/props';
import Card from '@/components/Card/Card';

const DeclineDeleteModal: FC<DeclineDeleteModalProps> = ({
  showModal,
  setShowModal,
  onConfirm,
  bodyText,
  confirmText,
}) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <Card className={styles.modalCard}>
        <h2>Are you sure?</h2>
        <p>{bodyText}</p>
        <div className={styles.actionButtons}>
          <FormButton
            theme={'formButtonGrey'}
            onClick={(): void => setShowModal(false)}
            text={'Go back'}
            ariaLabel="back"
          />
          <FormButton
            theme={'formButtonRed'}
            onClick={() => {
              setShowModal(false);
              onConfirm();
            }}
            ariaLabel={confirmText}
            text={confirmText}
          />
        </div>
      </Card>
    </div>
  );
};

export default DeclineDeleteModal;
