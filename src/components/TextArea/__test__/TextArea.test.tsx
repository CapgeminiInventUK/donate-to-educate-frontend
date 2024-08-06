import { render } from '@testing-library/react';
import TextArea from '../TextArea';

describe('TextArea', () => {
  it('should display hint text when passed to component', () => {
    const { queryByText } = render(<TextArea hint="hint" characterLimit={100} ariaLabel="label" />);

    expect(queryByText('hint')).toBeInTheDocument();
  });
});
