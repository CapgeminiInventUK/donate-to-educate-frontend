import { FormContainerProps } from '@/types/props';
import { FC } from 'react';
import styles from './Form.module.scss';
import Button from '@/components/Button/Button';
import ExternalLink from '@/components/ExternalLink/ExternalLink';
import { createFormComponent } from '@/utils/components';

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
      <Button theme="darkBlue" onClick={onButtonClick} text="Next" />
    </div>
  );
};
export default FormContainer;
