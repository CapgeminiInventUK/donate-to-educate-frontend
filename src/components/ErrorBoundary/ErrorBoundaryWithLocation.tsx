import { ErrorBoundaryType } from '@/types/props';
import { useLocation } from 'react-router-dom';
import { FC } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface ErrorBoundaryWithLocationProps {
  name: ErrorBoundaryType;
  children: JSX.Element;
}

const ErrorBoundaryWithLocation: FC<ErrorBoundaryWithLocationProps> = ({ name, children }) => {
  const location = useLocation();

  return (
    <ErrorBoundary name={name} location={location.pathname}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWithLocation;
