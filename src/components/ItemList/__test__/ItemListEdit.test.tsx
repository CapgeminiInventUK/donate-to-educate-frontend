import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemListEdit from '../ItemListEdit';

describe('Item list edit', () => {
  it('should update item list when checkbox selected', async () => {
    const initialItems = {
      2: ['Guitars'],
    };
    const prevState = initialItems;
    let nextState;
    const mockSetter = vi
      .fn()
      .mockImplementation((callback: (state: Record<number, string[]>) => void) => {
        nextState = callback(prevState);
      });
    const { getByRole } = render(<ItemListEdit items={initialItems} setItems={mockSetter} />);
    const crayonsCheckbox = getByRole('checkbox', { name: 'Art and music-Crayons-edit' });

    expect(crayonsCheckbox).not.toBeChecked();

    await userEvent.click(crayonsCheckbox);

    expect(crayonsCheckbox).toBeChecked();
    expect(nextState).toEqual({
      2: ['Guitars', 'Crayons'],
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
    const selectAllCheckbox = getByRole('checkbox', { name: 'Sports-select-all-edit' });

    await userEvent.click(selectAllCheckbox);

    expect(nextState).toEqual({ 1: ['Water bottle'] });
  });
});
