import { render } from '@testing-library/react';
import TextInputSearch from '../TextInputSearch';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  vi.resetAllMocks();
});

describe('Text input search', () => {
  const onChange = vi.fn();
  const onClick = vi.fn();
  const props = {
    header: 'Header',
    ariaLabel: 'label',
    onChange,
    onClick,
  };
  it('should handle on change', async () => {
    const { getByRole } = render(
      <TextInputSearch isSmall={true} subHeading="Subheading" {...props} />
    );

    const input = getByRole('textbox');

    await userEvent.click(input);
    await userEvent.keyboard('a');

    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('should handle on click', async () => {
    const { getByRole } = render(
      <TextInputSearch isLarge={true} errorMessage="error" {...props} />
    );

    const input = getByRole('textbox');
    const searchButton = getByRole('button');

    await userEvent.click(input);
    await userEvent.keyboard('a');
    await userEvent.click(searchButton);

    expect(onClick).toHaveBeenCalled();
  });

  it('should handle on click when enter pressed on keyboard', async () => {
    const { getByRole } = render(
      <TextInputSearch isLarge={true} errorMessage="error" {...props} />
    );

    const input = getByRole('textbox');

    await userEvent.click(input);
    await userEvent.keyboard('a');
    await userEvent.keyboard('{enter}');

    expect(onClick).toHaveBeenCalled();
  });
});
