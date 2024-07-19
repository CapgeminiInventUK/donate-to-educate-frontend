import type { FC } from 'react';
import logoComponents from './logoComponents';

const LogoSelector: FC<{ name: string }> = ({ name }) => {
  const LogoComponent = logoComponents[name];
  return LogoComponent ? <img src={LogoComponent} alt={name} /> : null;
};

export default LogoSelector;
