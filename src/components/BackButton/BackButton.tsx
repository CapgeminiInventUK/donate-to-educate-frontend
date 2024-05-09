import { FC } from 'react';
import styles from './BackButton.module.scss';
import ChevronLeft from '@/assets/navigation/ChevronLeft';
import { useNavigate } from 'react-router';
import { BackButtonProps } from '@/types/props';

const BackButton: FC<BackButtonProps> = ({ onClick, className, theme }) => {
  const navigate = useNavigate();

  return (
    <button
      className={`${styles.back} ${className ?? ''} ${styles[theme]}`}
      onClick={onClick ?? ((): void => navigate(-1))}
      type="button"
    >
      <ChevronLeft colour={theme} />
      <h4>Back</h4>
    </button>
  );
};

export default BackButton;
