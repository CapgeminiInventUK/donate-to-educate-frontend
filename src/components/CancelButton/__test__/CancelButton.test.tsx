import { render } from '@testing-library/react';
import CancelButton from '../CancelButton';
import userEvent from '@testing-library/user-event';

describe('Cancel button', () => {
  const onClick = vi.fn();
  it('should render component', () => {
    const Button = render(<CancelButton onClick={onClick} theme="white" />);
    expect(Button).toMatchSnapshot();
  });

  it('should handle click', async () => {
    const { getByRole } = render(<CancelButton onClick={onClick} theme="white" />);
    await userEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should have classname if passed to component', () => {
    const { getByRole } = render(
      <CancelButton onClick={onClick} theme="white" className="testClass" />
    );
    expect(getByRole('button')).toHaveClass('testClass');
  });
});
