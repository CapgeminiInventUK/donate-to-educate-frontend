import { fireEvent, render } from '@testing-library/react';
import ShowHide from './ShowHide';

describe('ShowHide', (): void => {
  test('renders without errors', (): void => {
    render(<ShowHide onChangePasswordVisibility={jest.fn()} />);
  });

  test('calls onChangePasswordVisibility when clicked', (): void => {
    const handleChangePasswordVisibility = jest.fn();
    const { container } = render(
      <ShowHide onChangePasswordVisibility={handleChangePasswordVisibility} />
    );

    const pointers = container.getElementsByClassName('pointer');
    fireEvent.click(pointers[0]);

    expect(pointers.length).toBe(1);
    expect(handleChangePasswordVisibility).toHaveBeenCalledWith(true);

    fireEvent.click(pointers[0]);
    expect(handleChangePasswordVisibility).toHaveBeenCalledWith(false);
  });
});
