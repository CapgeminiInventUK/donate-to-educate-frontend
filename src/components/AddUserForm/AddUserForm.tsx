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

  if (isError) {
    return <ErrorBanner />;
  }

  return (
    <div className={styles.body}>
      <h1 className={styles.title}>{name}</h1>
      <h2>Add user</h2>
      <form onSubmit={onSubmit}>
        {formErrors && <FormErrors formErrors={formErrors} />}
        <TextInput
          header="First name"
          onChange={(value) => onFormChange('firstName', value)}
          ariaLabel="first-name"
          value={formState.firstName}
          className={styles.textInput}
          isLarge
        />
        <TextInput
          header="Last name"
          onChange={(value) => onFormChange('lastName', value)}
          ariaLabel="last-name"
          value={formState.lastName}
          className={styles.textInput}
          isLarge
        />
        <TextInput
          header="Job title or role"
          onChange={(value) => onFormChange('jobTitle', value)}
          ariaLabel="job-title-or-role"
          value={formState.jobTitle}
          className={styles.textInput}
          isLarge
        />
        <TextInput
          header="Department"
          onChange={(value) => onFormChange('department', value)}
          ariaLabel="department"
          value={formState.department}
          className={styles.textInput}
          isLarge
        />
        <TextInput
          header="Email"
          onChange={(value) => onFormChange('email', value)}
          ariaLabel="email"
          value={formState.email}
          className={styles.textInput}
          isLarge
        />
        <TextInput
          header="Phone"
          onChange={(value) => onFormChange('phone', value)}
          ariaLabel="phone"
          value={formState.phone}
          className={styles.textInput}
        />
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
