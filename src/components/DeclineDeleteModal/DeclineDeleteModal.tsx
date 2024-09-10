import FormButton from '@/components/FormButton/FormButton';
import { FC } from 'react';
import styles from './DeclineDeleteModal.module.scss';
import { DeclineDeleteModalProps } from '@/types/props';
import Card from '@/components/Card/Card';
import AlertCircleBlue from '@/assets/warning/AlertCircleBlue';

const DeclineDeleteModal: FC<DeclineDeleteModalProps> = ({
  showModal,
  setShowModal,
  onConfirm,
  bodyText,
  confirmText,
  header = 'Are you sure?',
  subHeader,
  icon,
  deleteButtonTheme = 'formButtonRed',
}) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <Card className={styles.modalCard}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <h2>{header}</h2>
        {subHeader && (
          <h4>
            <AlertCircleBlue /> {subHeader}
          </h4>
        )}
        <p>{bodyText}</p>
        <div className={styles.actionButtons}>
          <FormButton
            theme={'formButtonGrey'}
            onClick={(): void => setShowModal(false)}
            text={'Go back'}
            ariaLabel="back"
          />
          <FormButton
            theme={deleteButtonTheme}
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
