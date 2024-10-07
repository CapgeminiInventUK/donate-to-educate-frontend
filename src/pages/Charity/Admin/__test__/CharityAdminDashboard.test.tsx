import { createWrapper } from '@/mocks/mockGraphqlClient';
import CharityAdminDashboard from '../CharityAdminDashboard';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { useStore } from '@/stores/useStore';
import { InstitutionType } from '@/types/data';

const initialStoreState = useStore.getState();

beforeEach(() => {
  useStore.setState(initialStoreState, true);
});

afterEach(() => {
  vi.resetAllMocks();
});

afterAll(() => {
  useStore.setState(initialStoreState, true);
});

describe('Charity admin dashboard', () => {
  it('should render charity profile admin page', async () => {
    useStore.setState({
      user: {
        userId: 'someId',
        username: 'test7@test.com',
        email: 'test7@test.com',
        type: InstitutionType.CHARITY,
        name: 'TestCharity',
        id: '1',
      },
    });
    const Component = createWrapper(<CharityAdminDashboard />);
    const { findByRole, findByText } = render(<Component />);

    const spinner = await findByRole('img');
    await waitForElementToBeRemoved(spinner);

    const header = await findByText('TestCharity');
    expect(header).toBeInTheDocument();
  });

  it('should render error page when API error', async () => {
    useStore.setState({
      user: {
        userId: 'someId',
        username: 'test7@test.com',
        email: 'test7@test.com',
        type: InstitutionType.CHARITY,
        name: 'error',
        id: 'error',
      },
    });
    const Component = createWrapper(<CharityAdminDashboard />);
    const { findByRole, findByText } = render(<Component />);

    const spinner = await findByRole('img');
    await waitForElementToBeRemoved(spinner);

    const element = await findByText('Something went wrong');
    expect(element).toBeInTheDocument();
  });

  it('should not render details if no user present', async () => {
    const Component = createWrapper(<CharityAdminDashboard />);
    const { queryByText } = render(<Component />);

    const header = await queryByText('TestCharity');
    expect(header).not.toBeInTheDocument();
  });
});
