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
