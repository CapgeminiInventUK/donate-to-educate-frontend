import Paths from '@/config/paths';
import { createWrapper } from '@/mocks/mockGraphqlClient';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as router from 'react-router';
import Footer from '../Footer';

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
