import { createWrapper } from '@/mocks/mockGraphqlClient';
import NavLink from '../NavLink';
import Paths from '@/config/paths';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as router from 'react-router';
import { useStore } from '@/stores/useStore';

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

describe('Nav link', () => {
  it('should return undefined if no name', () => {
    const Component = createWrapper(<NavLink path={Paths.ADD_USER} />);
    const { queryAllByRole } = render(<Component />);
    const links = queryAllByRole('link');
    expect(links).toHaveLength(0);
  });

  it('should show sub menu on link click if sub menu exists', async () => {
    const props = {
      name: 'About',
      path: Paths.ABOUT,
      childRoutes: [
        {
          path: Paths.ABOUT,
          name: 'About',
          element: {
            type: {
              _payload: {
                _status: -1,
              },
            },
            key: null,
            ref: null,
            props: {},
            _owner: null,
            _store: {},
          },
        },
        {
          path: Paths.HOW_IT_WORKS,
          name: 'How it works',
          element: {
            type: {
              _payload: {
                _status: -1,
              },
            },
            key: null,
            ref: null,
            props: {},
            _owner: null,
            _store: {},
          },
        },
      ],
    };
    const Component = createWrapper(<NavLink {...props} />);
    const { getAllByRole, queryByText } = render(<Component />);
    const parentLink = getAllByRole('link', { name: 'About' })[0];
    await userEvent.click(parentLink);

    expect(queryByText('How it works')).toBeInTheDocument();
  });

  it('should handle link click and navigate when no sub menu', async () => {
    const onLinkClicked = vi.fn();
    const props = {
      onLinkClicked,
      name: 'Find your community',
      path: Paths.FIND_YOUR_COMMUNITY,
      childRoutes: [],
    };

    const Component = createWrapper(<NavLink {...props} />);
    const { getByRole } = render(<Component />);
    const link = getByRole('link', { name: 'Find your community' });

    await userEvent.click(link);
    expect(navigate).toHaveBeenCalledWith(Paths.FIND_YOUR_COMMUNITY);
    expect(onLinkClicked).toBeCalled();
  });

  it('should navigate user to sign in screen if path is login and user already signed in', async () => {
    useStore.setState({
      user: {
        userId: 'someId',
        username: 'test7@test.com',
        email: 'test7@test.com',
        type: 'charity',
        name: 'Test charity',
        id: '12fb794a-8be7-4588-8180-29c47b38721a',
      },
    });
    const props = {
      name: 'Join us',
      path: Paths.LOGIN,
      childRoutes: [],
    };
    const Component = createWrapper(<NavLink {...props} />);
    const { getByRole } = render(<Component />);

    const link = getByRole('link');
    expect(link).toHaveTextContent('Your profile');

    await userEvent.click(link);
    expect(navigate).toHaveBeenCalledWith(Paths.SIGN_IN);
  });

  it('should navigate user to login screen if path is login and user not signed in', async () => {
    const props = {
      name: 'Join us',
      path: Paths.LOGIN,
      childRoutes: [],
    };
    const Component = createWrapper(<NavLink {...props} />);
    const { getByRole } = render(<Component />);

    const link = getByRole('link');
    expect(link).toHaveTextContent('Join us');

    await userEvent.click(link);
    expect(navigate).toHaveBeenCalledWith(Paths.LOGIN);
  });
});
