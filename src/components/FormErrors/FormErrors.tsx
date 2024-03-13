import { FC } from 'react';
import styles from './FormErrors.module.scss';
import { FormErrorsProps } from '@/types/props';

const FormErrors: FC<FormErrorsProps> = ({ formErrors }) => {
  return (
    Object.keys(formErrors).length > 0 && (
      <div className={styles.wrapperError}>
        <h3>There is a problem</h3>
        {Object.values(formErrors).map((error) => (
          <h4 className={styles.errorMessage} key={error}>
            {error}
          </h4>
        ))}
      </div>
    )
  );
};
export default FormErrors;
