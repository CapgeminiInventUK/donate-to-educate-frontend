import type { RequestItemsFormProps } from '@/types/props';
import { capitaliseFirstLetter, checkAllObjectValuesTruthy } from '@/utils/globals';
import type { FC } from 'react';
import FormButton from '../FormButton/FormButton';
import RadioGroup from '../RadioGroup/RadioGroup';
import TextArea from '../TextArea/TextArea';
import TextInput from '../TextInput/TextInput';
import styles from './RequestItems.module.scss';
import { getTextContent } from './utils';

const RequestItemsForm: FC<RequestItemsFormProps> = ({
  type,
  organisationType,
  formState,
  onFormChange,
  onFormSubmit,
}) => {
  const { radioButtonLabels, radioButtonValues, notesHeading, notesSubHeading, buttonText } =
    getTextContent(type, organisationType);

  const { message, connection } = formState;
  const formInputs = Object.entries(formState).filter(
    ([key]) => !['who', 'connection', 'message'].includes(key)
  );

  return (
    <form onSubmit={onFormSubmit}>
      <h3 className={styles.subHeading}>What best describes you?</h3>
      <RadioGroup
        labels={radioButtonLabels}
        name="schoolProductRadios"
        values={radioButtonValues}
        handleChange={(value) => onFormChange('who', value)}
      />
      {formState.who === 'somethingElse' && (
        <div className={styles.connection}>
          <TextInput
            subHeading="Describe your role or connection to Donate to Educate"
            onChange={(value) => onFormChange('who', value)}
            ariaLabel="connection"
            value={connection}
            isLarge
          />
        </div>
      )}
      <br />
      {formInputs.map(([key, value]) => (
        <TextInput
          key={key}
          header={capitaliseFirstLetter(key)}
          onChange={(newValue) => onFormChange(key, newValue)}
          ariaLabel={key}
          value={String(value)}
          isLarge={key !== 'phone'}
        />
      ))}
      <TextArea
        characterLimit={1000}
        header={notesHeading}
        subHeading={notesSubHeading}
        onChange={(value) => onFormChange('message', value)}
        ariaLabel="message"
        value={message}
      />
      <FormButton
        text={buttonText}
        theme={
          checkAllObjectValuesTruthy(formState) ? 'formButtonGreenDisabled' : 'formButtonGreen'
        }
        fullWidth={true}
        disabled={checkAllObjectValuesTruthy(formState)}
        ariaLabel="submit"
      />
    </form>
  );
};
export default RequestItemsForm;
