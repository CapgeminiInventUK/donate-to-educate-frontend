import Heart from '@/assets/ItemList/Heart';
import Plus from '@/assets/ItemList/Plus';
import Tick from '@/assets/ItemList/Tick';
import { getItemsIcon } from '../getIcons';
import { ItemsIconType } from '@/types/data';

describe('getItemsIcon', () => {
  const inputVsExpected = [
    { type: 'tick', icon: <Tick /> },
    { type: 'heart', icon: <Heart /> },
    { type: 'plus', icon: <Plus /> },
  ];
  it.each(inputVsExpected)('should return the correct icon', ({ type, icon }) => {
    expect(getItemsIcon(type as ItemsIconType)).toEqual(icon);
  });
});
