import {
  CheckboxProps,
  FormContainerProps,
  RadioGroupProps,
  TextAreaProps,
  TextInputProps,
} from '@/types/props';
import { FC, ReactNode } from 'react';
import styles from './Form.module.scss';
import TextInput from '@/components/TextInput/TextInput';
import RadioGroup from '@/components/RadioGroup/RadioGroup';
import Checkbox from '@/components/Checkbox/Checkbox';
import Button from '@/components/Button/Button';
import { ComponentDataPropsType, ComponentType } from '@/types/data';
import ExternalLink from '@/components/ExternalLink/ExternalLink';
import TextArea from '@/components/TextArea/TextArea';

const FormContainer: FC<FormContainerProps> = ({ formData, pageNumber, setPageNumber }) => {
  const createFormComponent = (
    componentType: ComponentType,
    componentData: ComponentDataPropsType
  ): ReactNode => {
    switch (componentType) {
      case ComponentType.TEXT:
        return <TextInput {...(componentData as TextInputProps)} />;
      case ComponentType.TEXTAREA:
        return <TextArea {...(componentData as TextAreaProps)} />;
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
            {formComponentLink && (
              <div className={styles.link}>
                <ExternalLink {...formComponentLink} />
              </div>
            )}
          </div>
        )
      )}
      <Button theme="darkBlue" onClick={onButtonClick} text="Next" />
    </div>
  );
};
export default FormContainer;
