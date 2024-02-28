import { FC, useState } from 'react';
import styles from './RequestSchoolProducts.module.scss';
import RadioGroup from '@/components/RadioGroup/RadioGroup';
import TextInput from '@/components/TextInput/TextInput';
import TextArea from '@/components/TextArea/TextArea';
import FormButton from '@/components/FormButton/FormButton';
import BackButton from '@/components/BackButton/BackButton';

interface FormState {
  type: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

const radioButtonLabels = [
  'I am a parent or guardian',
  'I work at another school',
  'I work for a charity or volunteer group',
  'Something else',
];
const radioButtonValues = [
  'parentGuardian',
  'anotherSchool',
  'charityVolunteerGroup',
  'somethingElse',
];

const RequestSchoolProducts: FC = () => {
  const [formState, setFormState] = useState<FormState>({
    type: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const { name, email, phone, notes } = formState;

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <BackButton theme="blue" />
        <div className={styles.card}>
          <p className={styles.mainHeading}>Request school products</p>
          <p>
            Tell us which things you need and we&apos;ll contact you to arrange the next steps as
            soon as we can.
          </p>

          <h3 className={styles.subHeading}>What best describes you?</h3>
          <RadioGroup
            labels={radioButtonLabels}
            name="schoolProductRadios"
            values={radioButtonValues}
            handleChange={(value: string): void =>
              setFormState((prevState) => ({
                ...prevState,
                type: value,
              }))
            }
          />
          <h3 className={styles.fieldHeadings}>Name</h3>
          <TextInput
            onChange={(value) => {
              setFormState((prevState) => ({
                ...prevState,
                name: value,
              }));
            }}
            value={name}
            isLarge={true}
          />
          <h3 className={styles.fieldHeadings}>Email</h3>
          <TextInput
            onChange={(value) => {
              setFormState((prevState) => ({
                ...prevState,
                email: value,
              }));
            }}
            value={email}
            isLarge={true}
          />
          <h3 className={styles.fieldHeadings}>Phone</h3>
          <TextInput
            onChange={(value) => {
              setFormState((prevState) => ({
                ...prevState,
                phone: value,
              }));
            }}
            value={phone}
          />
          <h3 className={styles.textAreaHeadings}>Tell us what you need</h3>
          <TextArea
            characterLimit={1000}
            subHeading="Include the school products and sizes you would like"
            onChange={(value) => {
              setFormState((prevState) => ({
                ...prevState,
                notes: value,
              }));
            }}
            value={notes}
          />
          <FormButton text={'Request products'} theme={'formButtonGreen'} fullWidth={true} />
        </div>
      </div>
    </div>
  );
};

export default RequestSchoolProducts;
