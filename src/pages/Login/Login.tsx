import { FC } from 'react';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import LogoIconBlue from '@/assets/logo/LogoIconBlue';
import FormButton from '@/components/FormButton/FormButton';
import Paths from '@/config/paths';
import BackButton from '@/components/BackButton/BackButton';
import Card from '@/components/Card/Card';

const Login: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <Card>
        <div className={styles.innerContainer}>
          <div className={styles.subContainerLine}>
            <LogoIconBlue className={styles.logoIcon} />
            <h2>Sign in or join</h2>
          </div>
          <div>You can easily sign in or join if you work for:</div>
          <ul>
            <li>A school</li>
            <li>A charity or volunteer group</li>
          </ul>
          <div className={styles.subContainerLine}>
            <FormButton
              theme="formButtonDarkBlue"
              useArrow={false}
              text={'Sign in'}
              onClick={() => {
                navigate(Paths.SIGN_IN);
              }}
              ariaLabel="sign in"
            />
            <Link className={styles.link} to={Paths.JOIN}>
              Join Donate to Educate
            </Link>
          </div>
        </div>
        <div className={styles.infoContainer}>
          <div>
            <h3>Sign in or join</h3>
            <p>
              If you work for a local authority and want to join,{' '}
              <Link className={styles.link} to={Paths.CONTACT}>
                {' '}
                contact us.{' '}
              </Link>
            </p>
          </div>
          <div>
            <h3>If you are a parent or guardian</h3>
            <p>
              If you are a parent or guardian and need products for your child, you don’t need to
              sign in or join.
            </p>
            <p>
              Search your local area to{' '}
              <Link className={styles.link} to={Paths.FIND_YOUR_COMMUNITY}>
                find your child’s school or nearby charities.
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
