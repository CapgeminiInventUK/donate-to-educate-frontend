import { render } from '@testing-library/react';
import RadioGroup from '../RadioGroup';
import userEvent from '@testing-library/user-event';

describe('Radio group', () => {
  it('should handle radio button change', async () => {
    const handleChange = vi.fn();
    const radioGroupProps = {
      name: 'name',
      values: ['value one', 'value two', 'I work for a local authority'],
      labels: ['value one', 'value two', 'value three'],
      handleChange,
    };

    const { getByRole } = render(<RadioGroup {...radioGroupProps} />);

    const radioOne = getByRole('radio', { name: 'value one' });
    await userEvent.click(radioOne);

    expect(radioOne).toBeChecked();
  });
});
