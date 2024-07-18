import RightArrowBlue from '@/assets/icons/form-button-right-arrow-blue.svg';
import RightArrowGrey from '@/assets/icons/form-button-right-arrow-grey.svg';
import RightArrowWhite from '@/assets/icons/form-button-right-arrow-white.svg';
import type { FormButtonThemes } from '@/types/props';

export const getArrowColour = (theme: FormButtonThemes): string => {
  switch (theme) {
    case 'formButtonDarkBlue':
    case 'formButtonMidBlue':
    case 'formButtonGreen':
    case 'formButtonGreenDisabled':
      return RightArrowWhite;
    case 'formButtonGrey':
    case 'formButtonDisabled':
      return RightArrowGrey;
    case 'formButtonRed':
    case 'formButtonLightBlue':
      return RightArrowBlue;
  }
};
