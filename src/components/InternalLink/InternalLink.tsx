import type { InternalLinkProps } from '@/types/props';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './InternalLink.module.scss';

const InternalLink: FC<InternalLinkProps> = ({ linkText, linkUrl, ariaLabel, colour }) => {
  const navigate = useNavigate();
  const theme = colour === 'blue' ? 'link-blue' : 'link';

  const onClick = (): void => {
    navigate(linkUrl);
  };

  return (
    <Button
      theme={theme}
      onClick={onClick}
      text={linkText}
      ariaLabel={ariaLabel}
      className={styles.link}
    />
  );
};
export default InternalLink;
