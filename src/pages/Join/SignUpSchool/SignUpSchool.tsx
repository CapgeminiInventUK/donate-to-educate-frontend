import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Spinner from '@/components/Spinner/Spinner';
import { insertJoinRequest, insertLocalAuthorityRegisterRequest } from '@/graphql/mutations';
import { client } from '@/graphqlClient';
import type {
  GetSchoolsQuery,
  InsertJoinRequestMutationVariables,
  InsertLocalAuthorityRegisterRequestMutationVariables,
} from '@/types/api';
import {
  type DropdownOption,
  type FormDataItem,
  type FormMeta,
  FormNames,
  type FormTemplate,
  type SubmittedFormData,
} from '@/types/data';
import {
  getFormDataForSubmission,
  getRegisterLocalAuthorityFormData,
  getSchoolCyaData,
} from '@/utils/formUtils';
import MultiStepForm from '@components/MultiStepForm/MultiStepForm';
import { useQuery } from '@tanstack/react-query';
import type { GraphQLQuery } from 'aws-amplify/api';
import { type FC, useCallback, useEffect, useState } from 'react';
import getAuthorityNotRegisteredPath from '../../../templates/forms/authorityNotRegistered';
import getCannotFindSchoolPath from '../../../templates/forms/cannotFindSchoolPath';
import signUpSchoolHappyPath from '../../../templates/forms/signUpSchoolHappyPath';
import styles from './SignUpSchool.module.scss';

