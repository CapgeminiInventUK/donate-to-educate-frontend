import { FC } from 'react';
import { motion } from 'framer-motion';
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
    <motion.div whileHover={{ scale: 1.05 }}>
      <div className={styles[theme] ?? styles.lightBlue}>
        <div className={`${styles[theme + 'Icon'] ?? styles.lightBlue}`}>{icon}</div>
        <div className={styles.tileText}>
          <h3>{heading}</h3>
          <p>{subheading}</p>
          <FormButton
            className={styles.button}
            theme={
              !isAdmin
                ? 'formButtonGreen'
                : theme === 'grey'
                  ? 'formButtonMidBlue'
                  : 'formButtonGrey'
            }
            text={buttonText}
            onClick={onClick}
            useArrow
            ariaLabel="Request button"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ActionTile;
