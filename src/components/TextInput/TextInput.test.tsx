import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from './TextInput';

describe('TextInput', (): void => {
  test('renders without errors', (): void => {
    render(<TextInput header="Test Header" ariaLabel="" />);
  });

  test('displays the correct header', (): void => {
    const headerText = 'Test Header';
    const { getByText } = render(<TextInput header={headerText} ariaLabel="" />);
    expect(getByText(headerText)).toBeInTheDocument();
  });

  test('calls the onChange function on input change', (): void => {
    const handleChange = jest.fn();
    render(<TextInput header="Test Header" onChange={handleChange} ariaLabel="" />);

    const input = screen.getByRole('textbox', { name: '' });
    fireEvent.change(input, { target: { value: 'Test Value' } });

    expect(handleChange).toHaveBeenCalled();
  });

  test('displays the provided placeholder text', (): void => {
    const placeholderText = 'Test Placeholder';
    const { getByPlaceholderText } = render(
      <TextInput header="Test Header" placeholder={placeholderText} ariaLabel="" />
    );
    const input = getByPlaceholderText(placeholderText);
    expect(input).toBeInTheDocument();
  });

  test('displays the provided subheading text', (): void => {
    const subHeadingText = 'Test Subheading';
    const { getByText } = render(
      <TextInput header="Test Header" subHeading={subHeadingText} ariaLabel="" />
    );
    expect(getByText(subHeadingText)).toBeInTheDocument();
  });

  test('does not render a <p> element with a class of "subHeading" when the subheading is not provided', (): void => {
    const { queryByText } = render(<TextInput header="Test Header" ariaLabel="" />);
    const subHeading = queryByText(/Test Subheading/);
    expect(subHeading).toBeNull();
  });
});
