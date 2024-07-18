import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditDescription } from '../EditDescription';

describe('Edit description', () => {
  const setValue = vi.fn();
  const handleSave = vi.fn();
  const handleCancel = vi.fn();
  it('should handle text change', async () => {
    const { getByRole } = render(
      <EditDescription
        value="value"
        setValue={setValue}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
    );
    const textArea = getByRole('textbox');
    const confirmButton = getByRole('button', { name: 'save' });
    await userEvent.click(textArea);
    await userEvent.keyboard('Some more text');
    await userEvent.click(confirmButton);

    expect(setValue).toHaveBeenCalled();
    expect(handleSave).toHaveBeenCalled();
  });

  it('should handle cancel', async () => {
    const { getByRole } = render(
      <EditDescription
        value="value"
        setValue={setValue}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
    );
    const cancelButton = getByRole('button', { name: 'Cancel' });
    await userEvent.click(cancelButton);

    expect(handleCancel).toHaveBeenCalled();
  });
});
