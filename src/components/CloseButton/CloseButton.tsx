import Close from '@/assets/tiles/Close';
import { CloseButtonProps } from '@/types/props';
import { FC, useState } from 'react';
import styles from './CloseButton.module.scss';

const CloseButton: FC<CloseButtonProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={styles.closeButton}
      onClick={onClick}
    >
      <Close className={styles.closeIcon} hover={isHovered} />
    </button>
  );
};

export default CloseButton;
