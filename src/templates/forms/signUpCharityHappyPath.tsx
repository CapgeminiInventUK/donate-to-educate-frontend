import SchoolQuestion from '@/assets/Form/SchoolQuestion';
import LogoWhite from '@/assets/logo/LogoWhite';
import { ComponentType, DropdownOption, FormNames, FormSections, FormTemplate } from '@/types/data';
import getDeclarationPageTemplate from './declarationPageTemplate';

const signUpCharityHappyPath = (localAuthorityOptions: DropdownOption[]): FormTemplate[] => [
  {
    formComponents: [
      {
        componentType: ComponentType.INTRO,
        componentData: {
          header: 'Join Donate to Educate',
          infoText: 'To support us and help families and schools, you need to:',
          listItems: [
            'work at a charity or be a volunteer',
            'have a work address or premises to store school products',
            'provide us with your contact details',
            'review and agree to our GDPR statements and policies',
            'agree that we can share your information with your local authority or local council to confirm your identity',
          ],
          secondaryHeading: 'What to expect',
          secondaryInfoText: `One you give us your details, we will:`,
          secondaryListItems: [
            `send you details to your local authority or local council`,
            `your local authority or local council will confirm your identity`,
            `you will get an email to confirm whether you can join`,
          ],
        },
      },
    ],
  },
  {
    header: 'Name of charity or volunteer group',
    formComponents: [
      {
        componentType: ComponentType.TEXT,
        componentData: {
          ariaLabel: 'name',
          isLarge: true,
          formMeta: {
            page: 1,
            field: 'Name',
            section: FormSections.CHARITY_SECTION,
          },
        },
      },
    ],
  },
  {
    header: "What is the name of your charity or volunteer group's local council?",
    formComponents: [
      {
        componentType: ComponentType.DROPDOWN,
        componentData: {
          ariaLabel: 'main local council',
          subHeading: 'If you have locations across the country, choose one main local council.',
          options: localAuthorityOptions,
          isLarge: true,
          formMeta: {
            page: 2,
            field: 'Main local council',
            section: FormSections.CHARITY_SECTION,
          },
        },
        formComponentLink: {
          ariaLabel: 'find local council',
          linkText: 'Find my local council (opens in a new tab).',
          linkUrl: 'https://www.gov.uk/find-local-council',
        },
      },
    ],
  },
  {
    header: 'Your details',
    formComponents: [
      {
        componentType: ComponentType.TEXT,
        componentData: {
          header: 'First name',
          ariaLabel: 'first name',
          isLarge: true,
          formMeta: {
            page: 3,
            field: 'First name',
            section: FormSections.YOUR_DETAILS_SECTION,
          },
        },
      },
      {
        componentType: ComponentType.TEXT,
        componentData: {
          header: 'Last name',
          ariaLabel: 'last name',
          isLarge: true,
          formMeta: {
            page: 3,
            field: 'Last name',
            section: FormSections.YOUR_DETAILS_SECTION,
          },
        },
      },
      {
        componentType: ComponentType.TEXT,
        componentData: {
          header: 'Job title or role',
          ariaLabel: 'title',
          subHeading: 'For example, volunteer manager, fundraiser, project coordinator.',
          isLarge: true,
          formMeta: {
            page: 3,
            field: 'Job title or role',
            section: FormSections.YOUR_DETAILS_SECTION,
          },
        },
      },
      {
        componentType: ComponentType.TEXT,
        componentData: {
          header: 'Email',
          ariaLabel: 'email',
          subHeading:
            "Use your charity email address if you're staff, or personal email address if you're a volunteer. You will need this email to sign in.",
          isLarge: true,
          formMeta: {
            page: 3,
            field: 'Email',
            section: FormSections.YOUR_DETAILS_SECTION,
          },
        },
      },
      {
        componentType: ComponentType.TEXT,
        componentData: {
          header: 'Phone',
          ariaLabel: 'phone',
          formMeta: {
            page: 3,
            field: 'Phone',
            section: FormSections.YOUR_DETAILS_SECTION,
          },
        },
      },
    ],
  },
  {
    header: "What is your charity or volunteer group's main address?",
    subHeader: 'This can be your work address or where you store your school products',
    formComponents: [
      {
        componentType: ComponentType.TEXT,
        componentData: {
          header: 'Address line 1',
          ariaLabel: 'address line 1',
          isLarge: true,
          formMeta: {
            page: 4,
            field: 'Address line 1',
            section: FormSections.CHARITY_SECTION,
          },
        },
      },
      {
        componentType: ComponentType.TEXT,
        componentData: {
          header: 'Address line 2 (optional)',
          ariaLabel: 'address line 2 (optional)',
          isLarge: true,
          formMeta: {
            page: 4,
            field: 'Address line 2',
            section: FormSections.CHARITY_SECTION,
          },
        },
      },
      {
        componentType: ComponentType.TEXT,
        componentData: {
          header: 'Town or city',
          ariaLabel: 'town or city',
          formMeta: {
            page: 4,
            field: 'Town',
            section: FormSections.CHARITY_SECTION,
          },
        },
      },
      {
        componentType: ComponentType.TEXT,
        componentData: {
          header: 'County',
          ariaLabel: 'county',
          formMeta: {
            page: 4,
            field: 'County',
            section: FormSections.CHARITY_SECTION,
          },
        },
      },
      {
        componentType: ComponentType.TEXT,
        componentData: {
          header: 'Postcode',
          ariaLabel: 'postcode',
          isSmall: true,
          formMeta: {
            page: 4,
            field: 'Postcode',
            section: FormSections.CHARITY_SECTION,
          },
        },
      },
    ],
  },
  {
    header: 'Tell us about your charity or volunteer group',
    formComponents: [
      {
        componentType: ComponentType.TEXTAREA,
        componentData: {
          ariaLabel: 'about',
          subHeading:
            'Describe the great work your charity or volunteer group are doing. Let us know how you can help families and schools.',
          hint: 'This information can only be seen by Donate to Educate administrators.',
          characterLimit: 1000,
          formMeta: {
            page: 5,
            field: 'About',
            section: FormSections.CHARITY_SECTION,
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
          sections: [FormSections.YOUR_DETAILS_SECTION, FormSections.CHARITY_SECTION],
          formName: FormNames.CHARITY,
          formMeta: {
            page: 5,
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

export default signUpCharityHappyPath;
