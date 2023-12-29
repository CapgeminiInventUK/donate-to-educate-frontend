import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const LocalAuthoritySignUp: FC = () => {
  const [formState, setFormState] = useState({
    name,
    firstName: '',
    lastName: '',
    jobTitle: '',
    department: '',
    email: '',
    phone: '',
    notes: '',
  });

  const navigate = useNavigate();

  const { refetch } = useQuery({
    queryKey: ['register'],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<RegisterLocalAuthorityMutation>>({
        query: registerLocalAuthority,
        variables: {
          name,
          firstName: formState.firstName,
          lastName: formState.lastName,
          jobTitle: formState.jobTitle,
          department: formState.department,
          email: formState.email,
          phone: formState.phone,
          notes: formState.notes,
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
          />
        </div>
      </div>
      <div className={dashboardStyles.body}>
        <BackButton onClick={(): void => navigate(Paths.ADMIN_DASHBOARD_LA_MANAGE)} theme="white" />
        <div className={styles.card}>
          <h1>NAME</h1>
          <hr />
          <TextInput
            header="First name"
            onChange={(value) => {
              setFormState((prevState) => ({
                ...prevState,
                firstName: value,
              }));
            }}
          />
          <TextInput
            header="Last name"
            onChange={(value) => {
              setFormState((prevState) => ({
                ...prevState,
                lastName: value,
              }));
            }}
          />
          <TextInput
            header="Job title or role"
            onChange={(value) => {
              setFormState((prevState) => ({
                ...prevState,
                jobTitle: value,
              }));
            }}
          />
          <TextInput
            header="Department"
            onChange={(value) => {
              setFormState((prevState) => ({
                ...prevState,
                department: value,
              }));
            }}
          />
          <TextInput
            header="Email"
            onChange={(value) => {
              setFormState((prevState) => ({
                ...prevState,
                email: value,
              }));
            }}
          />
          <TextInput
            header="Phone"
            onChange={(value) => {
              setFormState((prevState) => ({
                ...prevState,
                phone: value,
              }));
            }}
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
          />
          <FormButton
            text={'Create account'}
            theme={'formButtonMidBlue'}
            onClick={(): void => {
              refetch()
                .then(() => navigate(Paths.ADMIN_DASHBOARD_SIGN_UP_CONFIRMATION))
                // eslint-disable-next-line no-console
                .catch(console.error);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LocalAuthoritySignUp;
