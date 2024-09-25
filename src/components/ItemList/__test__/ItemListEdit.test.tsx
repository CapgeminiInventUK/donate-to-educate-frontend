import { render } from '@testing-library/react';
import ItemListEdit from '../ItemListEdit';
import userEvent from '@testing-library/user-event';

describe('Item list edit', () => {
  it('should update item list when checkbox selected', async () => {
    const initialItems = {
      0: ['Coats'],
    };
    const prevState = initialItems;
    let nextState;
    const mockSetter = vi
      .fn()
      .mockImplementation((callback: (state: Record<number, string[]>) => void) => {
        nextState = callback(prevState);
      });
    const { getByRole } = render(<ItemListEdit items={initialItems} setItems={mockSetter} />);
    const crayonsCheckbox = getByRole('checkbox', { name: 'Clothing and uniform-Shoes-edit' });

    expect(crayonsCheckbox).not.toBeChecked();

    await userEvent.click(crayonsCheckbox);

    expect(crayonsCheckbox).toBeChecked();
    expect(nextState).toEqual({
      0: ['Coats', 'Shoes'],
    });
  });

  it('should select all items in category', async () => {
    const initialItems = {};
    const prevState = initialItems;
    let nextState;
    const mockSetter = vi
      .fn()
      .mockImplementation((callback: (state: Record<number, string[]>) => void) => {
        nextState = callback(prevState);
      });
    const { getByRole } = render(<ItemListEdit items={initialItems} setItems={mockSetter} />);
    const selectAllCheckbox = getByRole('checkbox', {
      name: 'Clothing and uniform-select-all-edit',
    });

    await userEvent.click(selectAllCheckbox);

    expect(nextState).toEqual({ 0: ['Wellies'] });
  });
});
