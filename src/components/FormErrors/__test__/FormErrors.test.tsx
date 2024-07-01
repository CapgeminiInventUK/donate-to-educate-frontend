import { render } from '@testing-library/react';
import FormErrors from '../FormErrors';

const errors = {
  testField: 'Error message',
};

describe('Form Errors', () => {
  it('should not render a component if no errors present', () => {
    const { queryByText } = render(<FormErrors formErrors={{}} />);
    expect(queryByText('There is a problem')).not.toBeInTheDocument();
  });

  it('should render error list when errors present', () => {
    const { queryByText } = render(<FormErrors formErrors={errors} />);
    expect(queryByText('There is a problem')).toBeInTheDocument();
  });
});
