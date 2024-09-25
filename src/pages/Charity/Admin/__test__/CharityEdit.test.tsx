import { createWrapperWithState } from '@/mocks/mockGraphqlClient';
import CharityEdit from '../CharityEdit';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { notification } from 'antd';

describe('Charity Edit', () => {
  it('should save any changes to charity profile', async () => {
    const spy = vi.spyOn(notification, 'info');
    const state = {
      type: 'tick',
      profile: {
        items: '{"0":["Coats","Trousers"]}',
        whatToExpect:
          'View the products we have in stock. While we update our stock levels regularly, they may change daily.',
        actionText:
          "Once we have your request for the products you need, we'll contact you to arrange the next steps as soon as we can.",
        productTypes: [0],
        __typename: 'ProfileItems',
      },
    };
    const Component = createWrapperWithState(<CharityEdit />, state);
    const { getAllByRole, getByRole } = render(<Component />);
    const checkboxes = getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(99);

    await userEvent.click(checkboxes[0]);

    const saveButton = getByRole('button', { name: 'save' });

    await userEvent.click(saveButton);

    expect(spy).toHaveBeenCalled();
  });

  it('should render error screen on API error', async () => {
    const state = {
      type: 'tick',
      profile: {
        items: '{"0":["Coats","Trousers"]}',
        whatToExpect:
          'View the products we have in stock. While we update our stock levels regularly, they may change daily.',
        actionText:
          "Once we have your request for the products you need, we'll contact you to arrange the next steps as soon as we can.",
        productTypes: [0],
        __typename: 'ProfileItems',
      },
    };
    const Component = createWrapperWithState(<CharityEdit />, state);
    const { getByRole, getAllByRole, findByText } = render(<Component />);

    const editButton = getAllByRole('button', { name: 'edit' });

    await userEvent.click(editButton[0]);

    const textarea = getByRole('textbox', { name: 'edit' });
    await userEvent.click(textarea);
    await userEvent.clear(textarea);
    await userEvent.keyboard('error');

    const saveButton = getAllByRole('button', { name: 'save' });

    await userEvent.click(saveButton[0]);

    const errorMessage = await findByText('Something went wrong');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should render page with empty checkboxes if profile not yet populated', () => {
    const state = {
      type: 'heart',
      profile: null,
    };

    const Component = createWrapperWithState(<CharityEdit />, state);
    const { getAllByRole } = render(<Component />);
    const checkboxes = getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(99);
  });
});
