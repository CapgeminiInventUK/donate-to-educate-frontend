import { FC, useState } from 'react';
import styles from './Join.module.scss';
import LogoIconBlue from '@/assets/logo/LogoIconBlue';
import RadioGroup from '@/components/RadioGroup/RadioGroup';
import FormButton from '@/components/FormButton/FormButton';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import BackButton from '@/components/BackButton/BackButton';

const labelsObj = {
  SCHOOL_ROLE: 'I work at a school',
  CHARITY_ROLE: 'I work for a charity or volunteer group',
  LA_ROLE: 'I work for a local authority',
};

const Join: FC = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <BackButton
        onClick={() => {
          navigate(-1);
        }}
        theme="blue"
      />
      <div className={styles.subContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.subContainerLine}>
            <LogoIconBlue className={styles.logoIcon} />
            <h2>Sign in or join</h2>
          </div>
          <h3>Which best describes you?</h3>
          <RadioGroup
            name={'Hello'}
            values={Object.values(labelsObj)}
            labels={Object.values(labelsObj)}
            handleChange={(input) => {
              setRole(input);
            }}
          />
          <FormButton
            theme="formButtonDarkBlue"
            onClick={() => {
              switch (role) {
                case labelsObj.SCHOOL_ROLE:
                  navigate(Paths.SIGN_UP_SCHOOL);
                  break;
                case labelsObj.CHARITY_ROLE:
                  navigate(Paths.SIGN_UP_CHARITY);
                  break;
              }
            }}
            text={'Next'}
          />
        </div>
      </div>
    </div>
  );
};

export default Join;
