import { ReactElement, FC } from 'react';
import { ClickableLogoProps } from '../../types/props';
import LogoWhite from '../../assets/logo/LogoWhite';
import { useNavigate } from 'react-router-dom';
import Paths from '../../config/paths';
import LogoBlue from '../../assets/logo/LogoBlue';

const ClickableLogo: FC<ClickableLogoProps> = ({ colour, className }): ReactElement => {
  const navigate = useNavigate();
  return (
    <>
      {colour === 'blue' ? (
        <LogoBlue className={className} onClick={(): void => navigate(Paths.HOME)} />
      ) : (
        <LogoWhite className={className} onClick={(): void => navigate(Paths.HOME)} />
      )}
    </>
  );
};

export default ClickableLogo;
