import { PillColours } from '@/types/data';
import type { PillProps } from '@/types/props';
import type { FC } from 'react';
import styles from './Pill.module.scss';

export const Pill: FC<PillProps> = ({ colour, text }) => {
  const getText = (colour: PillColours): string => {
    switch (colour) {
      case PillColours.GREEN:
        return 'STOCK AVAILABLE';
      case PillColours.BLUE:
        return 'EXCESS STOCK';
      case PillColours.YELLOW:
        return 'LOW STOCK';
      case PillColours.GREY:
        return 'SCHOOL NOT REGISTERED';
      case PillColours.RED:
        return 'OUT OF STOCK';
      case PillColours.LIGHTBLUE:
        return '';
    }
  };

  return (
    <span aria-label="pill" className={`${styles[colour]} ${styles.container}`}>
      {text ?? getText(colour)}
    </span>
  );
};
