import { InformationTileProps } from '@/types/props';
import styles from './InformationTile.module.scss';
import { FC } from 'react';
import Close from '@/assets/tiles/Close';

const InformationTile: FC<InformationTileProps> = ({
  heading,
  subtext,
  dismiss = (): void => {
    null;
  },
}: InformationTileProps) => {
  return (
    <div className={styles.container}>
      {dismiss && (
        <div className={styles.buttonContainer}>
          <button className={styles.closeButton} onClick={dismiss}>
            <Close />
          </button>
        </div>
      )}
      <h2>{heading}</h2>
      <p>{subtext}</p>
    </div>
  );
};

export default InformationTile;
