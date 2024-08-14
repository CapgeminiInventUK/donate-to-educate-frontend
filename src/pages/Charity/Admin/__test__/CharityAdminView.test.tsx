import { CharityAdminView } from '@/config/lazy';
import { createWrapper } from '@/mocks/mockGraphqlClient';
import { useStore } from '@/stores/useStore';
import { InstitutionType } from '@/types/data';
import { render, waitForElementToBeRemoved } from '@testing-library/react';

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

describe('Charity admin view', () => {
  it('should render charity admin view page', async () => {
    useStore.setState({
      user: {
        userId: 'someId',
        username: 'test7@test.com',
        email: 'test7@test.com',
        type: InstitutionType.CHARITY,
        name: 'Test',
        id: '1',
      },
    });
    const Component = createWrapper(<CharityAdminView />);
    const { findByRole } = render(<Component />);

    const spinner = await findByRole('img');
    await waitForElementToBeRemoved(spinner);

    const header = await findByRole('heading', { level: 1 });
    expect(header).toHaveTextContent('Test');
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
    const Component = createWrapper(<CharityAdminView />);
    const { findByRole, findByText } = render(<Component />);

    const spinner = await findByRole('img');
    await waitForElementToBeRemoved(spinner);

    const element = await findByText('Something went wrong');
    expect(element).toBeInTheDocument();
  });

  it('should not render details if no user present', async () => {
    const Component = createWrapper(<CharityAdminView />);
    const { findByRole } = render(<Component />);

    const header = await findByRole('heading', { level: 1 });
    expect(header.textContent).not.toBeTruthy();
  });
});
