import type { ErrorBoundaryWithLocationProps } from '@/types/props';
import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

const ErrorBoundaryWithLocation: FC<ErrorBoundaryWithLocationProps> = ({ name, children }) => {
  const location = useLocation();

  return (
    <ErrorBoundary name={name} location={location.pathname}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWithLocation;
