import type { FormHeaderProps } from '@/types/props';
import type { FC } from 'react';
import FormErrors from '../FormErrors/FormErrors';
import styles from './MultiStepForm.module.scss';

const FormHeader: FC<FormHeaderProps> = ({
  formErrors,
  pageNumber,
  isUnhappyPath,
  formTemplate,
  logo,
  header,
  infoText,
  infoTextTwo,
  subHeader,
  secondaryHeader,
}) => {
  return (
    <>
      <FormErrors formErrors={formErrors} />
      {pageNumber > 0 && !isUnhappyPath && (
        <div className={styles.pagination}>
          Step {pageNumber} of {formTemplate.length - 1}
        </div>
      )}
      {logo && <div className={styles.logoContainer}>{logo}</div>}
      <div className={styles.headerContainer}>
        {header && <h1 className={styles.header}>{header}</h1>}
        {subHeader && <h4 className={styles.subHeader}>{subHeader}</h4>}
        {infoText && <p className={styles.infoText}>{infoText}</p>}
        {secondaryHeader && <h4 className={styles.secondaryHeader}>{secondaryHeader}</h4>}
        {infoTextTwo && <p className={styles.infoText}>{infoTextTwo}</p>}
      </div>
    </>
  );
};
export default FormHeader;
