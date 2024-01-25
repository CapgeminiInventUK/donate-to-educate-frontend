import TextArea from '@/components/TextArea/TextArea';
import FormButton from '@/components/FormButton/FormButton';
import styles from './EditDescription.module.scss';
import Button from '@/components/Button/Button';
import { FC } from 'react';

export const EditDescription: FC<{
  value: string;
  setValue: (val: string) => void;
  handleSave: () => void;
  handleCancel: () => void;
}> = ({ value, setValue, handleSave, handleCancel }) => {
  return (
    <>
      <TextArea
        characterLimit={1000}
        value={value}
        onChange={(val) => {
          setValue(val);
        }}
      />
      <div className={styles.actionContainer}>
        <FormButton text={'Save'} onClick={handleSave} theme="formButtonGreen" />
        <Button
          theme="link"
          className={styles.cancelButton}
          text={'Cancel'}
          onClick={handleCancel}
        />
      </div>
    </>
  );
};
