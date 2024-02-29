import { FormTemplate, ComponentType, FormNames, FormSections, DropdownOption } from '@/types/data';
import LogoBlue from '@/assets/logo/LogoBlue';
import SchoolQuestion from '@/assets/Form/SchoolQuestion';
import LogoWhite from '@/assets/logo/LogoWhite';

const getHappyPath = (
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
      header: 'Check your Answers',
      formComponents: [
        {
          componentType: ComponentType.CYA,
          componentData: {
            sections: [FormSections.YOUR_DETAILS_SECTION],
            formName: FormNames.SCHOOL,
            formMeta: {
              page: 5,
            },
          },
        },
      ],
    },
    {
      logo: <LogoBlue />,
      header: 'This service is [--------]',
      subHeader:
        'Explanation into things like security and how it is one account per supporter [-----------------------]',
      isDeclarationPage: true,
      formComponents: [
        {
          componentType: ComponentType.CHECKBOX,
          componentData: {
            label: 'GDPR content and statement [---------------]',
            formMeta: {
              page: 6,
              field: 'GDPR content and statement [---------------]',
            },
          },
          classNameSuffix: 'checkbox',
        },
        {
          componentType: ComponentType.CHECKBOX,
          componentData: {
            label: 'Legal understanding [---------------]',
            formMeta: {
              page: 6,
              field: 'Legal understanding [---------------]',
            },
          },
          classNameSuffix: 'checkbox',
        },
        {
          componentType: ComponentType.CHECKBOX,
          componentData: {
            label: 'I will be administrating the account [---------------]',
            formMeta: {
              field: 'I will be administrating the account [---------------]',
              page: 6,
            },
          },
          classNameSuffix: 'checkbox',
        },
      ],
    },
    {
      formComponents: [
        {
          componentType: ComponentType.SUMMARY,
          componentData: {
            icon: <SchoolQuestion />,
            header: 'Thanks for supporting Donate to Educate',
            body: [
              'Your local authority or local council will review your details to check whether you can join us.',
              "We'll email you with the results as soon as we have them.",
            ],
            logo: <LogoWhite />,
          },
        },
      ],
    },
  ];
};

export default getHappyPath;
