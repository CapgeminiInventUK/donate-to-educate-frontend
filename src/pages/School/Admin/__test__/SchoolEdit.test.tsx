import { createWrapperWithState } from '@/mocks/mockGraphqlClient';
import SchoolEdit from '../SchoolEdit';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { notification } from 'antd';

describe('Charity Edit', () => {
  it('should save any changes to charity profile', async () => {
    const spy = vi.spyOn(notification, 'info');
    const state = {
      type: 'plus',
      profile: {
        items: '{"5":["Computer software","Internet access","Laptops","Tablets"]}',
        whatToExpect:
          'View the products we have too much of, take it from us and share it with people who need it.',
        actionText:
          "Once we know what extra stock you can take from us, we'll contact you to arrange the next steps as soon as we can.",
        productTypes: [5],
        __typename: 'ProfileItems',
      },
      name: 'Test School',
      id: '125821',
      postcode: 'GU27 3RN',
    };
    const Component = createWrapperWithState(<SchoolEdit />, state);
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
      type: 'heart',
      profile: {
        items: '{"0":["Skirts"]}',
        whatToExpect:
          "View the products we need. When you select 'donate', you can tell us how you can help.",
        actionText:
          "Once we have your message about the products you can donate, we'll contact you to arrange the next steps as soon as we can.",
        productTypes: [0],
        __typename: 'ProfileItems',
      },
      name: 'Test School',
      id: '125821',
      postcode: 'GU27 3RN',
    };
    const Component = createWrapperWithState(<SchoolEdit />, state);
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

    const Component = createWrapperWithState(<SchoolEdit />, state);
    const { getAllByRole } = render(<Component />);
    const checkboxes = getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(99);
  });
});
