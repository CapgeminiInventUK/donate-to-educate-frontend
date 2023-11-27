import { CheckboxProps, FormContainerProps, RadioGroupProps, TextInputProps } from '@/types/props';
import { FC, ReactNode } from 'react';
import styles from './Form.module.scss';
import TextInput from '@/components/TextInput/TextInput';
import RadioGroup from '@/components/RadioGroup/RadioGroup';
import Checkbox from '@/components/Checkbox/Checkbox';
import Button from '@/components/Button/Button';
import { ComponentType } from '@/types/data';
import ExternalLink from '@/components/ExternalLink/ExternalLink';

const FormContainer: FC<FormContainerProps> = ({ formData, pageNumber, setPageNumber }) => {
  const createFormComponent = (
    componentType: ComponentType,
    componentData: TextInputProps | RadioGroupProps | CheckboxProps
  ): ReactNode => {
    switch (componentType) {
      case ComponentType.TEXT:
        return <TextInput {...(componentData as TextInputProps)} />;
      case ComponentType.RADIO:
        return <RadioGroup {...(componentData as RadioGroupProps)} />;
      case ComponentType.CHECKBOX:
        return <Checkbox {...(componentData as CheckboxProps)} />;

      default:
        return <></>;
    }
  };

  const onButtonClick = (): void => {
    if (pageNumber < formData.length - 1) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className={styles.formContainer}>
      {pageNumber > 0 && (
        <div className={styles.pagination}>
          Step {pageNumber} of {formData.length - 1}
        </div>
      )}
      {formData[pageNumber]?.formComponents.map(
        ({ componentType, componentData, formComponentLink }, index) => (
          <div className={styles.formComponent} key={index}>
            {createFormComponent(componentType, componentData)}
            {formComponentLink && <ExternalLink {...formComponentLink} />}
          </div>
        )
      )}
      <Button theme="darkBlue" onClick={onButtonClick} text="Next" />
    </div>
  );
};
export default FormContainer;
