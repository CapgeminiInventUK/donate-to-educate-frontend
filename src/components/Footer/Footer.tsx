import { ReactElement, FC } from 'react';
import styles from './Footer.module.scss';

const Footer: FC = (): ReactElement => {
  return <footer className={styles.container}>Footer</footer>;
};

export default Footer;
