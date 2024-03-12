import { FC, FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GraphQLQuery } from 'aws-amplify/api';
import { signOut } from 'aws-amplify/auth';
import { client } from '@/graphqlClient';
import { registerLocalAuthority } from '@/graphql/mutations';
import { useQuery } from '@tanstack/react-query';
import TextInput from '@/components/TextInput/TextInput';
import FormButton from '@/components/FormButton/FormButton';
import TextArea from '@/components/TextArea/TextArea';
import BackButton from '@/components/BackButton/BackButton';
import Button from '@/components/Button/Button';
import Paths from '@/config/paths';
import { RegisterLocalAuthorityMutation } from '@/types/api';
import dashboardStyles from '../AdminDashboard.module.scss';
import styles from './LocalAuthoritySignUp.module.scss';
import { validateFormInputField } from '@/utils/formUtils';
import FormErrors from '@/components/FormErrors/FormErrors';

interface FormState {
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  email: string;
  phone: string;
  notes: string;
}

const LocalAuthoritySignUp: FC = () => {
  const [formState, setFormState] = useState<FormState>({
    firstName: '',
    lastName: '',
    jobTitle: '',
    department: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>();

  const navigate = useNavigate();
  const { la, id } = useLocation().state as { la: string; id: string };

  const { refetch } = useQuery({
    queryKey: ['register'],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<RegisterLocalAuthorityMutation>>({
        query: registerLocalAuthority,
        variables: {
          name: la,
          firstName: formState.firstName,
          lastName: formState.lastName,
          jobTitle: formState.jobTitle,
          department: formState.department,
          email: formState.email,
          phone: formState.phone,
          notes: formState.notes,
          nameId: id,
        },
      });
      return result;
    },
  });

  const onSubmit = (event: FormEvent<Element>): void => {
    event.preventDefault();

    const errors = Object.keys(formState).reduce((acc: Record<string, string>, field) => {
      const formData = [{ field, value: formState[field as keyof FormState] }];
      const error = validateFormInputField(formData, field);
      if (error) {
        acc[field] = error;
      }
      return acc;
    }, {});

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    refetch()
      .then(() => navigate(Paths.ADMIN_DASHBOARD_SIGN_UP_CONFIRMATION, { state: { name: la } }))
      // eslint-disable-next-line no-console
      .catch(console.error);
  };

  return (
    <div className={dashboardStyles.container}>
      <BackButton theme="blue" />
      <div className={dashboardStyles.adminCard}>
        <div className={dashboardStyles.header}>
          <h1>Local Authority Profile</h1>
          <Button
            theme="link"
            text="Sign out"
            className={dashboardStyles.actionButtons}
            onClick={(): void => {
              void signOut()
                .then(() => navigate(Paths.SIGN_IN))
                // eslint-disable-next-line no-console
                .catch(console.error);
            }}
            ariaLabel="sign out"
          />
        </div>
        <div className={dashboardStyles.body}>
          <BackButton theme="white" />
          <form onSubmit={onSubmit} className={styles.card}>
            {formErrors && <FormErrors formErrors={formErrors} />}
            <h1>{la}</h1>
            <hr />
            <TextInput
              header="First name"
              onChange={(value) => {
                setFormState((prevState) => ({
                  ...prevState,
                  firstName: value,
                }));
              }}
              ariaLabel="first name"
            />
            <TextInput
              header="Last name"
              onChange={(value) => {
                setFormState((prevState) => ({
                  ...prevState,
                  lastName: value,
                }));
              }}
              ariaLabel="last name"
            />
            <TextInput
              header="Job title or role"
              onChange={(value) => {
                setFormState((prevState) => ({
                  ...prevState,
                  jobTitle: value,
                }));
              }}
              ariaLabel="title"
            />
            <TextInput
              header="Department"
              onChange={(value) => {
                setFormState((prevState) => ({
                  ...prevState,
                  department: value,
                }));
              }}
              ariaLabel="department"
            />
            <TextInput
              header="Email"
              onChange={(value) => {
                setFormState((prevState) => ({
                  ...prevState,
                  email: value,
                }));
              }}
              ariaLabel="email"
            />
            <TextInput
              header="Phone"
              onChange={(value) => {
                setFormState((prevState) => ({
                  ...prevState,
                  phone: value,
                }));
              }}
              ariaLabel="phone"
            />
            <TextArea
              onChange={(value) => {
                setFormState((prevState) => ({
                  ...prevState,
                  notes: value,
                }));
              }}
              header="Notes about this user (optional)"
              subHeading="This information can only be seen by Donate to Educate administrators."
              characterLimit={1000}
              ariaLabel="notes"
            />
            <FormButton
              text={'Create account'}
              theme={'formButtonMidBlue'}
              ariaLabel="create account"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LocalAuthoritySignUp;
