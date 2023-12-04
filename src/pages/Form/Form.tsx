import { FC, useState } from 'react';
import styles from './Form.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import FormContainer from './FormContainer';
import { ComponentType, FormData } from '@/types/data';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';

const Form: FC = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const navigate = useNavigate();

  const onBackButtonClick = (): void => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
    if (pageNumber === 0) {
      navigate(Paths.HOME);
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
      formComponents: [
        {
          componentType: ComponentType.TEXT,
          componentData: {
            header: "What is the name of your charity or volunteer group's local council?",
            subHeading: 'If you have locations across the country, choose one main local council.',
          },
          formComponentLink: {
            linkText: 'Find my local council (opens in a new tab).',
            linkUrl: 'https://www.gov.uk/find-local-council',
          },
        },
      ],
    },
    {
      formComponents: [
        {
          componentType: ComponentType.TEXTAREA,
          componentData: {
            header: 'Tell us about your charity or volunteer group',
            subHeading:
              'Describe the great work your charity or volunteer group are doing. Let us know how you can help families and schools.',
            hint: 'This information can only be seen by Donate to Educate administrators.',
            characterLimit: 1000,
          },
        },
      ],
    },
    {
      formComponents: [
        {
          componentType: ComponentType.DROPDOWN,
          componentData: {
            header: "What is the name of your charity or volunteer group's local council?",
            subHeading: 'If you have locations across the country, choose one main local council.',
            name: 'West Sussex County Council',
            options: [
              { value: 'westBerks', label: 'West Berkshire' },
              { value: 'westNorthants', label: 'West Northamptonshire' },
              { value: 'westSussex', label: 'West Sussex County Council' },
            ],
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
