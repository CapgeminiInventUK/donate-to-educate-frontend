import * as router from 'react-router';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { createWrapper } from '@/mocks/mockGraphqlClient';
import LogoutButton from '../LogoutButton';
import Paths from '@/config/paths';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('Logout button', () => {
  it('should logout and navigate home on click', async () => {
    const Component = createWrapper(<LogoutButton />);
    const { getByRole } = render(<Component />);

    const button = getByRole('button');

    await userEvent.click(button);

    expect(navigate).toHaveBeenCalledWith(Paths.HOME);
  });
});
