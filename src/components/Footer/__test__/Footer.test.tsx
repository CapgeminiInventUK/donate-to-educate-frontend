import { render } from '@testing-library/react';
import Footer from '../Footer';
import { createWrapper } from '@/mocks/mockGraphqlClient';
import * as router from 'react-router';
import userEvent from '@testing-library/user-event';
import Paths from '@/config/paths';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('Footer', () => {
  it('should render component', () => {
    const Component = createWrapper(<Footer />);
    const screen = render(<Component />);
    expect(screen).toMatchSnapshot();
  });

  it('should handle button click', async () => {
    const Component = createWrapper(<Footer />);
    const { getByRole } = render(<Component />);
    const button = getByRole('button', { name: 'Contact us' });
    await userEvent.click(button);

    expect(navigate).toHaveBeenCalledWith(Paths.CONTACT);
  });
});
