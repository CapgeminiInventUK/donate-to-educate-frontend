import TextInput from '@/components/TextInput/TextInput';
import { FC } from 'react';
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
  const { refetch } = useQuery({
    queryKey: ['register'],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<RegisterLocalAuthorityMutation>>({
        query: registerLocalAuthority,
        variables: {
          name,
          firstName: '1',
          lastName: '2',
          jobTitle: '1',
          department: '1',
          email: '1',
          phone: '1',
        },
      });

      return result;
    },
  });

  return (
    <div className={styles.card}>
      <h1>{name}</h1>
      <hr />
      <TextInput header="First name" />
      <TextInput header="Last name" />
      <TextInput header="Job title or role" />
      <TextInput header="Department" />
      <TextInput header="Email" />
      <TextInput header="Phone" />
      <TextArea
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
