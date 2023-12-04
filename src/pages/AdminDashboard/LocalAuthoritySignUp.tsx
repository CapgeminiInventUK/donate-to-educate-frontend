import TextInput from '@/components/TextInput/TextInput';
import { FC } from 'react';
import styles from './LocalAuthoritySignUp.module.scss';
import FormButton from '@/components/FormButton/FormButton';
import TextArea from '@/components/TextArea/TextArea';

interface LocalAuthoritySignUpProps {
  name: string;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}

const LocalAuthoritySignUp: FC<LocalAuthoritySignUpProps> = ({ name, setStage }) => {
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
        onClick={(): void => setStage('la_confirmation')}
      />
    </div>
  );
};

export default LocalAuthoritySignUp;
