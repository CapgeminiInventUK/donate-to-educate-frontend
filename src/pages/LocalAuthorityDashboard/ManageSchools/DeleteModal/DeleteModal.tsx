import FormButton from '@/components/FormButton/FormButton';
import { FC } from 'react';
import styles from './DeleteModal.module.scss';

interface DeleteModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  onConfirm: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({ showModal, setShowModal, onConfirm }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.card}>
        <h2>Are you sure?</h2>
        <p>
          This will remove the school&aposs profile and information. They will need to resubmit an
          application to rejoin Donate to Educate.
        </p>
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
            ariaLabel="decline"
            text={'Remove connection'}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
