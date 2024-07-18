import Card from '@/components/Card/Card';
import FormButton from '@/components/FormButton/FormButton';
import type { DeclineDeleteModalProps } from '@/types/props';
import type { FC } from 'react';
import styles from './DeclineDeleteModal.module.scss';

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
            ariaLabel={'confirm'}
            text={confirmText}
          />
        </div>
      </Card>
    </div>
  );
};

export default DeclineDeleteModal;
