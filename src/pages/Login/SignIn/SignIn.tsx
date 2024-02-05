import { FC } from 'react';
import { Link } from 'react-router-dom';
import FormButton from '@components/FormButton/FormButton';
import Paths from '@/config/paths';
import styles from './SignIn.module.scss';
import LogoIconBlue from '@/assets/logo/LogoIconBlue';
import BackButton from '@/components/BackButton/BackButton';

export const SignIn: FC = () => {
  return (
    <>
      <BackButton
        onClick={() => {
          return;
        }}
        theme="blue"
      />
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <div className={styles.subContainerLine}>
            <LogoIconBlue className={styles.logoIcon} />
            <h2>Sign in or join</h2>
          </div>

          <p>You can easily sign in or join if you work for:</p>
          <ul>
            <li>A School</li>
            <li>A Charity or Voluneer Group</li>
          </ul>
          <FormButton
            theme="formButtonDarkBlue"
            useArrow={false}
            text={'Sign In'}
            onClick={() => {
              //eslint-disable-next-line no-console
              console.log('hello');
            }}
          />
        </div>

        <h3>If you work for a local authority</h3>
        <p>
          If you work for a local authority and want to join,{' '}
          <Link className={styles.link} to={Paths.CONTACT}>
            contact us.
          </Link>
        </p>

        <h3>If you are a parent or guardian</h3>
        <p>
          If you are a parent or guardian and need products for your child, you don’t need to sign
          in or join.
        </p>
        <p>
          Search your local area to{' '}
          <Link className={styles.linkLight} to={Paths.CONTACT}>
            find your child’s school or nearby charities.
          </Link>
        </p>
      </div>
    </>
  );
};
