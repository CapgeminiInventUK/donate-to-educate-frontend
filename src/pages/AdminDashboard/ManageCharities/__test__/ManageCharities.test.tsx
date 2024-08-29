import {
  createWrapper,
  setupFailedNetworkRequest,
  useDifferentResponseDataToDefault,
} from '@/mocks/mockGraphqlClient';
import * as router from 'react-router';
import ManageCharities from '../ManageCharities';
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

describe('Manage Charities', () => {
  it('should render table with charities fetched from API', async () => {
    const Component = createWrapper(<ManageCharities />);
    const { getAllByRole, findByRole, getByLabelText } = render(<Component />);

    const spinner = await findByRole('img');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spinner).then(async () => {
      const rows = getAllByRole('row');
      expect(rows).toHaveLength(3);

      const totalJoinedText = getByLabelText('total-joined');
      expect(totalJoinedText).toHaveTextContent('2');

      const charityLink = await findByRole('button', { name: 'name-Test' });
      await userEvent.click(charityLink);

      expect(navigate).toHaveBeenCalledWith(Paths.CHARITY_DASHBOARD, {
        state: { id: '123456', name: 'Test', urn: '123456' },
      });
    });
  });

  it('should render empty table if no charities fetched from API', async () => {
    server.use(useDifferentResponseDataToDefault('GetCharities', { getCharities: undefined }));
    const Component = createWrapper(<ManageCharities />);
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
    const Component = createWrapper(<ManageCharities />);
    const { findByText, findByRole } = render(<Component />);

    const spinner = await findByRole('img');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spinner).then(async () => {
      const element = await findByText('Something went wrong');
      expect(element).toBeInTheDocument();
    });
  });
});
