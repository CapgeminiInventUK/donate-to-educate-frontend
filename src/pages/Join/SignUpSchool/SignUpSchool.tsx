import { FC, useCallback, useEffect, useState } from 'react';
import styles from './SignUpSchool.module.scss';
import MultiStepForm from '@components/MultiStepForm/MultiStepForm';
import {
  DropdownOption,
  FormDataItem,
  FormMeta,
  FormNames,
  FormTemplate,
  SubmittedFormData,
} from '@/types/data';
import signUpSchoolHappyPath from '../../../templates/forms/signUpSchoolHappyPath';
import getCannotFindSchoolPath from '../../../templates/forms/cannotFindSchoolPath';
import { useQuery } from '@tanstack/react-query';
import { GraphQLQuery } from 'aws-amplify/api';
import {
  GetSchoolsQuery,
  InsertJoinRequestMutationVariables,
  InsertLocalAuthorityRegisterRequestMutationVariables,
} from '@/types/api';
import { client } from '@/graphqlClient';
import getAuthorityNotRegisteredPath from '../../../templates/forms/authorityNotRegistered';
import { insertJoinRequest, insertLocalAuthorityRegisterRequest } from '@/graphql/mutations';
import {
  getFormDataForSubmission,
  getRegisterLocalAuthorityFormData,
  getSchoolCyaData,
} from '@/utils/formUtils';
import Spinner from '@/components/Spinner/Spinner';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';

const SignUpSchool: FC = () => {
  const [formData, setFormData] = useState<FormDataItem[]>([]);
  const [formTemplate, setFormTemplate] = useState<FormTemplate[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [schoolOptions, setSchoolOptions] = useState<DropdownOption[]>([]);
  const [isSchoolRegistered, setIsSchoolRegistered] = useState(false);
  const [selectedLocalAuthority, setSelectedLocalAuthority] = useState('');
  const [formDataForSubmission, setFormDataForSubmission] = useState<SubmittedFormData>();
  const [isUnhappyPath, setIsUnhappyPath] = useState(false);
  const [cannotFindSchoolState, setCannotFindSchoolState] = useState(false);

  const { data, isLoading, error } = useQuery({
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
            isLocalAuthorityRegistered
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
    const options = data?.getSchools.map(
      ({ urn, name, localAuthority, isLocalAuthorityRegistered, postcode, registered }) => ({
        value: urn,
        label: `${name} - ${postcode}`,
        name,
        localAuthority: localAuthority && localAuthority,
        isLocalAuthorityRegistered,
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
      fullValue: { isLocalAuthorityRegistered, registered, localAuthority },
    } = formData[0];
    if (!isLocalAuthorityRegistered && !cannotFindSchoolState) {
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
          getFormDataForSubmission(
            refinedData,
            FormNames.SCHOOL,
            String(formData[0].fullValue.value)
          )
        );
    }

    if (isUnhappyPath && pageNumber === 2) {
      const refinedData = getRegisterLocalAuthorityFormData(formData);
      refinedData &&
        setFormDataForSubmission(getFormDataForSubmission(refinedData, FormNames.AUTHORITY));
    }
    setIsSchoolRegistered(!!registered);
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
          refetch={refetch}
          setHappyPathTemplate={setHappyPathTemplate}
        />
      )}
    </div>
  );
};

export default SignUpSchool;
