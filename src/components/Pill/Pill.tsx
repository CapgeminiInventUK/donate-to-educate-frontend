import { PillProps } from '@/types/props';
import { FC } from 'react';
import styles from './Pill.module.scss';

export const Pill: FC<PillProps> = ({ color, text }) => {
  const getText = (color: 'green' | 'blue' | 'lightBlue' | 'yellow' | 'grey' | 'red'): string => {
    switch (color) {
      case 'green':
        return 'STOCK AVAILABLE';
      case 'blue':
        return 'EXCESS STOCK';
      case 'yellow':
        return 'LOW STOCK';
      case 'grey':
        return 'SCHOOL NOT REGISTERED';
      case 'red':
        return 'OUT OF STOCK';
      default:
        throw new Error('Unexpected pill color');
    }
  };

  return <span className={`${styles[color]} ${styles.container}`}>{text ?? getText(color)}</span>;
};
