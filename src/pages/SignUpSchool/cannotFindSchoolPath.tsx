import { ComponentType, FormMeta, FormTemplate } from '@/types/data';
import getHappyPath from './happyPath';
import LogoBlue from '@/assets/logo/LogoBlue';

const getCannotFindSchoolPath = (
  onChange: (value: string | number | boolean, formMeta: FormMeta | undefined) => void,
  cannotFindSchool: () => void
): FormTemplate[] => {
  const happyPath = getHappyPath(onChange, cannotFindSchool);
  const cannotFindSchoolPage = {
    formComponents: [
      {
        componentType: ComponentType.SCHOOL_NOT_FOUND,
        componentData: {
          formMeta: {
            page: 1,
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
