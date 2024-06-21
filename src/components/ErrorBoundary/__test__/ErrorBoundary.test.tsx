import { render, screen } from '@testing-library/react';
import { useEffect } from 'react';
import ErrorBoundary from '../ErrorBoundary';

const ErrorTestComponent = (): JSX.Element => {
  useEffect(() => {
    throw new Error('Test Error');
  }, []);

  return <div></div>;
};

const ValidTestComponent = (): JSX.Element => {
  return <div>Valid</div>;
};

describe('Error Boundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {
      //** This is to remove annoying error warning (which is correctly thrown)
    });
  });
  it('Should catch error in component', () => {
    render(
      <ErrorBoundary>
        <ErrorTestComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('Should not render when no error', () => {
    render(
      <ErrorBoundary>
        <ValidTestComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Valid')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });
});
