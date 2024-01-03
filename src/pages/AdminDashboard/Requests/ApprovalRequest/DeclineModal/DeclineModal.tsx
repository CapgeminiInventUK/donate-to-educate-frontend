import FormButton from '@/components/FormButton/FormButton';
import { FC } from 'react';
import styles from './DeclineModal.module.scss';

interface DeclineModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  doSomething: () => void;
}

const DeclineModal: FC<DeclineModalProps> = ({ showModal, setShowModal, doSomething }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.card}>
        <h2>Are you sure?</h2>
        <p>
          If you cannot identify this connection or confirm they are connected to the school, you
          may decline them.
        </p>
        <div className={styles.actionButtons}>
          <FormButton
            theme={'formButtonGrey'}
            onClick={(): void => setShowModal(false)}
            text={'Go back'}
          />
          <FormButton
            theme={'formButtonRed'}
            onClick={() => {
              setShowModal(false);
              doSomething();
            }}
            text={'Decline request'}
          />
        </div>
      </div>
    </div>
  );
};

export default DeclineModal;