const SignUpSchool: FC = () => {
  const [formData, setFormData] = useState<FormDataItem[]>([]);
  const [formTemplate, setFormTemplate] = useState<FormTemplate[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [schoolOptions, setSchoolOptions] = useState<DropdownOption[]>([]);
  const [isSchoolRegistered, setIsSchoolRegistered] = useState(false);
  const [hasActiveJoinRequest, setHasActiveJoinRequest] = useState(false);
  const [selectedLocalAuthority, setSelectedLocalAuthority] = useState('');
  const [formDataForSubmission, setFormDataForSubmission] = useState<SubmittedFormData>();
  const [isUnhappyPath, setIsUnhappyPath] = useState(false);
  const [cannotFindSchoolState, setCannotFindSchoolState] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    data,
    isLoading,
    error,
    refetch: schoolsRefetch,
  } = useQuery({
    queryKey: ['schools'],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetSchoolsQuery>>({
        query: `query GetSchools {
          getSchools {
            urn
            name
            localAuthority
            postcode
            registered
            registrationState
          }
        }`,
      });

      return data;
    },
  });

  if (error) {
    throw new Error('Failed to fetch Schools data.');
  }

  const { refetch, isError: isErrorRegister } = useQuery({
    queryKey: [
      `registerSchool-${JSON.stringify(formDataForSubmission)}-${selectedLocalAuthority}-school`,
    ],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<InsertJoinRequestMutationVariables>>({
        query: insertJoinRequest,
        variables: {
          name: formDataForSubmission?.name,
          localAuthority: selectedLocalAuthority,
          type: 'school',
          email: formDataForSubmission?.email,
          school: formDataForSubmission?.school,
          jobTitle: formDataForSubmission?.jobTitle,
          phone: formDataForSubmission?.phone,
          charityName: formDataForSubmission?.charityName,
          charityAddress: formDataForSubmission?.charityAddress,
          aboutCharity: formDataForSubmission?.aboutCharity,
          urn: formDataForSubmission?.urn,
        },
      });
      return result;
    },
  });

  const { refetch: registerAuthorityRefetch, isError: isErrorLa } = useQuery({
    queryKey: [
      `registerLaRequest-${JSON.stringify(formDataForSubmission)}-${selectedLocalAuthority}-school`,
    ],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<
        GraphQLQuery<InsertLocalAuthorityRegisterRequestMutationVariables>
      >({
        query: insertLocalAuthorityRegisterRequest,
        variables: {
          name: formDataForSubmission?.name,
          localAuthority: selectedLocalAuthority,
          email: formDataForSubmission?.email,
          message: formDataForSubmission?.message,
          type: 'school',
        },
      });
      return result;
    },
  });

  useEffect(() => {
    if (formSubmitted) {
      void schoolsRefetch();
    }
  }, [formSubmitted, schoolsRefetch]);

  useEffect(() => {
    const options = data?.getSchools.map(
      ({ urn, name, localAuthority, registrationState, postcode, registered }) => ({
        value: urn,
        label: `${name} - ${postcode}`,
        name,
        localAuthority: localAuthority && localAuthority,
        registrationState,
        postcode: String(postcode),
        registered,
      })
    );
    setSchoolOptions(options ?? []);
  }, [data]);

  const onChange = (
    value: string | boolean,
    formMeta: FormMeta | undefined,
    fullValue?: Record<string, string | boolean>
  ): void => {
    const { page = 0, field = '', section } = formMeta ?? {};
    const removeOldValue = formData.filter(({ field: oldField }) => oldField !== field);
    setFormData([...removeOldValue, { field, value, section, page, fullValue }]);
  };

  const cannotFindSchool = useCallback((): void => {
    setFormTemplate(getCannotFindSchoolPath(schoolOptions, cannotFindSchool));
    setIsUnhappyPath(true);
    setCannotFindSchoolState(true);
  }, [schoolOptions]);

  const authorityNotRegistered = useCallback((): void => {
    const onLocalAuthorityRegisterRequest = async (): Promise<void> => {
      await registerAuthorityRefetch();
      setPageNumber((pageNumber) => pageNumber + 1);
    };
    setFormTemplate(
      getAuthorityNotRegisteredPath(
        true,
        schoolOptions,
        onLocalAuthorityRegisterRequest,
        cannotFindSchool
      )
    );
    setIsUnhappyPath(true);
  }, [schoolOptions, cannotFindSchool, registerAuthorityRefetch]);

  const setHappyPathTemplate = useCallback((): void => {
    setFormTemplate(signUpSchoolHappyPath(schoolOptions, cannotFindSchool));
    setIsUnhappyPath(false);
    setCannotFindSchoolState(false);
  }, [cannotFindSchool, schoolOptions]);

  useEffect(() => {
    if (!formData[0]?.fullValue) {
      return;
    }
    const {
      fullValue: { registrationState, registered, localAuthority },
    } = formData[0];
    if (registrationState === 'laNotRegistered' && !cannotFindSchoolState) {
      authorityNotRegistered();
    } else if (!cannotFindSchoolState) {
      setHappyPathTemplate();
    }
    if (localAuthority) {
      setSelectedLocalAuthority(String(localAuthority));
    }
    if (pageNumber === 4) {
      const refinedData = getSchoolCyaData(formData);
      refinedData &&
        setFormDataForSubmission(
          getFormDataForSubmission({
            formData: refinedData,
            type: FormNames.SCHOOL,
            urn: String(formData[0].fullValue.value),
          })
        );
    }

    if (isUnhappyPath && pageNumber === 2) {
      const refinedData = getRegisterLocalAuthorityFormData(formData);
      refinedData &&
        setFormDataForSubmission(
          getFormDataForSubmission({ formData: refinedData, type: FormNames.AUTHORITY })
        );
    }
    setIsSchoolRegistered(!!registered);
    setHasActiveJoinRequest(registrationState === 'hasJoinRequest');
  }, [
    pageNumber,
    formData,
    authorityNotRegistered,
    setHappyPathTemplate,
    isUnhappyPath,
    cannotFindSchoolState,
  ]);

  useEffect(() => {
    if (!schoolOptions.length) {
      return;
    }
    if (!formTemplate?.length) {
      setHappyPathTemplate();
    }
  }, [setHappyPathTemplate, formTemplate, schoolOptions]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Spinner />
      </div>
    );
  }

  if (isErrorRegister || isErrorLa) {
    return <ErrorBanner />;
  }

  return (
    <div className={styles.container}>
      {formTemplate.length > 0 && (
        <MultiStepForm
          formTemplate={formTemplate}
          formData={formData}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          isLoading={isLoading}
          onChange={onChange}
          isSchoolRegistered={isSchoolRegistered}
          hasActiveJoinRequest={hasActiveJoinRequest}
          refetch={refetch}
          setHappyPathTemplate={setHappyPathTemplate}
          setFormSubmitted={setFormSubmitted}
        />
      )}
    </div>
  );
};

export default SignUpSchool;
