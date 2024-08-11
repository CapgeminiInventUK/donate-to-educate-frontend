import { FC } from 'react';
import styles from './FormErrors.module.scss';
import { FormErrorsProps } from '@/types/props';
import { checkIfValidObjectWithData } from '@/utils/globals';

const FormErrors: FC<FormErrorsProps> = ({ formErrors }) => {
  const scrollToElement = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    key: string
  ): void => {
    e.preventDefault();

    document.getElementById(key)?.focus();
  };

  return (
    checkIfValidObjectWithData(formErrors) && (
      <div className={styles.wrapperError}>
        <h3>There is a problem</h3>
        {Object.keys(formErrors).map((key) => (
          <a
            href={`#${key}`}
            className={styles.errorMessage}
            data-testid={`${key}`}
            key={formErrors[key]}
            onClick={(e) => scrollToElement(e, key)}
          >
            <h4>{formErrors[key]}</h4>
          </a>
        ))}
      </div>
    )
  );
};
export default FormErrors;
