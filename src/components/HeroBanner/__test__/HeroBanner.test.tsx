import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HeroBanner } from '../HeroBanner';

describe('Hero banner', () => {
  it('should handle get involved text click', async () => {
    const onGetInvolvedClick = vi.fn();
    const { getByText } = render(<HeroBanner onGetInvolvedClick={onGetInvolvedClick} />);
    const getInvolvedElement = getByText('See how you can get involved');
    await userEvent.click(getInvolvedElement);
    expect(onGetInvolvedClick).toHaveBeenCalled();
  });
});
