import { FormButtonThemes } from '@/types/props';
import RightArrowWhite from '@/assets/icons/form-button-right-arrow-white.svg';
import RightArrowGrey from '@/assets/icons/form-button-right-arrow-grey.svg';
import RightArrowBlue from '@/assets/icons/form-button-right-arrow-blue.svg';

export const getArrowColour = (theme: FormButtonThemes): string => {
  switch (theme) {
    case 'formButtonDarkBlue':
    case 'formButtonMidBlue':
    case 'formButtonGreen':
    case 'formButtonGreenDisabled':
    case 'formButtonDanger':
      return RightArrowWhite;
    case 'formButtonGrey':
    case 'formButtonDisabled':
      return RightArrowGrey;
    case 'formButtonRed':
    case 'formButtonLightBlue':
      return RightArrowBlue;
  }
};
