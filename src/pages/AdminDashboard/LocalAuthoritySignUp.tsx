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
            .then(() => setStage('la_confirmation'))
            // eslint-disable-next-line no-console
            .catch(console.error);
        }}
      />
    </div>
  );
};

export default LocalAuthoritySignUp;
