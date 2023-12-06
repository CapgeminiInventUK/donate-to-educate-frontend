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

  const { header = undefined, subHeader = undefined, formComponents = [] } = formData[pageNumber];

  return (
    <div className={styles.formContainer}>
      {pageNumber > 0 && (
        <div className={styles.pagination}>
          Step {pageNumber} of {formData.length - 1}
        </div>
      )}
      <div className={styles.headerContainer}>
        {header && <h2 className={styles.header}>{header}</h2>}
        {subHeader && <h4 className={styles.subHeader}>{subHeader}</h4>}
      </div>
      {formComponents.map(({ componentType, componentData, formComponentLink }, index) => (
        <div className={styles.formComponent} key={index}>
          {createFormComponent(componentType, componentData)}
          {formComponentLink && (
            <div className={styles.link}>
              <ExternalLink {...formComponentLink} />
            </div>
          )}
        </div>
      ))}
      <Button theme="darkBlue" onClick={onButtonClick} text="Next" />
    </div>
  );
};
export default FormContainer;
