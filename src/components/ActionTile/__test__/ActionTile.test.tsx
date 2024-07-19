import type { TileThemes } from '@/types/props';
import { render } from '@testing-library/react';
import buttonStyles from '../../FormButton/FormButton.module.scss';
import ActionTile from '../ActionTile';
import styles from '../ActionTile.module.scss';

const props = {
  icon: <></>,
  heading: 'Heading',
  subheading: 'Subheading',
  buttonText: 'Button text',
  theme: 'lightBlue' as TileThemes,
  isAdmin: false,
  onClick: vi.fn(),
};

afterEach(() => {
  props.buttonText = 'Button text';
  props.theme = 'lightBlue';
  props.isAdmin = false;
});

describe('Action tile', () => {
  it('should render component', () => {
    const screen = render(<ActionTile {...props} />);
    expect(screen).toMatchSnapshot();
  });

  it('should alter classnames depending on theme', () => {
    props.theme = 'grey';
    const { getByLabelText, getByRole } = render(<ActionTile {...props} />);
    expect(getByLabelText('action-tile')).toHaveClass(styles.grey);
    expect(getByLabelText('action-tile-icon')).toHaveClass(styles.greyIcon);
    expect(getByRole('button')).toHaveClass(buttonStyles.formButtonGreen);
  });

  it('should alter button classname depending on theme and isAdmin', () => {
    props.isAdmin = true;
    const { getByRole } = render(<ActionTile {...props} />);
    expect(getByRole('button')).toHaveClass(buttonStyles.formButtonGrey);
  });

  it('should alter button classname depending on theme', () => {
    props.theme = 'grey';
    props.isAdmin = true;
    const { getByRole } = render(<ActionTile {...props} />);
    expect(getByRole('button')).toHaveClass(buttonStyles.formButtonMidBlue);
  });
});
