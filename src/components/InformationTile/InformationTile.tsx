import type { InformationTileProps } from '@/types/props';
import type { FC } from 'react';
import CloseButton from '../CloseButton/CloseButton';
import styles from './InformationTile.module.scss';

const InformationTile: FC<InformationTileProps> = ({
  heading,
  subtext,
  dismiss,
}: InformationTileProps) => {
  return (
    <div className={styles.container}>
      {dismiss && (
        <div className={styles.buttonContainer}>
          <CloseButton onClick={dismiss} />
        </div>
      )}
      <h2>{heading}</h2>
      <p>{subtext}</p>
    </div>
  );
};

export default InformationTile;
