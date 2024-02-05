import { FC } from 'react';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import LogoIconBlue from '@/assets/logo/LogoIconBlue';
import FormButton from '@/components/FormButton/FormButton';
import Paths from '@/config/paths';
import BackButton from '@/components/BackButton/BackButton';

const Login: FC = () => {
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
          <p>You can easily sign in or join if you work for:</p>
          <ul>
            <li>A School</li>
            <li>A Charity or Voluneer Group</li>
          </ul>
          <div className={styles.subContainerLine}>
            <FormButton
              theme="formButtonDarkBlue"
              useArrow={false}
              text={'Sign In'}
              onClick={() => {
                //eslint-disable-next-line no-console
                console.log('hello');
              }}
            />
            <Link className={styles.link} to={Paths.CONTACT}>
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
              <Link className={styles.link} to={Paths.CONTACT}>
                find your child’s school or nearby charities.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
