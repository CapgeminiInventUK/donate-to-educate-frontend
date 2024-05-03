import { CommonInputProps, MultiStepFormProps } from '@/types/props';
import { FC, FormEvent, useEffect, useState } from 'react';
import styles from './MultiStepForm.module.scss';
import ExternalLink from '@/components/ExternalLink/ExternalLink';
import { createFormComponent } from '@/utils/components';
import FormButton from '@/components/FormButton/FormButton';
import BackButton from '@/components/BackButton/BackButton';
import Button from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import Spinner from '@/components/Spinner/Spinner';
import AddressInset from '@/components/AddressInset/AddressInset';
import { SummaryPageColour } from '@/types/data';
import { validateFormInputField } from '@/utils/formUtils';
import SchoolAlreadyRegistered from '@/components/SchoolAlreadyRegistered/SchoolAlreadyRegistered';
import Paths from '@/config/paths';
import FormErrors from '@/components/FormErrors/FormErrors';
import Card from '../Card/Card';

const FormContainer: FC<MultiStepFormProps> = ({
  formTemplate,
  formData,
  setHappyPathTemplate,
  isLoading = false,
  pageNumber,
  setPageNumber,
  onChange,
  isSchoolRegistered,
  refetch,
}) => {
  const navigate = useNavigate();
  const [navigationFromCya, setNavigationFromCya] = useState(false);
  const [cyaPageNumber, setCyaPageNumber] = useState<number>();
  const [isLastPage, setIsLastPage] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [declarationSigned, setDeclarationSigned] = useState(false);

  const {
    header = '',
    infoText = undefined,
    infoTextTwo = undefined,
    subHeader = undefined,
    secondaryHeader = undefined,
    formComponents = [],
    logo = undefined,
    footerLogo = undefined,
    isUnhappyPath = false,
    summaryPageBg = SummaryPageColour.BLUE,
    formComponentInternalLink = undefined,
    onLocalAuthorityRegisterRequest = undefined,
    isDeclarationPage = false,
  } = formTemplate[pageNumber];

  useEffect(() => {
    if (pageNumber === formTemplate.length - 1) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
    if (!isDeclarationPage) {
      return;
    }
    const declarationPageData = formData.find(
      ({ field }) => field === 'I have read the Donate to Educate privacy policy'
    );
    setDeclarationSigned(!!declarationPageData?.value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pageNumber, formTemplate, isDeclarationPage, formData]);

  useEffect(() => {
    if (header === 'Check your Answers') {
      setCyaPageNumber(pageNumber);
      setNavigationFromCya(true);
    }
  }, [header, pageNumber]);

  const onButtonClick = (event: FormEvent<Element>): void => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

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

    if (onLocalAuthorityRegisterRequest) {
      return onLocalAuthorityRegisterRequest();
    }

    if (isDeclarationPage) {
      void refetch();
    }

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
    setFormErrors({});

    if (navigationFromCya && header === 'Check your Answers') {
      setNavigationFromCya(false);
    }

    if (navigationFromCya && cyaPageNumber && header !== 'Check your Answers') {
      return setPageNumber(cyaPageNumber);
    }

    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    } else {
      navigate(-1);
    }
  };

  const returnHome = (): void => {
    navigate(Paths.HOME);
  };

  return (
    <form onSubmit={onButtonClick}>
      {!isLastPage && <BackButton onClick={onBackButtonClick} theme="blue" />}
      {isLoading ? (
        <Spinner />
      ) : (
        <Card
          className={`${styles.formContainer} ${
            isLastPage && summaryPageBg === SummaryPageColour.BLUE ? styles.lastPageContainer : ''
          }`}
        >
          <FormErrors formErrors={formErrors} />
          {pageNumber > 0 && !isUnhappyPath && (
            <div className={styles.pagination}>
              Step {pageNumber} of {formTemplate.length - 1}
            </div>
          )}
          {logo && <div className={styles.logoContainer}>{logo}</div>}
          <div className={styles.headerContainer}>
            {header && <h2 className={styles.header}>{header}</h2>}
            {subHeader && <h4 className={styles.subHeader}>{subHeader}</h4>}
            {infoText && <p className={styles.infoText}>{infoText}</p>}
            {secondaryHeader && <h4 className={styles.secondaryHeader}>{secondaryHeader}</h4>}
            {infoTextTwo && <p className={styles.infoText}>{infoTextTwo}</p>}
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
                    onChange,
                    errorMessage,
                    isUnhappyPath
                  )}
                  {formComponentLink && (
                    <div className={styles.link}>
                      <ExternalLink {...formComponentLink} />
                    </div>
                  )}
                  {componentData && (
                    <AddressInset formData={formData} componentData={componentData} />
                  )}
                </div>
              );
            }
          )}
          {pageNumber === 1 && isSchoolRegistered && <SchoolAlreadyRegistered />}
          {isLastPage || isUnhappyPath ? (
            <div
              className={`${isUnhappyPath && summaryPageBg !== SummaryPageColour.BLUE ? styles.returnHomeLinkUnhappy : styles.returnHomeLink}`}
            >
              <Button
                theme={'link'}
                text={'Return to homepage'}
                onClick={returnHome}
                ariaLabel="home"
              />
            </div>
          ) : !cyaPageNumber || (cyaPageNumber && pageNumber < cyaPageNumber + 1) ? (
            <FormButton
              text={pageNumber === 0 ? 'Start' : 'Next'}
              theme={
                pageNumber === 1 && isSchoolRegistered ? 'formButtonDisabled' : 'formButtonDarkBlue'
              }
              ariaLabel={pageNumber === 0 ? 'Start' : 'Next'}
              useArrow={pageNumber === 0}
              disabled={pageNumber === 1 && isSchoolRegistered}
            />
          ) : (
            <FormButton
              text={'Send application'}
              theme={!declarationSigned ? 'formButtonDisabled' : 'formButtonGreen'}
              ariaLabel="send"
              disabled={!declarationSigned}
            />
          )}
          {isUnhappyPath && onLocalAuthorityRegisterRequest && (
            <FormButton text={'Send'} theme={'formButtonGrey'} useArrow={true} ariaLabel="send" />
          )}
          {formComponentInternalLink && (
            <div className={styles.link}>
              <Button
                text={formComponentInternalLink.text}
                theme={formComponentInternalLink.theme}
                onClick={() => {
                  formComponentInternalLink.onClick();
                }}
                ariaLabel="internal link"
              />
            </div>
          )}
          {footerLogo && <div className={styles.logoContainer}>{footerLogo}</div>}
        </Card>
      )}
    </form>
  );
};
export default FormContainer;
