import { ComponentType, DropdownOption, FormSections, FormTemplate } from '@/types/data';
import signUpSchoolHappyPath from './signUpSchoolHappyPath';
import SchoolQuestion from '@/assets/Form/SchoolQuestion';
import LogoWhite from '@/assets/logo/LogoWhite';
import signUpCharityHappyPath from './signUpCharityHappyPath';

const getAuthorityNotRegisteredPath = (
  isSchool: boolean,
  options: DropdownOption[],
  onLocalAuthorityRegisterRequest: () => Promise<void>,
  cannotFindSchool?: () => void
): FormTemplate[] => {
  const happyPath = cannotFindSchool
    ? signUpSchoolHappyPath(options, cannotFindSchool)
    : signUpCharityHappyPath(options);

  const organisationText = isSchool ? 'school' : 'charity or volunteer group';

  const authorityNotRegisteredPath = [
    {
      header: 'Sorry, you cannot join Donate to Educate just yet',
      secondaryHeader: 'Complete our contact form',
      infoText: 'You will be able to join when your local authority joins Donate to Educate.',
      infoTextTwo: `Contact us with details about your ${organisationText}, and we will encourage your local authority to join.`,
      formComponents: [
        {
          componentType: ComponentType.TEXT,
          componentData: {
            ariaLabel: 'name',
            header: 'Name',
            isLarge: true,
            formMeta: {
              page: 2,
              field: 'name',
              section: FormSections.YOUR_DETAILS_SECTION,
            },
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            ariaLabel: 'email',
            header: 'Email',
            isLarge: true,
            formMeta: {
              page: 2,
              field: 'email',
              section: FormSections.YOUR_DETAILS_SECTION,
            },
          },
        },
        {
          componentType: ComponentType.TEXTAREA,
          componentData: {
            ariaLabel: 'message',
            header: 'Message',
            isLarge: true,
            characterLimit: 1000,
            formMeta: {
              page: 2,
              field: 'message',
              section: FormSections.YOUR_DETAILS_SECTION,
            },
          },
        },
      ],
      isUnhappyPath: true,
      onLocalAuthorityRegisterRequest,
    },
    {
      formComponents: [
        {
          componentType: ComponentType.SUMMARY,
          componentData: {
            icon: <SchoolQuestion />,
            header: 'Thank you for letting us know',
            body: [
              'We will contact you when we know more about your local authority joining Donate to Educate.',
            ],
            logo: <LogoWhite />,
          },
        },
      ],
      isUnhappyPath: true,
    },
  ];
  const initialPages = cannotFindSchool
    ? [happyPath[0], happyPath[1]]
    : [happyPath[0], happyPath[1], happyPath[2]];

  return [...initialPages, ...authorityNotRegisteredPath];
};

export default getAuthorityNotRegisteredPath;
