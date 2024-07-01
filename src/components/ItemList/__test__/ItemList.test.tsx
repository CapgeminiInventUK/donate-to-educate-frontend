import { render } from '@testing-library/react';
import ItemList from '../ItemList';

describe('Item List', () => {
  it('should return an empty container if no items present', () => {
    const { queryByRole } = render(<ItemList type={'tick'} items={{ 0: [] }} />);
    expect(queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  });

  it('should return list of items', () => {
    const items = {
      '0': ['Blazers', 'Jumpers', 'Name labels'],
    };
    const { queryByRole } = render(<ItemList type={'tick'} items={items} />);
    expect(queryByRole('heading', { level: 3 })).toBeInTheDocument();
  });
});
