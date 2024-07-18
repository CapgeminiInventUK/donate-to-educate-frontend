import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeclineDeleteModal from '../DeclineDeleteModal';

describe('Decline', () => {
  it('should close the modal on back button click', async () => {
    const setShowModal = vi.fn();
    const onConfirm = vi.fn();
    const { getByRole } = render(
      <DeclineDeleteModal
        showModal={true}
        setShowModal={setShowModal}
        onConfirm={onConfirm}
        bodyText="Body text"
        confirmText="Confirm"
      />
    );
    const backButton = getByRole('button', { name: 'back' });

    await userEvent.click(backButton);

    expect(setShowModal).toHaveBeenCalledWith(false);
  });
});
