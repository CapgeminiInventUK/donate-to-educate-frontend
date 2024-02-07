import { CommonInputProps, MultiStepFormProps } from '@/types/props';
import { FC, FormEvent, useEffect, useState } from 'react';
import styles from './MultiStepForm.module.scss';
import ExternalLink from '@/components/ExternalLink/ExternalLink';
import { createFormComponent } from '@/utils/components';
import FormButton from '@/components/FormButton/FormButton';
import BackButton from '@/components/BackButton/BackButton';
import Button from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { validateFormInputField } from '@/utils/formUtils';

const FormContainer: FC<MultiStepFormProps> = ({ formTemplate, formData, isLoading = false }) => {
  const navigate = useNavigate();
  const [navigationFromCya, setNavigationFromCya] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [cyaPageNumber, setCyaPageNumber] = useState<number>();
  const [isLastPage, setIsLastPage] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const {
    header = undefined,
    subHeader = undefined,
    formComponents = [],
    logo = undefined,
  } = formTemplate[pageNumber];

  useEffect(() => {
    if (pageNumber === formTemplate.length - 1) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [pageNumber, formTemplate]);

  useEffect(() => {
    if (header === 'Check your Answers') {
      setCyaPageNumber(pageNumber);
      setNavigationFromCya(true);
    }
  }, [header, pageNumber]);

  const onButtonClick = (event: FormEvent<Element>): void => {
    event.preventDefault();

    const errors = formComponents.reduce((acc: Record<string, string>, { componentData }) => {
      const { formMeta: { field = '' } = {} } = componentData as CommonInputProps;
      const error = validateFormInputField(formData, field);
      if (error) {
        acc[field] = error;
      }
      return acc;
    }, {});

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    setNavigationFromCya(false);
    if (navigationFromCya && cyaPageNumber && header !== 'Check your Answers') {
      return setPageNumber(cyaPageNumber);
    }
    if (pageNumber < formTemplate.length - 1) {
      setPageNumber(pageNumber + 1);
    }
  };

  const onBackButtonClick = (): void => {
    setFormErrors({});

    if (navigationFromCya && cyaPageNumber && header !== 'Check your Answers') {
      return setPageNumber(cyaPageNumber);
    }
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  const returnHome = (): void => {
    navigate('/');
  };

  return (
    <form onSubmit={onButtonClick}>
      <BackButton onClick={onBackButtonClick} theme="blue" />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={`${styles.formContainer} ${isLastPage ? styles.lastPageContainer : ''}`}>
          {Object.keys(formErrors).length > 0 && (
            <div className={styles.wrapperError}>
              <h3>There is a problem</h3>
              {Object.values(formErrors).map((error) => (
                <h4 className={styles.errorMessage} key={error}>
                  {error}
                </h4>
              ))}
            </div>
          )}
          {pageNumber > 0 && (
            <div className={styles.pagination}>
              Step {pageNumber} of {formTemplate.length - 1}
            </div>
          )}
          {logo && <div className={styles.logoContainer}>{logo}</div>}
          <div className={styles.headerContainer}>
            {header && <h2 className={styles.header}>{header}</h2>}
            {subHeader && <h4 className={styles.subHeader}>{subHeader}</h4>}
          </div>
          {formComponents.map(
            ({ componentType, componentData, formComponentLink, classNameSuffix }, index) => {
              const { formMeta: { field = '' } = {} } = componentData as CommonInputProps;
              const errorMessage = field in formErrors ? formErrors[field] : '';

              return (
                <div
                  className={`${styles.formComponent} ${
                    classNameSuffix ? styles[classNameSuffix] : ''
                  }`}
                  key={index}
                >
                  {createFormComponent(
                    componentType,
                    formData,
                    componentData,
                    setPageNumber,
                    errorMessage
                  )}
                  {formComponentLink && (
                    <div className={styles.link}>
                      <ExternalLink {...formComponentLink} />
                    </div>
                  )}
                </div>
              );
            }
          )}
          {isLastPage ? (
            <div className={styles.returnHomeLink}>
              <Button theme={'link'} text={'Return to homepage'} onClick={returnHome} />
            </div>
          ) : cyaPageNumber && pageNumber < cyaPageNumber ? (
            <FormButton
              text={pageNumber === 0 ? 'Start' : 'Next'}
              theme={'formButtonDarkBlue'}
              useArrow={true}
            />
          ) : (
            <FormButton
              text={'Confirm'}
              theme={
                cyaPageNumber && pageNumber > cyaPageNumber
                  ? 'formButtonDarkBlue'
                  : 'formButtonGrey'
              }
              useArrow={true}
            />
          )}
        </div>
      )}
    </form>
  );
};
export default FormContainer;
