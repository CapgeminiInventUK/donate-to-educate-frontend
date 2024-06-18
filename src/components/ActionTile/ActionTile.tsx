import { FC } from 'react';
import styles from './ActionTile.module.scss';
import { ActionTileProps } from '@/types/props';
import FormButton from '../FormButton/FormButton';

const ActionTile: FC<ActionTileProps> = ({
  icon,
  heading,
  subheading,
  buttonText,
  theme,
  isAdmin = false,
  onClick,
}) => {
  return (
    <div className={styles[theme] ?? styles.lightBlue}>
      <div className={`${styles[theme + 'Icon'] ?? styles.lightBlue}`}>{icon}</div>
      <div className={styles.tileText}>
        <h3>{heading}</h3>
        <p>{subheading}</p>
        <FormButton
          className={styles.button}
          theme={
            !isAdmin ? 'formButtonGreen' : theme === 'grey' ? 'formButtonMidBlue' : 'formButtonGrey'
          }
          text={buttonText}
          onClick={onClick}
          useArrow={!buttonText.includes('Edit')}
          ariaLabel="Request button"
        />
      </div>
    </div>
  );
};

export default ActionTile;
