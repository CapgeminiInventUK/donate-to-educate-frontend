import { ExternalLinkProps } from '@/types/props';
import { FC } from 'react';
import styles from './ExternalLink.module.scss';

const ExternalLink: FC<ExternalLinkProps> = ({ linkText, linkUrl }) => {
  return (
    <a className={styles.link} href={linkUrl} target="_blank" rel="noreferrer">
      {linkText}
    </a>
  );
};
export default ExternalLink;
