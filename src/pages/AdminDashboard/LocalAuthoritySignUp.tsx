/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import TextInput from '@/components/TextInput/TextInput';
import { FC, useState } from 'react';
import styles from './LocalAuthoritySignUp.module.scss';
import FormButton from '@/components/FormButton/FormButton';
import TextArea from '@/components/TextArea/TextArea';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { RegisterLocalAuthorityMutation } from '@/types/api';
import { registerLocalAuthority } from '@/graphql/mutations';

interface LocalAuthoritySignUpProps {
  name: string;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}

const LocalAuthoritySignUp: FC<LocalAuthoritySignUpProps> = ({ name, setStage }) => {
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
    <div className={styles.card}>
      <h1>{name}</h1>
      <hr />
      <TextInput
        header="First name"
        onChange={(event) => {
          setFormState((prevState) => ({
            ...prevState,
            firstName: event.target.value,
          }));
        }}
      />
      <TextInput
        header="Last name"
        onChange={(event) => {
          setFormState((prevState) => ({
            ...prevState,
            lastName: event.target.value,
          }));
        }}
      />
      <TextInput
        header="Job title or role"
        onChange={(event) => {
          setFormState((prevState) => ({
            ...prevState,
            jobTitle: event.target.value,
          }));
        }}
      />
      <TextInput
        header="Department"
        onChange={(event) => {
          setFormState((prevState) => ({
            ...prevState,
            department: event.target.value,
          }));
        }}
      />
      <TextInput
        header="Email"
        onChange={(event) => {
          setFormState((prevState) => ({
            ...prevState,
            email: event.target.value,
          }));
        }}
      />
      <TextInput
        header="Phone"
        onChange={(event) => {
          setFormState((prevState) => ({
            ...prevState,
            phone: event.target.value,
          }));
        }}
      />
      <TextArea
        onChange={(event) => {
          setFormState((prevState) => ({
            ...prevState,
            notes: event.target.value,
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
            .then(() => setStage('la_confirmation'))
            // eslint-disable-next-line no-console
            .catch(console.error);
        }}
      />
    </div>
  );
};

export default LocalAuthoritySignUp;
