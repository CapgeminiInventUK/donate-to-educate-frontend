import BackButton from '@/components/BackButton/BackButton';
import SchoolAlreadyRegistered from '@/components/SchoolAlreadyRegistered/SchoolAlreadyRegistered';
import Spinner from '@/components/Spinner/Spinner';
import Paths from '@/config/paths';
import { ComponentType, SummaryPageColour } from '@/types/data';
import type { MultiStepFormProps } from '@/types/props';
import { validateForm } from '@/utils/formValidationUtils';
import { scrollToTheTop } from '@/utils/globals';
import { useQueryClient } from '@tanstack/react-query';
import { type FC, type FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../Card/Card';
import FormButtons from './FormButtons';
import FormFields from './FormFields';
import FormHeader from './FormHeader';
import styles from './MultiStepForm.module.scss';

const FormContainer: FC<MultiStepFormProps> = ({
  formTemplate,
  formData,
  setHappyPathTemplate,
  isLoading = false,
  pageNumber,
  setPageNumber,
  onChange,
  isSchoolRegistered,
  hasActiveJoinRequest,
  refetch,
  setFormSubmitted,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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
    setFormErrors({});
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
    scrollToTheTop();
  }, [pageNumber, formTemplate, isDeclarationPage, formData]);

  useEffect(() => {
    if (header === 'Check your answers') {
      setCyaPageNumber(pageNumber);
      setNavigationFromCya(true);
    }
  }, [header, pageNumber]);

  const onButtonClick = async (event: FormEvent<Element>): Promise<void> => {
    event.preventDefault();
    scrollToTheTop();

    await validateForm(formComponents, formData, queryClient, setFormErrors);

    if (onLocalAuthorityRegisterRequest) {
      return onLocalAuthorityRegisterRequest();
    }

    if (isDeclarationPage) {
      await refetch();
      setFormSubmitted?.(true);
    }

    setNavigationFromCya(false);
    if (navigationFromCya && cyaPageNumber && header !== 'Check your answers') {
      return setPageNumber(cyaPageNumber);
    }
    setPageNumber(pageNumber + 1);
  };

  const onBackButtonClick = (): void => {
    if (isUnhappyPath && setHappyPathTemplate) {
      setHappyPathTemplate();
    }
    setFormErrors({});

    if (navigationFromCya && header === 'Check your answers') {
      setNavigationFromCya(false);
    }
    if (navigationFromCya && cyaPageNumber && header !== 'Check your answers') {
      setPageNumber(cyaPageNumber);
    }
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <form aria-label="form" onSubmit={(e) => void onButtonClick(e)}>
      {(!isLastPage || formComponents[0]?.componentType === ComponentType.SCHOOL_NOT_FOUND) && (
        <BackButton onClick={onBackButtonClick} theme="blue" />
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <Card
          className={`${styles.formContainer} ${
            isLastPage && summaryPageBg === SummaryPageColour.BLUE ? styles.lastPageContainer : ''
          }`}
        >
          <FormHeader
            formErrors={formErrors}
            pageNumber={pageNumber}
            isUnhappyPath={isUnhappyPath}
            formTemplate={formTemplate}
            logo={logo}
            header={header}
            infoText={infoText}
            infoTextTwo={infoTextTwo}
            subHeader={subHeader ? (subHeader as JSX.Element) : undefined}
            secondaryHeader={secondaryHeader ? String(secondaryHeader) : undefined}
          />
          <FormFields
            formComponents={formComponents}
            formErrors={formErrors}
            formData={formData}
            setPageNumber={setPageNumber}
            onChange={onChange}
            isUnhappyPath={isUnhappyPath}
          />
          {pageNumber === 1 && isSchoolRegistered && <SchoolAlreadyRegistered type="registered" />}
          {pageNumber === 1 && hasActiveJoinRequest && (
            <SchoolAlreadyRegistered type="joinRequest" />
          )}
          <FormButtons
            isLastPage={isLastPage}
            isUnhappyPath={isUnhappyPath}
            summaryPageBg={summaryPageBg}
            cyaPageNumber={cyaPageNumber}
            pageNumber={pageNumber}
            isSchoolRegistered={!!isSchoolRegistered || !!hasActiveJoinRequest}
            declarationSigned={declarationSigned}
            onLocalAuthorityRegisterRequest={onLocalAuthorityRegisterRequest}
            formComponentInternalLink={formComponentInternalLink}
          />
          {footerLogo && <div className={styles.logoContainer}>{footerLogo}</div>}
          {pageNumber === 0 && (
            <div className={styles.signInLink}>
              <Link to={Paths.SIGN_IN}>Sign in if you already have an account</Link>
            </div>
          )}
        </Card>
      )}
    </form>
  );
};
export default FormContainer;
