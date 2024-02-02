import { ComponentType, DropdownOption, FormTemplate } from '@/types/data';
import getHappyPath from './happyPath';
import LogoBlue from '@/assets/logo/LogoBlue';

const getCannotFindSchoolPath = (
  schoolOptions: DropdownOption[],
  cannotFindSchool: () => void
): FormTemplate[] => {
  const happyPath = getHappyPath(schoolOptions, cannotFindSchool);
  const cannotFindSchoolPage = {
    formComponents: [
      {
        componentType: ComponentType.SCHOOL_NOT_FOUND,
        componentData: {
          formMeta: {
            page: 2,
          },
        },
      },
    ],
    footerLogo: <LogoBlue />,
    isUnhappyPath: true,
  };
  return [happyPath[0], happyPath[1], cannotFindSchoolPage];
};

export default getCannotFindSchoolPath;
