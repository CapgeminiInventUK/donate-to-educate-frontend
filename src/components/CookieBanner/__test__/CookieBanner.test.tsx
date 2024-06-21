import { createWrapper } from '@/mocks/mockGraphqlClient';
import CookieBanner from '../CookieBanner';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import styles from '../CookieBanner.module.scss';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
  removeItem: vi.fn(),
};

global.localStorage = localStorageMock;
describe('Cookie Banner', () => {
  const Component = createWrapper(<CookieBanner />);
  it('should set local storage and hide banner on accept button click', async () => {
    const { getByRole, getByLabelText } = render(<Component />);

    const approveButton = getByRole('button', { name: 'Allow' });

    await userEvent.click(approveButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith('cookieConsent', 'TRUE');
    expect(getByLabelText('cookie-banner')).toHaveClass(styles.hidden);
  });

  it('should set local storage and hide banner on decline button click', async () => {
    const { getByRole, getByLabelText } = render(<Component />);

    const approveButton = getByRole('button', { name: 'Decline' });

    await userEvent.click(approveButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith('cookieConsent', 'FALSE');
    expect(getByLabelText('cookie-banner')).toHaveClass(styles.hidden);
  });
});
