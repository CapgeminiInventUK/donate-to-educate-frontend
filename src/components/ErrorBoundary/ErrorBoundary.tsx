import SomethingWentWrong from '@/pages/Misc/SomethingWentWrong/SomethingWentWrong';
import type { ErrorBoundaryState } from '@/types/data';
import type { ErrorBoundaryProps } from '@/types/props';
import { Component, type ErrorInfo, type ReactNode } from 'react';

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
      const message = this.state.error?.message.toLowerCase();
      if (
        message &&
        !message.includes('http://localhost:5173') &&
        (message.includes('Unable to preload CSS'.toLowerCase()) ||
          message.includes('Failed to fetch dynamically imported module'.toLowerCase()))
      ) {
        window.location.reload();
        return null;
      }

      return <SomethingWentWrong errorBoundary={this.props?.name ?? 'Router'} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
