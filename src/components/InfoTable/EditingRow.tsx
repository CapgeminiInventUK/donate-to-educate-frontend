import { FC, useState } from 'react';
import TextInput from '../TextInput/TextInput';
import FormButton from '../FormButton/FormButton';
import styles from './InfoTable.module.scss';
import { EditingRowProps } from '@/types/props';
import { phoneNumberRegex } from '@/utils/globals';
import { phone as validatePhoneNumber } from 'phone';

const EditingRow: FC<EditingRowProps> = ({
  field,
  value,
  setNewTableValues,
  setEditingKey,
  originalTableValues,
  onChange,
  refetch,
}) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [editingValue, setEditingValue] = useState<string>();

  const onCancel = (): void => {
    setNewTableValues(originalTableValues);
    setErrorMessage && setErrorMessage(undefined);
    setEditingKey(undefined);
  };

  const onSave = (field: string): void => {
    if (
      field.toLowerCase() === 'phone' &&
      (!phoneNumberRegex.test(String(editingValue)) ||
        !validatePhoneNumber(String(editingValue), { country: 'GBR', validateMobilePrefix: false })
          .isValid)
    ) {
      setErrorMessage('Invalid phone number');
      return;
    }
    refetch &&
      void refetch().then(() => {
        setEditingKey(undefined);
        setNewTableValues(originalTableValues);
        setEditingValue(undefined);
      });
  };
  return (
    <div className={styles.editContainer}>
      <TextInput
        ariaLabel={`${field}-edit`}
        value={editingValue ?? value}
        onChange={(value) => {
          setEditingValue(value);
          onChange && onChange(field, value);
        }}
        errorMessage={errorMessage}
        className={styles.noMarginBottom}
      />
      <div className={`${styles.editButtons} ${errorMessage ? styles.marginTop : ''}`}>
        <FormButton
          className={styles.formButton}
          text="Save"
          theme={'formButtonGreen'}
          onClick={() => void onSave(field)}
          ariaLabel="save"
        />
        <FormButton
          className={styles.formButton}
          text="Cancel"
          theme="formButtonGrey"
          onClick={onCancel}
          ariaLabel="cancel"
        />
      </div>
    </div>
  );
};
export default EditingRow;
