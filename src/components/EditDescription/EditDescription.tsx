import Button from '@/components/Button/Button';
import FormButton from '@/components/FormButton/FormButton';
import TextArea from '@/components/TextArea/TextArea';
import type { EditDescriptionProps } from '@/types/props';
import type { FC } from 'react';
import styles from './EditDescription.module.scss';

export const EditDescription: FC<EditDescriptionProps> = ({
  value,
  setValue,
  handleSave,
  handleCancel,
}) => {
  return (
    <>
      <TextArea characterLimit={1000} value={value} onChange={setValue} ariaLabel="edit" />
      <div className={styles.actionContainer}>
        <FormButton text={'Save'} onClick={handleSave} theme="formButtonGreen" ariaLabel="save" />
        <Button
          theme="link"
          className={styles.cancelButton}
          text={'Cancel'}
          onClick={handleCancel}
          ariaLabel="cancel"
        />
      </div>
    </>
  );
};
