import { render } from '@testing-library/react';
import { EditDescription } from '../EditDescription';
import userEvent from '@testing-library/user-event';

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
    const cancelButton = getByRole('button', { name: 'cancel' });
    await userEvent.click(cancelButton);

    expect(handleCancel).toHaveBeenCalled();
  });
});
