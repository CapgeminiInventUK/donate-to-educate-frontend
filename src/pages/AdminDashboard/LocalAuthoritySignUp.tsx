import Button from '@/components/Button/Button';
import TextInput from '@/components/TextInput/TextInput';
import { FC } from 'react';
import styles from './LocalAuthoritySignUp.module.scss';

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
      {/* // TODO need to do a text input component */}
      <Button
        text="Create account"
        onClick={(): void => setStage('la_confirmation')}
        theme="midBlue"
      />
    </div>
  );
};

export default LocalAuthoritySignUp;
