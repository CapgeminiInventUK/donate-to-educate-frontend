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
  const [localState, setLocalState] = useState({
    name: name,
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
          name: name,
          firstName: localState.firstName,
          lastName: localState.lastName,
          jobTitle: localState.jobTitle,
          department: localState.department,
          email: localState.email,
          phone: localState.phone,
          notes: localState.notes,
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
          setLocalState((prevState) => ({
            ...prevState,
            firstName: event.target.value,
          }));
        }}
      />
      <TextInput
        header="Last name"
        onChange={(event) => {
          setLocalState((prevState) => ({
            ...prevState,
            lastName: event.target.value,
          }));
        }}
      />
      <TextInput
        header="Job title or role"
        onChange={(event) => {
          setLocalState((prevState) => ({
            ...prevState,
            jobTitle: event.target.value,
          }));
        }}
      />
      <TextInput
        header="Department"
        onChange={(event) => {
          setLocalState((prevState) => ({
            ...prevState,
            department: event.target.value,
          }));
        }}
      />
      <TextInput
        header="Email"
        onChange={(event) => {
          setLocalState((prevState) => ({
            ...prevState,
            email: event.target.value,
          }));
        }}
      />
      <TextInput
        header="Phone"
        onChange={(event) => {
          setLocalState((prevState) => ({
            ...prevState,
            phone: event.target.value,
          }));
        }}
      />
      <TextArea
        onChange={(event) => {
          setLocalState((prevState) => ({
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
