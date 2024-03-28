import LogoBlue from '@/assets/logo/LogoBlue';
import Paths from '@/config/paths';
import { ComponentType, FormTemplate } from '@/types/data';
import { Link } from 'react-router-dom';

const getDeclarationPageTemplate = (): FormTemplate => {
  return {
    logo: <LogoBlue />,
    header: 'Read our privacy policy',
    subHeader: (
      <>
        Before you join Donate to Education, you must read our{' '}
        <Link target="__blank" to={Paths.PRIVACY_POLICY}>
          privacy policy (opens in new tab)
        </Link>
        .
      </>
    ),
    isDeclarationPage: true,
    formComponents: [
      {
        componentType: ComponentType.CHECKBOX,
        componentData: {
          ariaLabel: 'privacy policy',
          label: 'I have read the Donate to Educate privacy policy',
          formMeta: {
            page: 4,
            field: 'I have read the Donate to Educate privacy policy',
          },
        },
        classNameSuffix: 'checkbox',
      },
    ],
  };
};

export default getDeclarationPageTemplate;
