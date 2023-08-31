import { FC } from 'react';
import { ClickableLogoProps } from '@/types/props';
import LogoWhite from '@assets/logo/LogoWhite';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import LogoBlue from '@assets/logo/LogoBlue';

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
