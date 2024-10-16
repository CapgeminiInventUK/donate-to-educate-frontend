import { createWrapper } from '@/mocks/mockGraphqlClient';
import { useStore } from '@/stores/useStore';
import SchoolAdminDashboard from '../SchoolAdminDashboard';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
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

describe('School admin dashboard', () => {
  it('should render school profile admin page', async () => {
    useStore.setState({
      user: {
        userId: '13afa74e-2d02-4a99-a8ce-e37657285a5c',
        username: 'school@test.com',
        email: 'school@test.com',
        type: InstitutionType.SCHOOL,
        name: 'Test School',
        id: '125821',
      },
    });
    const Component = createWrapper(<SchoolAdminDashboard />);
    const { findByRole, findByText } = render(<Component />);

    const spinner = await findByRole('img');
    await waitForElementToBeRemoved(spinner);

    const header = await findByText('Test School');
    expect(header).toBeInTheDocument();
  });

  it('should render error page when API error', async () => {
    useStore.setState({
      user: {
        userId: 'someId',
        username: 'test7@test.com',
        email: 'test7@test.com',
        type: InstitutionType.SCHOOL,
        name: 'error',
        id: 'error',
      },
    });
    const Component = createWrapper(<SchoolAdminDashboard />);
    const { findByRole, findByText } = render(<Component />);

    const spinner = await findByRole('img');
    await waitForElementToBeRemoved(spinner);

    const element = await findByText('Something went wrong');
    expect(element).toBeInTheDocument();
  });

  it('should not render details if no user present', async () => {
    const Component = createWrapper(<SchoolAdminDashboard />);
    const { queryByText } = render(<Component />);

    const header = await queryByText('Test School');
    expect(header).not.toBeInTheDocument();
  });
});
