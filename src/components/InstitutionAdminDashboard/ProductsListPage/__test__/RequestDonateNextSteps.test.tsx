import { createWrapper } from '@/mocks/mockGraphqlClient';
import RequestDonateNextSteps from '../RequestDonateNextSteps';
import { InstitutionType } from '@/types/data';
import Paths from '@/config/paths';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  vi.resetAllMocks();
});

describe('Request Donate next steps', () => {
  const setContent = vi.fn();
  const setSaveDisabled = vi.fn();
  const refetch = vi.fn();
  const props = {
    institutionType: InstitutionType.CHARITY,
    content: {
      actionText:
        "Once we have your request for the products you need, we'll contact you to arrange the next steps as soon as we can.",
      whatToExpect:
        'View the products we have in stock. While we update our stock levels regularly, they may change daily.',
    },
    saveDisabled: true,
    path: Paths.CHARITIES_CREATE_EDIT_PROFILE,
    setContent,
    setSaveDisabled,
    refetch,
  };
  it('should handle edit button click and edit text', async () => {
    const Component = createWrapper(<RequestDonateNextSteps {...props} />);
    const { getByRole, getAllByRole } = render(<Component />);

    const editButton = getByRole('button', { name: 'edit' });

    await userEvent.click(editButton);

    const textArea = getByRole('textbox', { name: 'edit' });
    expect(textArea).toHaveProperty('value', props.content.actionText);

    await userEvent.click(textArea);
    await userEvent.clear(textArea);
    await userEvent.keyboard('New text');

    expect(setContent).toHaveBeenCalled();

    const saveButton = getAllByRole('button', { name: 'save' })[0];
    await userEvent.click(saveButton);

    expect(refetch).toHaveBeenCalled();
  });

  it('should handle edit button click and cancel', async () => {
    const Component = createWrapper(<RequestDonateNextSteps {...props} />);
    const { getByRole } = render(<Component />);

    const editButton = getByRole('button', { name: 'edit' });

    await userEvent.click(editButton);

    const textArea = getByRole('textbox', { name: 'edit' });
    expect(textArea).toHaveProperty('value', props.content.actionText);

    await userEvent.click(textArea);
    await userEvent.clear(textArea);
    await userEvent.keyboard('New text');

    expect(setContent).toHaveBeenCalledTimes(9);

    const cancelButton = getByRole('button', { name: 'cancel' });
    await userEvent.click(cancelButton);

    expect(refetch).not.toHaveBeenCalled();
    expect(setContent).toHaveBeenCalledTimes(10);
  });
});
