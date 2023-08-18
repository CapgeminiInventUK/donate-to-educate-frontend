import { ReactElement, FC } from 'react';
import { HeaderProps } from '@/types/props';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '@utils/globals';

const Header: FC<HeaderProps> = ({ text, className }): ReactElement => {
  const isMobile = useMediaQuery({ query: `(max-width: ${breakpoints.screenMedium})` });

  return (
    <>{isMobile ? <h2 className={className}>{text}</h2> : <h1 className={className}>{text}</h1>}</>
  );
};

export default Header;
