import { FC } from 'react';
import styles from './ResultBanner.module.scss';
import Email from '@/assets/admin/Email';
import { ResultBannerProps } from '@/types/props';
import { ResultType } from '@/types/data';
import { capitaliseFirstLetter } from '@/utils/globals';

const ResultBanner: FC<ResultBannerProps> = ({ type, name }) => {
  return (
    <div className={styles.banner}>
      <Email className={styles.email} />
      <h2>{getHeaderText(type, name)}</h2>
      <p>{getSubtext(type)}</p>
    </div>
  );
};

const getHeaderText = (type: ResultType, name?: string): string => {
  switch (type) {
    case 'declined':
      return 'You have declined this request to join';
    case 'approved':
      return `${capitaliseFirstLetter(String(name))} has joined Donate to Educate`;
    default:
      throw new Error(`Unexpected result type ${String(type)}`);
  }
};

const getSubtext = (type: ResultType): string => {
  switch (type) {
    case 'declined':
    case 'approved':
      return "We've emailed them the results.";
    default:
      throw new Error(`Unexpected result type ${String(type)}`);
  }
};

export default ResultBanner;
