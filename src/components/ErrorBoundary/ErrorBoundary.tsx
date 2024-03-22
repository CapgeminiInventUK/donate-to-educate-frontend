import { Component, ErrorInfo, ReactNode } from 'react';
import SomethingWentWrong from '@/pages/Misc/SomethingWentWrong/SomethingWentWrong';
import { ErrorBoundaryProps } from '@/types/props';
import { ErrorBoundaryState } from '@/types/data';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public static getDerivedStateFromProps(
    { location }: ErrorBoundaryProps,
    state: ErrorBoundaryState
  ): ErrorBoundaryState {
    if (!location) {
      return state;
    }

    if (state.location === location) {
      return { ...state, location };
    }

    return { hasError: false, location };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      // eslint-disable-next-line no-console
      console.log(`Boundary Name: ${this.props.name}`);

      // eslint-disable-next-line no-console
      console.log(this.state.error);
      const message = this.state.error?.message.toLowerCase();
      if (
        message &&
        !message.includes('http://localhost:5173') &&
        (message.includes('Unable to preload CSS'.toLowerCase()) ||
          message.includes('Failed to fetch dynamically imported module'.toLowerCase()))
      ) {
        // eslint-disable-next-line no-console
        console.log('Reloading due to chunk changes');
        window.location.reload();
        return null;
      }

      // eslint-disable-next-line no-console
      console.log(this.state.errorInfo);
      return <SomethingWentWrong errorBoundary={this.props?.name ?? 'Router'} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
