import { FC, FormEvent, useState } from 'react';
import styles from './AddUserForm.module.scss';
import { AddUserFormProps } from '@/types/props';
import TextInput from '../TextInput/TextInput';
import TextArea from '../TextArea/TextArea';
import FormButton from '../FormButton/FormButton';
import { validateForm } from '@/utils/formValidationUtils';
import { checkIfValidObjectWithData, scrollToTheTop } from '@/utils/globals';
import FormErrors from '@/components/FormErrors/FormErrors';
import ErrorBanner from '../ErrorBanner/ErrorBanner';
import { useNavigate } from 'react-router-dom';
import { FormState } from '@/types/data';

const AddUserForm: FC<AddUserFormProps> = ({ name, formState, setFormState, refetch, isError }) => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>();
  const navigate = useNavigate();

  const onFormChange = (key: string, value: string): void => {
    setFormState((prevState) => {
      return { ...prevState, [key]: value };
    });
  };

  const onSubmit = (event: FormEvent<Element>): void => {
    event.preventDefault();

    const errors = validateForm(formState);

    if (checkIfValidObjectWithData(errors)) {
      setFormErrors(errors);
      scrollToTheTop();
      return;
    }

    setFormErrors(undefined);

    void refetch().then(() => navigate(-1));
  };

  const formKeys: { header: string; key: keyof FormState }[] = [
    { header: 'First name', key: 'firstName' },
    { header: 'Last name', key: 'lastName' },
    { header: 'Job title or role', key: 'jobTitle' },
    { header: 'Department', key: 'department' },
    { header: 'Email', key: 'email' },
    { header: 'Phone', key: 'phone' },
  ];

  if (isError) {
    return <ErrorBanner />;
  }

  return (
    <div className={styles.body}>
      <h1 className={styles.title}>{name}</h1>
      <h2>Add user</h2>
      <form onSubmit={onSubmit}>
        {formErrors && <FormErrors formErrors={formErrors} />}
        {formKeys.map(({ header, key }) => (
          <TextInput
            key={key}
            header={header}
            onChange={(value) => onFormChange(key, value)}
            ariaLabel={key}
            value={formState[key]}
            className={styles.textInput}
            isLarge={key !== 'phone'}
          />
        ))}
        <TextArea
          header="Notes about this user (optional)"
          subHeading="This information can only be seen by Donate to Educate administrators."
          onChange={(value) => onFormChange('notes', value)}
          ariaLabel="notes"
          value={formState.notes}
          characterLimit={1000}
        />
        <FormButton
          theme="formButtonGrey"
          text="Create account"
          onClick={(): void => {
            null;
          }}
          ariaLabel="create account"
        />
      </form>
    </div>
  );
};
export default AddUserForm;
