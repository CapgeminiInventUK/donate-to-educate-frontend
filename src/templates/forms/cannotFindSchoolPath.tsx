import { ComponentType, DropdownOption, FormTemplate, SummaryPageColour } from '@/types/data';
import getHappyPath from './signUpSchoolHappyPath';
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
          ariaLabel: 'cannot find school',
          formMeta: {
            page: 2,
          },
        },
      },
    ],
    summaryPageBg: SummaryPageColour.WHITE,
    footerLogo: <LogoBlue />,
    isUnhappyPath: true,
  };
  return [happyPath[0], happyPath[1], cannotFindSchoolPage];
};

export default getCannotFindSchoolPath;
