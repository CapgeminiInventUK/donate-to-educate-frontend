import { FormContainerProps } from '@/types/props';
import { FC, useEffect, useState } from 'react';
import styles from './Form.module.scss';
import ExternalLink from '@/components/ExternalLink/ExternalLink';
import { createFormComponent } from '@/utils/components';
import FormButton from '@/components/FormButton/FormButton';

const FormContainer: FC<FormContainerProps> = ({
  formTemplate,
  pageNumber,
  setPageNumber,
  formData,
}) => {
  const [navigationFromCya, setNavigationFromCya] = useState(false);
  const [cyaPageNumber, setCyaPageNumber] = useState<number>();

  const {
    header = undefined,
    subHeader = undefined,
    formComponents = [],
  } = formTemplate[pageNumber];

  useEffect(() => {
    if (header === 'Check your Answers') {
      setCyaPageNumber(pageNumber);
      setNavigationFromCya(true);
    }
  }, [header, pageNumber]);

  const onButtonClick = (): void => {
    if (navigationFromCya && cyaPageNumber) {
      return setPageNumber(cyaPageNumber);
    }
    if (pageNumber < formTemplate.length - 1) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className={styles.formContainer}>
      {pageNumber > 0 && (
        <div className={styles.pagination}>
          Step {pageNumber} of {formTemplate.length - 1}
        </div>
      )}
      <div className={styles.headerContainer}>
        {header && <h2 className={styles.header}>{header}</h2>}
        {subHeader && <h4 className={styles.subHeader}>{subHeader}</h4>}
      </div>
      {formComponents.map(({ componentType, componentData, formComponentLink }, index) => (
        <div className={styles.formComponent} key={index}>
          {createFormComponent(componentType, formData, componentData, setPageNumber)}
          {formComponentLink && (
            <div className={styles.link}>
              <ExternalLink {...formComponentLink} />
            </div>
          )}
        </div>
      ))}
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
