import { createWrapper } from '@/mocks/mockGraphqlClient';
import * as router from 'react-router';
import InstitutionAdminView from '../InstitutionAdminView';
import { InstitutionType } from '@/types/data';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Paths from '@/config/paths';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('Institution admin view', () => {
  it('should handle back button click', async () => {
    const Component = createWrapper(
      <InstitutionAdminView type={InstitutionType.SCHOOL} name={'Test'} postcode={'PO5 7OD'} />
    );
    const { getByRole } = render(<Component />);
    const backButton = getByRole('button', { name: 'Back' });
    await userEvent.click(backButton);
    expect(navigate).toHaveBeenCalledWith(Paths.HOME);
  });

  it('should handle navigation to profile edit page', async () => {
    const Component = createWrapper(
      <InstitutionAdminView type={InstitutionType.CHARITY} name={'Test'} postcode={'PO5 7OD'} />
    );
    const { getByRole } = render(<Component />);
    const editPageButton = getByRole('button', { name: 'view and edit profile' });
    await userEvent.click(editPageButton);
    expect(navigate).toHaveBeenCalledWith(Paths.CHARITIES_CREATE_EDIT_PROFILE);
  });
});
