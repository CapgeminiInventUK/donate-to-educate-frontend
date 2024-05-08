import { FC } from 'react';
import { CommonInputProps, FormFieldsProps } from '@/types/props';
import { createFormComponent } from '@/utils/components';
import styles from './MultiStepForm.module.scss';
import ExternalLink from '../ExternalLink/ExternalLink';
import AddressInset from '../AddressInset/AddressInset';

const FormFields: FC<FormFieldsProps> = ({
  formComponents,
  formErrors,
  formData,
  setPageNumber,
  onChange,
  isUnhappyPath,
}) => {
  return formComponents.map(
    ({ componentType, componentData, formComponentLink, classNameSuffix }, index) => {
      const { formMeta: { field = '' } = {} } = componentData as CommonInputProps;
      const errorMessage = field in formErrors ? formErrors[field] : '';

      return (
        <div
          className={`${styles.formComponent} ${classNameSuffix ? styles[classNameSuffix] : ''}`}
          key={index}
        >
          {createFormComponent(
            componentType,
            formData,
            componentData,
            setPageNumber,
            onChange,
            errorMessage,
            isUnhappyPath
          )}
          {formComponentLink && (
            <div className={styles.link}>
              <ExternalLink {...formComponentLink} />
            </div>
          )}
          {componentData && <AddressInset formData={formData} componentData={componentData} />}
        </div>
      );
    }
  );
};
export default FormFields;
