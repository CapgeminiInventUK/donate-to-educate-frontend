import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from '../TextInput';
import userEvent from '@testing-library/user-event';

describe('TextInput', (): void => {
  it('should render without errors', (): void => {
    const { queryByText } = render(<TextInput header="Test Header" ariaLabel="" />);
    expect(queryByText('Test Header')).toBeInTheDocument();
  });

  it('should display the correct header', (): void => {
    const headerText = 'Test Header';
    const { getByText } = render(<TextInput header={headerText} ariaLabel="" />);
    expect(getByText(headerText)).toBeInTheDocument();
  });

  it('should call the onChange function on input change', (): void => {
    const handleChange = vi.fn();
    render(<TextInput header="Test Header" onChange={handleChange} ariaLabel="" />);

    const input = screen.getByRole('textbox', { name: '' });
    fireEvent.change(input, { target: { value: 'Test Value' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('should display the provided placeholder text', (): void => {
    const placeholderText = 'Test Placeholder';
    const { getByPlaceholderText } = render(
      <TextInput header="Test Header" placeholder={placeholderText} ariaLabel="" />
    );
    const input = getByPlaceholderText(placeholderText);
    expect(input).toBeInTheDocument();
  });

  it('should display the provided subheading text', (): void => {
    const subHeadingText = 'Test Subheading';
    const { getByText } = render(
      <TextInput header="Test Header" subHeading={subHeadingText} ariaLabel="" />
    );
    expect(getByText(subHeadingText)).toBeInTheDocument();
  });

  it('should not render a <p> element with a class of "subHeading" when the subheading is not provided', ({
    expect,
  }): void => {
    const { queryByText } = render(<TextInput header="Test Header" ariaLabel="" />);
    const subHeading = queryByText(/Test Subheading/);
    expect(subHeading).toBeNull();
  });

  it('should display error text when passed', () => {
    const { queryByText } = render(<TextInput errorMessage="Test Error" ariaLabel="" />);
    const subHeading = queryByText(/Test Error/);
    expect(subHeading).toBeInTheDocument();
  });

  it('should handle change password visibility', async () => {
    const { getByLabelText } = render(
      <TextInput password={true} ariaLabel="textbox" value={'Test value'} isSmall={true} />
    );

    const input = getByLabelText('textbox');
    expect(input).toHaveProperty('type', 'password');

    const showPasswordIcon = getByLabelText('hide-show-password');
    await userEvent.click(showPasswordIcon);
    const textInput = getByLabelText('textbox');
    expect(textInput).not.toHaveProperty('type', 'password');

    await userEvent.click(showPasswordIcon);
    const passwordInput = getByLabelText('textbox');
    expect(passwordInput).toHaveProperty('type', 'password');
  });
});
