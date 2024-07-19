import type { ExternalLinkProps } from '@/types/props';
import type { FC } from 'react';
import styles from './ExternalLink.module.scss';

const ExternalLink: FC<ExternalLinkProps> = ({ linkText, linkUrl, ariaLabel, className }) => {
  return (
    <a
      className={`${styles.link} ${className}`}
      href={linkUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
    >
      {linkText}
    </a>
  );
};
export default ExternalLink;
