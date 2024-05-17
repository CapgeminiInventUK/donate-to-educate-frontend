import { CommonInputProps, MultiStepFormProps } from '@/types/props';
import { FC, FormEvent, useEffect, useState } from 'react';
import styles from './MultiStepForm.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import Spinner from '@/components/Spinner/Spinner';
import { SummaryPageColour, FormErrors, ComponentType } from '@/types/data';
import { formatPhoneNumber, validateFormInputField } from '@/utils/formUtils';
import SchoolAlreadyRegistered from '@/components/SchoolAlreadyRegistered/SchoolAlreadyRegistered';
import Card from '../Card/Card';
import { useQueryClient } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetSchoolsNearbyQuery } from '@/types/api';
import { getSchoolsNearby } from '@/graphql/queries';
import FormHeader from './FormHeader';
import FormFields from './FormFields';
import FormButtons from './FormButtons';
import { scrollToTheTop } from '@/utils/globals';

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

    const errors = formComponents.reduce((acc: Record<string, string>, { componentData }) => {
      const { formMeta: { field = '' } = {} } = componentData as CommonInputProps;
      const error = validateFormInputField(formData, field);
      if (error) {
        acc[field] = error;
      }
      return acc;
    }, {});

    const postcode = formData.find(({ field }) => field.toLowerCase() === 'postcode')?.value;
    if (postcode) {
      try {
        await queryClient.fetchQuery({
          queryKey: [`getSchoolsNearby-${postcode}-request`],
          queryFn: async () => {
            const { data } = await client.graphql<GraphQLQuery<GetSchoolsNearbyQuery>>({
              query: getSchoolsNearby,
              variables: {
                postcode,
                distance: 5000,
                type: 'request',
              },
            });

            return data;
          },
        });
      } catch (error) {
        if (error) {
          errors.Postcode = FormErrors.POSTCODE_NOT_FOUND;
        }
      }
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors({ ...formErrors, ...errors });
      return;
    }

    setFormErrors({});

    const phoneNumberIndex = formData.findIndex(({ field }) => field?.toLowerCase() === 'phone');
    const phoneNumber = formData[phoneNumberIndex];
    if (phoneNumber) {
      const formattedPhoneNumber = formatPhoneNumber(String(phoneNumber.value));
      if (formattedPhoneNumber) {
        formData[phoneNumberIndex].value = formattedPhoneNumber;
      }
    }

    if (onLocalAuthorityRegisterRequest) {
      return onLocalAuthorityRegisterRequest();
    }

    if (isDeclarationPage) {
      void refetch().then(() => {
        setFormSubmitted && setFormSubmitted(true);
      });
    }

    setNavigationFromCya(false);
    if (navigationFromCya && cyaPageNumber && header !== 'Check your answers') {
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

    if (navigationFromCya && header === 'Check your answers') {
      setNavigationFromCya(false);
    }

    if (navigationFromCya && cyaPageNumber && header !== 'Check your answers') {
      return setPageNumber(cyaPageNumber);
    }

    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <form onSubmit={(e) => void onButtonClick(e)}>
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
        </Card>
      )}
    </form>
  );
};
export default FormContainer;
