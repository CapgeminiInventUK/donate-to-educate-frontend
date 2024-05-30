import { FC } from 'react';
import { InternalLinkProps } from '@/types/props';
import styles from './InternalLink.module.scss';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

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
