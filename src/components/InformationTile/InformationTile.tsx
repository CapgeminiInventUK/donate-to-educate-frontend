import { InformationTileProps } from '@/types/props';
import styles from './InformationTile.module.scss';
import { FC } from 'react';

const InformationTile: FC<InformationTileProps> = ({ heading, subtext }: InformationTileProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.subtext}>{subtext}</p>
    </div>
  );
};

export default InformationTile;
