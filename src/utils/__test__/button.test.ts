import RightArrowBlue from '@/assets/icons/form-button-right-arrow-blue.svg';
import RightArrowGrey from '@/assets/icons/form-button-right-arrow-grey.svg';
import RightArrowWhite from '@/assets/icons/form-button-right-arrow-white.svg';
import type { FormButtonThemes } from '@/types/props';
import { getArrowColour } from '../button';

describe('button utils', () => {
  describe('getArrowColour', () => {
    const inputVsExpected = [
      { theme: 'formButtonDarkBlue', icon: RightArrowWhite },
      { theme: 'formButtonGrey', icon: RightArrowGrey },
      { theme: 'formButtonRed', icon: RightArrowBlue },
    ];
    it.each(inputVsExpected)('should return the correct icon', ({ theme, icon }) => {
      expect(getArrowColour(theme as FormButtonThemes)).toEqual(icon);
    });
  });
});
