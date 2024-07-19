import type { HeaderProps } from '@/types/props';
import { breakpoints } from '@utils/globals';
import type { FC } from 'react';
import { useMediaQuery } from 'react-responsive';

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
