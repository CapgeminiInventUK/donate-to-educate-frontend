import { FormProps } from '@/types/props';
import { FC } from 'react';
import FormIntroPage from '@/components/FormIntroPage/FormIntroPage';

const Form: FC<FormProps> = ({ formData }) => {
  // eslint-disable-next-line no-console
  console.log(formData);
  // const [pageNumber, setPageNumber] = useState(0);

  const pageData = {
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
  };
  return (
    <FormIntroPage
      header={pageData.header}
      infoText={pageData.infoText}
      listItems={pageData.listItems}
      secondaryHeading={pageData.secondaryHeading}
      secondaryInfoText={pageData.secondaryInfoText}
      secondaryListItems={pageData.secondaryListItems}
    />
  );
};

export default Form;
