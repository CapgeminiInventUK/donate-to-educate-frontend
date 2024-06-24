import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShowHide from './ShowHide';
import styles from './ShowHide.module.scss';

describe('ShowHide', (): void => {
  test('renders without errors', (): void => {
    render(<ShowHide onChangePasswordVisibility={vi.fn()} />);
  });

  test('calls onChangePasswordVisibility when clicked', async (): Promise<void> => {
    const handleChangePasswordVisibility = vi.fn();
    const { container } = render(
      <ShowHide onChangePasswordVisibility={handleChangePasswordVisibility} />
    );

    const pointers = container.getElementsByClassName(styles.pointer);

    await waitFor(async () => {
      await userEvent.click(pointers[0]);
    });

    expect(pointers.length).toBe(1);
    expect(handleChangePasswordVisibility).toHaveBeenCalledWith(true);

    await waitFor(async () => {
      await userEvent.click(pointers[0]);
    });
    expect(handleChangePasswordVisibility).toHaveBeenCalledWith(false);
  });
});
