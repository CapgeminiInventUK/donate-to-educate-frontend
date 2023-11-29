import { FC } from 'react';
import styles from './ConfirmationPage.module.scss';
import LogoWhite from '@/assets/logo/LogoWhite';

interface ConfirmationPageProps {
  icon: JSX.Element;
  title: string;
  message: JSX.Element;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}

const ConfirmationPage: FC<ConfirmationPageProps> = ({ icon, title, message, setStage }) => {
  return (
    <div className={styles.errorPage}>
      {icon}
      <h2>{title}</h2>
      {message}
      <LogoWhite className={styles.logo} />
      <a onClick={(): void => setStage('overview')}>Return to dashboard</a>
    </div>
  );
};

export default ConfirmationPage;
