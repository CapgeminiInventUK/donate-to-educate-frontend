import LogoBlue from '@/assets/logo/LogoBlue';
import {
  ComponentType,
  type DropdownOption,
  type FormTemplate,
  SummaryPageColour,
} from '@/types/data';
import getHappyPath from './signUpSchoolHappyPath';

const getCannotFindSchoolPath = (
  schoolOptions: DropdownOption[],
  cannotFindSchool: () => void
): FormTemplate[] => {
  const happyPath = getHappyPath(schoolOptions, cannotFindSchool);
  const dropdownPage = {
    ...happyPath[1],
    isUnhappyPath: true,
  };
  const cannotFindSchoolPage = {
    formComponents: [
      {
        componentType: ComponentType.SCHOOL_NOT_FOUND,
        componentData: {
          ariaLabel: 'cannot find school',
          formMeta: {
            page: 3,
          },
        },
      },
    ],
    summaryPageBg: SummaryPageColour.WHITE,
    footerLogo: <LogoBlue />,
    isUnhappyPath: true,
  };
  return [happyPath[0], dropdownPage, cannotFindSchoolPage];
};

export default getCannotFindSchoolPath;
