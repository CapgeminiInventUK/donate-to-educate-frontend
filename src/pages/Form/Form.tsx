import { FormProps } from '@/types/props';
import { FC } from 'react';

const Form: FC<FormProps> = ({ formData }) => {
  // eslint-disable-next-line no-console
  console.log(formData);
  // const [pageNumber, setPageNumber] = useState(0);
  return <div>Form</div>;
};

export default Form;
