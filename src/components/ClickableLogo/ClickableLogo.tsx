import Paths from '@/config/paths';
import type { ClickableLogoProps } from '@/types/props';
import LogoBlue from '@assets/logo/LogoBlue';
import LogoWhite from '@assets/logo/LogoWhite';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const ClickableLogo: FC<ClickableLogoProps> = ({ colour, className }) => {
  const navigate = useNavigate();

  const navigateHome = (): void => {
    navigate(Paths.HOME);
  };

  return (
    <>
      {colour === 'blue' ? (
        <LogoBlue className={className} onClick={navigateHome} />
      ) : (
        <LogoWhite className={className} onClick={navigateHome} />
      )}
    </>
  );
};

export default ClickableLogo;
