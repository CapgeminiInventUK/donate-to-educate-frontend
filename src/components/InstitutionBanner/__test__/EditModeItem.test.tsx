import { render } from '@testing-library/react';
import EditModeItem from '../EditModeItem';
import { schoolBanner } from './mockData';
import userEvent from '@testing-library/user-event';

describe('Edit mode item', () => {
  it('should', async () => {
    const prevState = schoolBanner;
    let nextState;
    const mockSetter = vi
      .fn()
      .mockImplementation((callback: (state: Record<string, string>) => void) => {
        nextState = callback(prevState);
      });
    const { getByRole } = render(
      <EditModeItem
        icon={<></>}
        itemName={'phone'}
        item={'01234587856'}
        setBanner={mockSetter}
        placeholder={''}
      />
    );
    const input = getByRole('textbox');
    await userEvent.click(input);
    await userEvent.keyboard('7');
    expect(nextState).toEqual({ ...schoolBanner, phone: '012345878567' });
  });
});
