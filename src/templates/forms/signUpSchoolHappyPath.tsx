import { FormTemplate, ComponentType, FormNames, FormSections, DropdownOption } from '@/types/data';
import SchoolQuestion from '@/assets/Form/SchoolQuestion';
import LogoWhite from '@/assets/logo/LogoWhite';
import getDeclarationPageTemplate from './declarationPageTemplate';

const signUpSchoolHappyPath = (
  schoolOptions: DropdownOption[],
  cannotFindSchool: () => void
): FormTemplate[] => {
  return [
    {
      formComponents: [
        {
          componentType: ComponentType.INTRO,
          componentData: {
            header: 'Join Donate to Educate',
            infoText: 'To add your school, you need to:',
            listItems: [
              'be a PTA member, governor, or senior teaching staff at your school',
              'provide us with your contact details',
              'review and agree to our GDPR statements and policies',
              'agree that we can share your information with your local authority to confirm your identity',
            ],
            secondaryHeading: 'What to expect',
            secondaryInfoText: 'Once you give us your details, we will:',
            secondaryListItems: [
              'send your details to your local authority',
              'ask your local authority to confirm your identity',
              'email you to confirm whether you can join us',
            ],
          },
        },
      ],
    },
    {
      header: 'Find your school',
      formComponents: [
        {
          componentType: ComponentType.DROPDOWN,
          componentData: {
            ariaLabel: 'school',
            subHeading: "Enter your school's name or postcode.",
            options: schoolOptions,
            isLarge: true,
            formMeta: {
              page: 1,
              field: 'School',
              section: FormSections.YOUR_DETAILS_SECTION,
            },
          },
        },
      ],
      formComponentInternalLink: {
        ariaLabel: 'cannot find school',
        text: 'I cannot find my school',
        onClick: cannotFindSchool,
        theme: 'link',
      },
    },
    {
      header: 'Your details',
      formComponents: [
        {
          componentType: ComponentType.TEXT,
          componentData: {
            ariaLabel: 'first name',
            header: 'First name',
            isLarge: true,
            formMeta: {
              page: 2,
              field: 'First name',
              section: FormSections.YOUR_DETAILS_SECTION,
            },
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            ariaLabel: 'last name',
            header: 'Last name',
            isLarge: true,
            formMeta: {
              page: 2,
              field: 'Last name',
              section: FormSections.YOUR_DETAILS_SECTION,
            },
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            ariaLabel: 'title',
            header: 'Job title or role',
            subHeading: 'For example, PTA member, governor or teaching staff.',
            isLarge: true,
            formMeta: {
              page: 2,
              field: 'Job title or role',
              section: FormSections.YOUR_DETAILS_SECTION,
            },
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            ariaLabel: 'email',
            header: 'Email',
            subHeading:
              "Use your school email address if you're staff, or personal email address if you're a PTA member or parent. You will need this email to sign in.",
            isLarge: true,
            formMeta: {
              page: 2,
              field: 'Email',
              section: FormSections.YOUR_DETAILS_SECTION,
            },
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            ariaLabel: 'phone',
            header: 'Phone',
            formMeta: {
              page: 2,
              field: 'Phone',
              section: FormSections.YOUR_DETAILS_SECTION,
            },
          },
        },
      ],
    },
    {
      header: 'Check your answers',
      formComponents: [
        {
          componentType: ComponentType.CYA,
          componentData: {
            sections: [FormSections.YOUR_DETAILS_SECTION],
            formName: FormNames.SCHOOL,
            formMeta: {
              page: 3,
            },
          },
        },
      ],
    },
    getDeclarationPageTemplate(),
    {
      formComponents: [
        {
          componentType: ComponentType.SUMMARY,
          componentData: {
            icon: <SchoolQuestion />,
            header: 'Your application has been sent',
            subHeading: 'What happens next?',
            infoText: 'You will not receive a confirmation email',
            body: [
              'Your local authority or council will review your application.',
              'We will email you with the result of your application.',
            ],
            logo: <LogoWhite />,
          },
        },
      ],
    },
  ];
};

export default signUpSchoolHappyPath;
