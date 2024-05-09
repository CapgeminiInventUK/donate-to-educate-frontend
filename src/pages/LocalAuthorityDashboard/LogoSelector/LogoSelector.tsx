import { FC } from 'react';
import logoComponents from './logoComponents';
import westSussex from '@assets/countyLogos/westSussex.svg';

const LogoSelector: FC<{ name: string }> = ({ name }) => {
  const LogoComponent = logoComponents[name];
  return LogoComponent ? <img src={westSussex} alt={name} /> : null;
};

export default LogoSelector;
