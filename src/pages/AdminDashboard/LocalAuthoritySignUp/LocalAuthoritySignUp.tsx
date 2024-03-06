import { FC, useState } from 'react';
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

  return (
    <div className={dashboardStyles.container}>
      <div className={dashboardStyles.adminCard}>
        <div className={dashboardStyles.header}>
          <h1>Local Authority Profile</h1>
          <Button
            theme="link"
            text="Sign out"
            className={dashboardStyles.actionButtons}
            onClick={(): void => {
              void signOut()
                .then(() => navigate(Paths.LOGIN))
                // eslint-disable-next-line no-console
                .catch(console.error);
            }}
            ariaLabel="sign out"
          />
        </div>
        <div className={dashboardStyles.body}>
          <BackButton theme="white" />
          <div className={styles.card}>
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
              onClick={(): void => {
                refetch()
                  .then(() =>
                    navigate(Paths.ADMIN_DASHBOARD_SIGN_UP_CONFIRMATION, { state: { name: la } })
                  )
                  // eslint-disable-next-line no-console
                  .catch(console.error);
              }}
              ariaLabel="create account"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalAuthoritySignUp;
