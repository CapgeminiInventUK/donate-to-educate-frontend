import { createWrapper } from '@/mocks/mockGraphqlClient';
import PrivateRoute from '../PrivateRoute';
import { render } from '@testing-library/react';
import Paths from '@/config/paths';
import * as store from '@/stores/useStore';
import * as router from 'react-router';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('Private route', () => {
  it('should render spinner when in loading state', () => {
    vi.spyOn(store, 'useStore').mockImplementation(() => ({
      isLoading: true,
    }));

    const Component = createWrapper(
      <PrivateRoute>
        <></>
      </PrivateRoute>
    );
    const { queryByRole } = render(<Component />);

    expect(queryByRole('img')).toBeInTheDocument();
  });

  it('should return children if no route passed', () => {
    vi.spyOn(store, 'useStore').mockImplementation(() => ({
      isLoading: false,
    }));
    const Component = createWrapper(
      <PrivateRoute route={''}>
        <span>Test content</span>
      </PrivateRoute>
    );
    const { queryByText } = render(<Component />);

    expect(queryByText('Test content')).toBeInTheDocument();
  });

  it('should navigate to the given route if no user type', () => {
    vi.spyOn(store, 'useStore').mockImplementation(() => ({
      isLoading: false,
      user: {
        userId: 'someId',
        username: 'test7@test.com',
        email: 'test7@test.com',
        id: '12fb794a-8be7-4588-8180-29c47b38721a',
      },
    }));
    const Component = createWrapper(
      <PrivateRoute route={Paths.ACCESSIBILITY_STATEMENT}>
        <span>Test content</span>
      </PrivateRoute>
    );

    render(<Component />);

    expect(navigate).toHaveBeenCalledWith(Paths.ACCESSIBILITY_STATEMENT);
  });

  it('should navigate to redirect url if auth type does not match ', () => {
    vi.spyOn(store, 'useStore').mockImplementation(() => ({
      isLoading: false,
      user: {
        userId: 'someId',
        type: 'charity',
        username: 'test7@test.com',
        email: 'test7@test.com',
        id: '12fb794a-8be7-4588-8180-29c47b38721a',
      },
    }));
    const Component = createWrapper(
      <PrivateRoute route={Paths.ACCESSIBILITY_STATEMENT} authType="school">
        <span>Test content</span>
      </PrivateRoute>
    );

    render(<Component />);
    expect(navigate).toHaveBeenCalledWith(Paths.CHARITIES_CREATE_EDIT_PROFILE);
  });

  it('should return children if auth type does match ', () => {
    vi.spyOn(store, 'useStore').mockImplementation(() => ({
      isLoading: false,
      user: {
        userId: 'someId',
        type: 'charity',
        username: 'test7@test.com',
        email: 'test7@test.com',
        id: '12fb794a-8be7-4588-8180-29c47b38721a',
      },
    }));
    const Component = createWrapper(
      <PrivateRoute route={Paths.ACCESSIBILITY_STATEMENT} authType="charity">
        <span>Test content</span>
      </PrivateRoute>
    );

    const { queryByText } = render(<Component />);

    expect(queryByText('Test content')).toBeInTheDocument();
  });
});
