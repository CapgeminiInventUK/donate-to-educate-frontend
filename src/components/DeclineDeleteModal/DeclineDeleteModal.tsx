import FormButton from '@/components/FormButton/FormButton';
import { FC } from 'react';
import styles from './DeclineDeleteModal.module.scss';
import { DeclineDeleteModalProps } from '@/types/props';

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
      <div className={styles.card}>
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
      </div>
    </div>
  );
};

export default DeclineDeleteModal;
