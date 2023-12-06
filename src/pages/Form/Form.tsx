import { FC, useState } from 'react';
import styles from './Form.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import FormContainer from './FormContainer';
import { ComponentType, FormData } from '@/types/data';

const Form: FC = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const onBackButtonClick = (): void => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  const formData: FormData[] = [
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
          componentData: { isLarge: true },
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
            name: 'West Sussex County Council',
            options: [
              { value: 'westBerks', label: 'West Berkshire' },
              { value: 'westNorthants', label: 'West Northamptonshire' },
              { value: 'westSussex', label: 'West Sussex County Council' },
            ],
            isLarge: true,
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
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            header: 'Last name',
            isLarge: true,
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            header: 'Job title or role',
            subHeading: 'For example, volunteer manager, fundraiser, project coordinator.',
            isLarge: true,
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            header: 'Email',
            subHeading:
              "Use your charity email address if you're staff, or personal email address if you're a volunteer. You will need this email to sign in.",
            isLarge: true,
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            header: 'Phone',
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
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            header: 'Address line 2 (optional)',
            isLarge: true,
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            header: 'Town or city',
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            header: 'County',
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            header: 'Postcode',
            isSmall: true,
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
          },
        },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <div>
        <BackButton onClick={onBackButtonClick} theme="blue" />
        <FormContainer formData={formData} pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </div>
    </div>
  );
};

export default Form;
