import ChevronLeft from '@/assets/navigation/ChevronLeft';
import type { BackButtonProps } from '@/types/props';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';
import type { FC } from 'react';
import { useNavigate } from 'react-router';
import styles from './BackButton.module.scss';

const BackButton: FC<BackButtonProps> = ({ onClick, className, theme }) => {
  const navigate = useNavigate();

  return (
    <button
      className={`${styles.back} ${checkForStringAndReturnEmptyIfFalsy(className)} ${styles[theme]}`}
      onClick={onClick ?? ((): void => navigate(-1))}
      type="button"
    >
      <ChevronLeft colour={theme} />
      <h4>Back</h4>
    </button>
  );
};

export default BackButton;
