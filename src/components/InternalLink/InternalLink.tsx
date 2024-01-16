import { InternalLinkProps } from '@/types/props';
import { FC } from 'react';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const InternalLink: FC<InternalLinkProps> = ({ linkText, linkUrl }) => {
  const navigate = useNavigate();

  const onClick = (): void => {
    navigate(linkUrl);
  };

  return <Button theme="link" onClick={onClick} text={linkText} />;
};
export default InternalLink;
