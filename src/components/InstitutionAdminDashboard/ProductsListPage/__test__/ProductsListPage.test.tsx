import { createWrapper } from '@/mocks/mockGraphqlClient';
import ProductsListPage from '../ProductsListPage';
import { InstitutionType, ItemsIconType } from '@/types/data';
import Paths from '@/config/paths';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Institution edit', () => {
  it('should handle cancel editing', async () => {
    const setItems = vi.fn();
    const setContent = vi.fn();
    const refetch = vi.fn();
    const type = 'tick' as ItemsIconType;
    const props = {
      institutionType: InstitutionType.CHARITY,
      path: Paths.CHARITIES_CREATE_EDIT_PROFILE,
      items: {
        '0': ['Coats', 'Trousers', 'Hats', 'Pinafores'],
      },
      type,
      content: {
        actionText:
          "Once we have your request for the products you need, we'll contact you to arrange the next steps as soon as we can.",
        whatToExpect:
          'View the products we have in stock. While we update our stock levels regularly, they may change daily.',
      },
      setItems,
      setContent,
      refetch,
    };
    const Component = createWrapper(<ProductsListPage {...props} />);
    const { getAllByRole, getByRole } = render(<Component />);

    const editButtons = getAllByRole('button', { name: 'edit' });

    await userEvent.click(editButtons[0]);

    const cancelButton = getByRole('button', { name: 'cancel' });

    await userEvent.click(cancelButton);

    expect(setContent).toHaveBeenCalled();
  });
});
