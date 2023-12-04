import { FormContainerProps } from '@/types/props';
import { FC } from 'react';
import styles from './Form.module.scss';
import ExternalLink from '@/components/ExternalLink/ExternalLink';
import { createFormComponent } from '@/utils/components';
import FormButton from '@/components/FormButton/FormButton';

const FormContainer: FC<FormContainerProps> = ({ formData, pageNumber, setPageNumber }) => {
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
      <FormButton
        text={pageNumber === 0 ? 'Start' : 'Next'}
        theme={'formButtonDarkBlue'}
        onClick={onButtonClick}
        useArrow={true}
      />
    </div>
  );
};
export default FormContainer;
