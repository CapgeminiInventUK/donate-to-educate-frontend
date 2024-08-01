import { render } from '@testing-library/react';
import NavLinks from '../NavLinks';
import { useStore } from '@/stores/useStore';
import { createWrapper } from '@/mocks/mockGraphqlClient';

const initialStoreState = useStore.getState();

beforeEach(() => {
  useStore.setState(initialStoreState, true);
});

afterAll(() => {
  useStore.setState(initialStoreState, true);
});

describe('navlinks component', () => {
  it('should correctly render the links', () => {
    const Component = createWrapper(<NavLinks />);
    const { queryAllByText, queryByText } = render(<Component />);

    expect(queryByText('Home')).toBeInTheDocument();
    expect(queryAllByText('About')[0]).toBeInTheDocument();
    expect(queryByText('Find your community')).toBeInTheDocument();
    expect(queryByText('Contact')).toBeInTheDocument();
    expect(queryByText('Join us')).toBeInTheDocument();
  });

  it('should correctly render the links when user signed in', () => {
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
    const Component = createWrapper(<NavLinks />);
    const { queryAllByText, queryByText } = render(<Component />);

    expect(queryByText('Home')).toBeInTheDocument();
    expect(queryAllByText('About')[0]).toBeInTheDocument();
    expect(queryByText('Find your community')).toBeInTheDocument();
    expect(queryByText('Contact')).toBeInTheDocument();
    expect(queryByText('Your profile')).toBeInTheDocument();
  });
});
