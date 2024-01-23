import { MultiStepFormProps } from '@/types/props';
import { FC, useEffect, useState } from 'react';
import styles from './MultiStepForm.module.scss';
import ExternalLink from '@/components/ExternalLink/ExternalLink';
import { createFormComponent } from '@/utils/components';
import FormButton from '@/components/FormButton/FormButton';
import BackButton from '@/components/BackButton/BackButton';
import Button from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const FormContainer: FC<MultiStepFormProps> = ({
  formTemplate,
  formData,
  setHappyPathTemplate,
  isLoading = false,
}) => {
  const navigate = useNavigate();
  const [navigationFromCya, setNavigationFromCya] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [cyaPageNumber, setCyaPageNumber] = useState<number>();
  const [isLastPage, setIsLastPage] = useState(false);

  const {
    header = undefined,
    subHeader = undefined,
    formComponents = [],
    logo = undefined,
    footerLogo = undefined,
    isUnhappyPath = false,
    formComponentInternalLink = undefined,
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

  const onButtonClick = (): void => {
    setNavigationFromCya(false);
    if (navigationFromCya && cyaPageNumber && header !== 'Check your Answers') {
      return setPageNumber(cyaPageNumber);
    }
    if (pageNumber < formTemplate.length - 1) {
      setPageNumber(pageNumber + 1);
    }
  };

  const onBackButtonClick = (): void => {
    if (isUnhappyPath && setHappyPathTemplate) {
      setHappyPathTemplate();
    }
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
    <div>
      <BackButton onClick={onBackButtonClick} theme="blue" />
      {isLoading ? (
        <Spinner />
      ) : (
        <div
          className={`${styles.formContainer} ${
            isLastPage && !isUnhappyPath ? styles.lastPageContainer : ''
          }`}
        >
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
            ({ componentType, componentData, formComponentLink, classNameSuffix }, index) => (
              <div
                className={`${styles.formComponent} ${
                  classNameSuffix ? styles[classNameSuffix] : ''
                }`}
                key={index}
              >
                {createFormComponent(componentType, formData, componentData, setPageNumber)}
                {formComponentLink && (
                  <div className={styles.link}>
                    <ExternalLink {...formComponentLink} />
                  </div>
                )}
              </div>
            )
          )}
          {isLastPage ? (
            <div
              className={`${isUnhappyPath ? styles.returnHomeLinkUnhappy : styles.returnHomeLink}`}
            >
              <Button theme={'link'} text={'Return to homepage'} onClick={returnHome} />
            </div>
          ) : !cyaPageNumber || (cyaPageNumber && pageNumber < cyaPageNumber) ? (
            <FormButton
              text={pageNumber === 0 ? 'Start' : 'Next'}
              theme={'formButtonDarkBlue'}
              onClick={onButtonClick}
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
              onClick={onButtonClick}
              useArrow={true}
            />
          )}
          {formComponentInternalLink && (
            <div className={styles.link}>
              <Button
                text={formComponentInternalLink.text}
                theme={formComponentInternalLink.theme}
                onClick={() => {
                  formComponentInternalLink.onClick();
                  onButtonClick();
                }}
              />
            </div>
          )}
          {footerLogo && <div className={styles.logoContainer}>{footerLogo}</div>}
        </div>
      )}
    </div>
  );
};
export default FormContainer;
