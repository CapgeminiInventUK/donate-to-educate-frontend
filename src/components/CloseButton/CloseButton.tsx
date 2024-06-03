import Close from '@/assets/tiles/Close';
import { CloseButtonProps } from '@/types/props';
import { FC } from 'react';
import styles from './CloseButton.module.scss';

const CloseButton: FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.closeButton} onClick={onClick}>
      <Close />
    </button>
  );
};

export default CloseButton;
