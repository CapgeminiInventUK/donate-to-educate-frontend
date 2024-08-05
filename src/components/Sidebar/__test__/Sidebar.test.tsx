import { createWrapper } from '@/mocks/mockGraphqlClient';
import Sidebar from '../Sidebar';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Sidebar', () => {
  it('should handle opening and closing sidebar', async () => {
    const Component = createWrapper(<Sidebar />);
    const { getByRole, queryByRole } = render(<Component />);

    const navMenu = getByRole('button', { name: 'hamburger-menu' });
    const closeButtonNotShown = queryByRole('button', { name: 'close-menu' });
    expect(closeButtonNotShown).not.toBeInTheDocument();

    await userEvent.click(navMenu);

    const closeButtonShown = queryByRole('button', { name: 'close-menu' });
    expect(closeButtonShown).toBeInTheDocument();

    if (closeButtonShown) {
      await userEvent.click(closeButtonShown);
      expect(closeButtonShown).not.toBeInTheDocument();
    }
  });

  it('should close sidebar on link clicked', async () => {
    const Component = createWrapper(<Sidebar />);
    const { getByRole, getAllByRole, queryByRole } = render(<Component />);

    const navMenu = getByRole('button', { name: 'hamburger-menu' });

    await userEvent.click(navMenu);

    const links = getAllByRole('link');

    await userEvent.click(links[0]);

    const closeButton = queryByRole('button', { name: 'close-menu' });
    expect(closeButton).not.toBeInTheDocument();
  });
});
