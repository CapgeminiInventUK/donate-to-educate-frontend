import { ReactElement, FC } from 'react';
import styles from './HeroBanner.module.scss';

export interface HeroBannerProps {
  title: string;
  body: string;
}

const HeroBanner: FC<HeroBannerProps> = ({ title, body }): ReactElement => {
  return (
    <div className={styles.banner}>
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
      <img />
    </div>
  );
};

export default HeroBanner;
