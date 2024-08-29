import {
  createWrapper,
  setupFailedNetworkRequest,
  useDifferentResponseDataToDefault,
} from '@/mocks/mockGraphqlClient';
import * as router from 'react-router';
import ManageSchools from '../ManageSchools';
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

describe('Manage Schools', () => {
  it('should render table with schools fetched from API', async () => {
    const Component = createWrapper(<ManageSchools />);
    const { getAllByRole, findByRole, getByLabelText } = render(<Component />);

    const spinner = await findByRole('img');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spinner).then(async () => {
      const rows = getAllByRole('row');
      expect(rows).toHaveLength(3);

      const totalJoinedText = getByLabelText('total-joined');
      expect(totalJoinedText).toHaveTextContent('2');

      const schoolLink = await findByRole('button', { name: 'name-The Aldgate School' });
      await userEvent.click(schoolLink);

      expect(navigate).toHaveBeenCalledWith(Paths.SCHOOLS_DASHBOARD, {
        state: { id: '100000', name: 'The Aldgate School', urn: '100000' },
      });
    });
  });

  it('should render empty table if no schools fetched from API', async () => {
    server.use(
      useDifferentResponseDataToDefault('GetRegisteredSchools', { getRegisteredSchools: undefined })
    );
    const Component = createWrapper(<ManageSchools />);
    const { queryAllByRole, findByRole, getByLabelText } = render(<Component />);

    const spinner = await findByRole('img');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spinner).then(() => {
      const rows = queryAllByRole('row');
      expect(rows).toHaveLength(2);

      const totalJoinedText = getByLabelText('total-joined');
      expect(totalJoinedText).toHaveTextContent('0');
    });
  });

  it('should handle API error', async () => {
    server.use(setupFailedNetworkRequest());
    const Component = createWrapper(<ManageSchools />);
    const { findByText, findByRole } = render(<Component />);

    const spinner = await findByRole('img');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spinner).then(async () => {
      const element = await findByText('Something went wrong');
      expect(element).toBeInTheDocument();
    });
  });
});
