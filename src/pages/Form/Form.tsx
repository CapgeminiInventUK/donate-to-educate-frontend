import { FC, useState } from 'react';
import styles from './Form.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import FormContainer from './FormContainer';
import {
  ComponentType,
  FormDataItem,
  FormMeta,
  FormNames,
  FormSections,
  FormTemplate,
} from '@/types/data';

const Form: FC = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [formData, setFormData] = useState<FormDataItem[]>([]);

  const onBackButtonClick = (): void => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  const onChange = (value: string, formMeta: FormMeta | undefined): void => {
    const { page = 0, field = '', section } = formMeta ?? {};
    const removeOldValue = formData.filter(({ field: oldField }) => oldField !== field);
    setFormData([...removeOldValue, { field: field, value, section, page }]);
  };

  const formTemplate: FormTemplate[] = [
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
            isLarge: true,
            onChange,
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
            subHeading: 'If you have locations across the country, choose one main local council.',
            options: [
              { value: 'westBerks', label: 'West Berkshire' },
              { value: 'westNorthants', label: 'West Northamptonshire' },
              { value: 'westSussex', label: 'West Sussex County Council' },
            ],
            isLarge: true,
            formMeta: {
              page: 2,
              field: 'Main local council',
              section: FormSections.CHARITY_SECTION,
            },
            onChange,
          },
          formComponentLink: {
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
            isLarge: true,
            onChange,
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
            isLarge: true,
            onChange,
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
            subHeading: 'For example, volunteer manager, fundraiser, project coordinator.',
            isLarge: true,
            onChange,
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
            subHeading:
              "Use your charity email address if you're staff, or personal email address if you're a volunteer. You will need this email to sign in.",
            isLarge: true,
            onChange,
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
            onChange,
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
            isLarge: true,
            onChange,
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
            isLarge: true,
            onChange,
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
            onChange,
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
            onChange,
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
            onChange,
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
            subHeading:
              'Describe the great work your charity or volunteer group are doing. Let us know how you can help families and schools.',
            hint: 'This information can only be seen by Donate to Educate administrators.',
            characterLimit: 1000,
            onChange,
            formMeta: {
              page: 4,
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
            formName: FormNames.JOIN,
            formMeta: {
              page: 5,
            },
          },
        },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <div>
        <BackButton onClick={onBackButtonClick} theme="blue" />
        <FormContainer
          formTemplate={formTemplate}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          formData={formData}
        />
      </div>
    </div>
  );
};

export default Form;
