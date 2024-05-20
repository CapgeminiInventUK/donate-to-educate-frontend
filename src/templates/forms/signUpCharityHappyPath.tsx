import { ComponentType, DropdownOption, FormNames, FormSections, FormTemplate } from '@/types/data';
import getDeclarationPageTemplate from './declarationPageTemplate';
import getSummaryPageTemplate from './summaryPage';

const signUpCharityHappyPath = (localAuthorityOptions: DropdownOption[]): FormTemplate[] => [
  {
    formComponents: [
      {
        componentType: ComponentType.INTRO,
        componentData: {
          header: 'Join Donate to Educate as a charity or volunteer organisation',
          infoText:
            'If your organisation has a premises where you can store school products, join our network.',
          secondaryHeading: 'How it works',
          secondaryListItems: [
            `Provide us with your details`,
            `Read and agree to our privacy policy`,
            `We will send this information to your local authority`,
            `You will receive an email to confirm whether you can join`,
            `If you can join, we will email you a link to create your public profile`,
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
            field: 'Charity Name',
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
    header: 'Check your answers',
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
  getSummaryPageTemplate(),
];

export default signUpCharityHappyPath;
