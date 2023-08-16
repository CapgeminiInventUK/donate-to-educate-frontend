import { Component, ErrorInfo, ReactNode } from 'react';
import SomethingWentWrong from '../../pages/SomethingWentWrong/SomethingWentWrong';
import { ErrorBoundaryProps } from '../../types/props';
import { ErrorBoundaryState } from '../../types/data';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      // eslint-disable-next-line no-console
      console.log(this.state.error);
      // eslint-disable-next-line no-console
      console.log(this.state.errorInfo);
      return <SomethingWentWrong />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
