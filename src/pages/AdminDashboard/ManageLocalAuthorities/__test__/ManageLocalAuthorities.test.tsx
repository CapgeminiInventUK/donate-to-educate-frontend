import { createWrapper, setupFailedNetworkRequest } from '@/mocks/mockGraphqlClient';
import * as router from 'react-router';
import ManageLocalAuthorities from '../ManageLocalAuthorities';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { server } from '@/mocks/server';
import userEvent from '@testing-library/user-event';
import Paths from '@/config/paths';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('Manage Local Authorities', () => {
  it('should render tables with local authorities from API call', async () => {
    const Component = createWrapper(<ManageLocalAuthorities />);
    const { getAllByRole, findByRole } = render(<Component />);

    const spinner = await findByRole('img');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spinner).then(() => {
      const rows = getAllByRole('row');
      expect(rows).toHaveLength(11);
    });
  });

  it('should handle filter', async () => {
    const Component = createWrapper(<ManageLocalAuthorities />);
    const { getAllByRole, findByRole, findAllByRole, getByRole, queryAllByRole } = render(
      <Component />
    );

    const spinner = await findByRole('img');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spinner).then(async () => {
      const addUserLinksNotFound = queryAllByRole('button', { name: 'add user' });
      expect(addUserLinksNotFound).toHaveLength(0);

      const filterButtons = getAllByRole('button', { name: 'filter' });

      await userEvent.click(filterButtons[0]);

      const checkboxes = await findAllByRole('checkbox');

      await userEvent.click(checkboxes[1]);

      const okButton = getByRole('button', { name: 'OK' });

      await userEvent.click(okButton);

      const addUserLinks = getAllByRole('button', { name: 'add user' });
      expect(addUserLinks).toHaveLength(10);

      await userEvent.click(addUserLinks[0]);
      expect(navigate).toHaveBeenCalledWith(Paths.ADMIN_DASHBOARD_SIGN_UP, {
        state: { la: 'Hillingdon', id: '312' },
      });
    });
  });

  it('should handle API error', async () => {
    server.use(setupFailedNetworkRequest());
    const Component = createWrapper(<ManageLocalAuthorities />);
    const { findByText, findByRole } = render(<Component />);

    const spinner = await findByRole('img');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spinner).then(async () => {
      const element = await findByText('Something went wrong');
      expect(element).toBeInTheDocument();
    });
  });
});
