import { render } from '@testing-library/react';
import InventBanner from '../InventBanner';
import userEvent from '@testing-library/user-event';

describe('Invent banner', () => {
  vi.spyOn(window, 'open');
  it('should handle click', async () => {
    const { getByLabelText } = render(<InventBanner />);
    const banner = getByLabelText('invent-logo');
    await userEvent.click(banner);
    expect(window.open).toHaveBeenCalled();
  });
});
