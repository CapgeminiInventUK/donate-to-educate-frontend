import { render } from '@testing-library/react';
import FormButton from '../FormButton';
import { FormButtonThemes } from '@/types/props';
import userEvent from '@testing-library/user-event';
import styles from '../FormButton.module.scss';

const props = {
  theme: 'formButtonDarkBlue' as FormButtonThemes,
  onClick: vi.fn(),
  text: 'text',
  ariaLabel: 'label',
};

afterEach(() => {
  vi.clearAllMocks();
  props.theme = 'formButtonDarkBlue' as FormButtonThemes;
});

describe('Form button', () => {
  it('should handle click', async () => {
    const { getByRole } = render(<FormButton {...props} />);
    const button = getByRole('button');
    await userEvent.click(button);
    expect(props.onClick).toHaveBeenCalled();
  });

  it('should not handle click if in disabled state', async () => {
    props.theme = 'formButtonDisabled';
    const { getByRole } = render(<FormButton {...props} />);
    const button = getByRole('button');
    await userEvent.click(button);
    expect(props.onClick).not.toHaveBeenCalled();
    expect(button).toHaveProperty('disabled');
  });

  it('should apply full width style and show arrow if appropriate props passed', () => {
    const { getByRole } = render(<FormButton {...props} fullWidth={true} useArrow={true} />);
    const arrow = getByRole('img');
    const button = getByRole('button');
    expect(button).toHaveClass(styles.fullWidth);
    expect(arrow).toBeInTheDocument();
  });
});
