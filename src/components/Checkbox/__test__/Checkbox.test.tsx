import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  it('should render component', () => {
    const CheckboxComponent = render(<Checkbox ariaLabel={'label'} />);
    expect(CheckboxComponent).toMatchSnapshot();
  });

  it('should not set checkbox to checked if no value passed to component', () => {
    const { getByRole } = render(<Checkbox ariaLabel={'label'} />);
    expect(getByRole('checkbox')).not.toBeChecked();
  });

  it('should handle checkbox select', async () => {
    const onChange = vi.fn();
    const { findByLabelText } = render(
      <Checkbox ariaLabel={'label'} value={true} onChange={onChange} />
    );
    const checkbox = await findByLabelText('checkmark');
    await userEvent.click(checkbox);
    expect(onChange).toHaveBeenCalled();
  });
});
