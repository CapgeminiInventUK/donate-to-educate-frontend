import { createWrapper } from '@/mocks/mockGraphqlClient';
import PrivateRoute from '../PrivateRoute';
import { render } from '@testing-library/react';
import Paths from '@/config/paths';
import { useStore } from '@/stores/useStore';
import * as router from 'react-router';
import { InstitutionType } from '@/types/data';

const navigate = vi.fn();
const initialStoreState = useStore.getState();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  useStore.setState(initialStoreState, true);
});

afterEach(() => {
  vi.resetAllMocks();
});

afterAll(() => {
  useStore.setState(initialStoreState, true);
});

describe('Private route', () => {
  it('should render spinner when in loading state', () => {
    useStore.setState({ ...initialStoreState, isLoading: true });

    const Component = createWrapper(
      <PrivateRoute>
        <></>
      </PrivateRoute>
    );
    const { queryByRole } = render(<Component />);

    expect(queryByRole('img')).toBeInTheDocument();
  });

  it('should return children if no route passed', () => {
    useStore.setState({ ...initialStoreState, isLoading: false });
    const Component = createWrapper(
      <PrivateRoute route={''}>
        <span>Test content</span>
      </PrivateRoute>
    );
    const { queryByText } = render(<Component />);

    expect(queryByText('Test content')).toBeInTheDocument();
  });

  it('should navigate to the given route if no user type', () => {
    useStore.setState({
      isLoading: false,
      user: {
        userId: 'someId',
        username: 'test7@test.com',
        email: 'test7@test.com',
        id: '12fb794a-8be7-4588-8180-29c47b38721a',
        type: '',
        name: 'test name',
      },
    });
    const Component = createWrapper(
      <PrivateRoute route={Paths.ACCESSIBILITY_STATEMENT}>
        <span>Test content</span>
      </PrivateRoute>
    );

    render(<Component />);

    expect(navigate).toHaveBeenCalledWith(Paths.ACCESSIBILITY_STATEMENT);
  });

  it('should navigate to redirect url if auth type does not match ', () => {
    useStore.setState({
      isLoading: false,
      user: {
        userId: 'someId',
        type: InstitutionType.CHARITY,
        username: 'test7@test.com',
        email: 'test7@test.com',
        id: '12fb794a-8be7-4588-8180-29c47b38721a',
        name: 'test name',
      },
    });
    const Component = createWrapper(
      <PrivateRoute route={Paths.ACCESSIBILITY_STATEMENT} authType="school">
        <span>Test content</span>
      </PrivateRoute>
    );

    render(<Component />);
    expect(navigate).toHaveBeenCalledWith(Paths.CHARITIES_CREATE_EDIT_PROFILE);
  });

  it('should return children if auth type does match ', () => {
    useStore.setState({
      isLoading: false,
      user: {
        userId: 'someId',
        type: InstitutionType.CHARITY,
        username: 'test7@test.com',
        email: 'test7@test.com',
        id: '12fb794a-8be7-4588-8180-29c47b38721a',
        name: 'test name',
      },
    });
    const Component = createWrapper(
      <PrivateRoute route={Paths.ACCESSIBILITY_STATEMENT} authType="charity">
        <span>Test content</span>
      </PrivateRoute>
    );

    const { queryByText } = render(<Component />);

    expect(queryByText('Test content')).toBeInTheDocument();
  });
});
