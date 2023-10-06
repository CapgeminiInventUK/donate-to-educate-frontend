import { FC } from 'react';
import { HeaderProps } from '@/types/props';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '@utils/globals';
import { Pill } from '../Pill/Pill';

const Header: FC<HeaderProps> = ({ text, className }) => {
  const isSmallerScreen = useMediaQuery({ query: `(max-width: ${breakpoints.screenLarge})` });

  return (
    <>
      {isSmallerScreen ? (
        <h2 className={className}>{text}</h2>
      ) : (
        <h1 className={className}>{text}</h1>
      )}
      <Pill text={'STOCK AVAILABLE'} color={'green'} />
    </>
  );
};

export default Header;
