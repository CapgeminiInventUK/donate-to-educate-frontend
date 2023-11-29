import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from './TextInput';

describe('TextInput', (): void => {
  test('renders without errors', (): void => {
    render(<TextInput header="Test Header" validator={() => ({ isValid: true })} />);
  });

  test('displays the correct header', (): void => {
    const headerText = 'Test Header';
    const { getByText } = render(
      <TextInput header={headerText} validator={() => ({ isValid: true })} />
    );
    expect(getByText(headerText)).toBeInTheDocument();
  });

  test('calls the onChange function on input change', (): void => {
    const handleChange = jest.fn();
    render(
      <TextInput
        header="Test Header"
        validator={() => ({ isValid: true })}
        onChange={handleChange}
      />
    );

    const input = screen.getByRole('textbox', { name: '' });
    fireEvent.change(input, { target: { value: 'Test Value' } });

    expect(handleChange).toHaveBeenCalled();
  });

  test('displays the provided placeholder text', (): void => {
    const placeholderText = 'Test Placeholder';
    const { getByPlaceholderText } = render(
      <TextInput
        header="Test Header"
        validator={() => ({ isValid: true })}
        placeholder={placeholderText}
      />
    );
    const input = getByPlaceholderText(placeholderText);
    expect(input).toBeInTheDocument();
  });

  test('renders input with correct id when header contains non-alphanum characters', (): void => {
    const { container } = render(
      <TextInput header="Test Header!" validator={() => ({ isValid: true })} />
    );
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('id', 'test-header-textInput');
  });

  test('renders input with correct id when header contains multiple spaces', (): void => {
    const { container } = render(
      <TextInput header="Test   Header" validator={() => ({ isValid: true })} />
    );
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('id', 'test-headertextInput');
  });

  test('displays the provided subheading text', (): void => {
    const subHeadingText = 'Test Subheading';
    const { getByText } = render(
      <TextInput
        header="Test Header"
        validator={() => ({ isValid: true })}
        subHeading={subHeadingText}
      />
    );
    expect(getByText(subHeadingText)).toBeInTheDocument();
  });

  test('does not render a <p> element with a class of "subHeading" when the subheading is not provided', (): void => {
    const { queryByText } = render(
      <TextInput header="Test Header" validator={() => ({ isValid: true })} />
    );
    const subHeading = queryByText(/Test Subheading/);
    expect(subHeading).toBeNull();
  });
});
