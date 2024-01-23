import { FC } from 'react';
import { HeaderProps } from '@/types/props';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '@utils/globals';

const Header: FC<HeaderProps> = ({ text, className, size = 'normal' }) => {
  const isSmallerScreen = useMediaQuery({ query: `(max-width: ${breakpoints.screenLarge})` });

  if (size === 'normal') {
    return (
      <>
        {isSmallerScreen ? (
          <h2 className={className}>{text}</h2>
        ) : (
          <h1 className={className}>{text}</h1>
        )}
      </>
    );
  }

  return (
    <>
      {isSmallerScreen ? (
        <h3 className={className}>{text}</h3>
      ) : (
        <h2 className={className}>{text}</h2>
      )}
    </>
  );
};

export default Header;
