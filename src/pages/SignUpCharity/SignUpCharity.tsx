import { FC, useCallback, useEffect, useState } from 'react';
import styles from './SignUpCharity.module.scss';
import MultiStepForm from '@components/MultiStepForm/MultiStepForm';
import {
  DropdownOption,
  FormDataItem,
  FormMeta,
  FormNames,
  FormTemplate,
  SubmittedFormData,
} from '@/types/data';
import { client } from '@/graphqlClient';
import {
  GetLocalAuthoritiesQuery,
  InsertJoinRequestMutationVariables,
  InsertLocalAuthorityRegisterRequestMutationVariables,
} from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import { GraphQLQuery } from 'aws-amplify/api';
import { getLocalAuthorities } from '@/graphql/queries';
import {
  checkYourAnswersDataMap,
  getFormDataForSubmission,
  getRegisterLocalAuthorityFormData,
} from '@/utils/formUtils';
import { insertJoinRequest, insertLocalAuthorityRegisterRequest } from '@/graphql/mutations';
import getAuthorityNotRegisteredPath from '@/templates/forms/authorityNotRegistered';
import signUpCharityHappyPath from '@/templates/forms/signUpCharityHappyPath';

const SignUpCharity: FC = () => {
  const [formData, setFormData] = useState<FormDataItem[]>([]);
  const [formTemplate, setFormTemplate] = useState<FormTemplate[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedLocalAuthority, setSelectedLocalAuthority] = useState('');
  const [formDataForSubmission, setFormDataForSubmission] = useState<SubmittedFormData>();
  const [isUnhappyPath, setIsUnhappyPath] = useState(false);
  const [localAuthorityOptions, setLocalAuthorityOptions] = useState<DropdownOption[]>([]);

  const onChange = (
    value: string | number | boolean,
    formMeta: FormMeta | undefined,
    fullValue?: Record<string, unknown>
  ): void => {
    const { page = 0, field = '', section } = formMeta ?? {};
    const removeOldValue = formData.filter(({ field: oldField }) => oldField !== field);
    setFormData([...removeOldValue, { field, value, section, page, fullValue }]);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['la'],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetLocalAuthoritiesQuery>>({
        query: getLocalAuthorities,
      });

      return data;
    },
  });

  if (error) {
    throw new Error('Failed to fetch LocalAuthorities data.');
  }

  const { refetch } = useQuery({
    queryKey: ['register'],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<InsertJoinRequestMutationVariables>>({
        query: insertJoinRequest,
        variables: {
          name: formDataForSubmission?.name,
          localAuthority: selectedLocalAuthority,
          type: 'charity',
          email: formDataForSubmission?.email,
          school: formDataForSubmission?.school,
          jobTitle: formDataForSubmission?.jobTitle,
          phone: formDataForSubmission?.phone,
          charityName: formDataForSubmission?.charityName,
          charityAddress: formDataForSubmission?.charityAddress,
          aboutCharity: formDataForSubmission?.aboutCharity,
        },
      });
      return result;
    },
  });

  const { refetch: registerAuthorityRefetch } = useQuery({
    queryKey: ['registerLaRequest'],
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
        },
      });
      return result;
    },
  });

  useEffect(() => {
    const options = data?.getLocalAuthorities.map(({ code, name, registered }) => ({
      value: code,
      label: name,
      registered,
    }));
    setLocalAuthorityOptions(options ?? []);
  }, [data]);

  const authorityNotRegistered = useCallback((): void => {
    const onLocalAuthorityRegisterRequest = async (): Promise<void> => {
      await registerAuthorityRefetch();
      setPageNumber((pageNumber) => pageNumber + 1);
    };
    setFormTemplate(
      getAuthorityNotRegisteredPath(localAuthorityOptions, onLocalAuthorityRegisterRequest)
    );
    setIsUnhappyPath(true);
  }, [localAuthorityOptions, registerAuthorityRefetch]);

  const setHappyPathTemplate = useCallback((): void => {
    setFormTemplate(signUpCharityHappyPath(localAuthorityOptions));
    setIsUnhappyPath(false);
  }, [localAuthorityOptions]);

  useEffect(() => {
    if (!formData[1]?.fullValue) {
      return;
    }
    const {
      fullValue: { registered = true },
    } = formData[1];
    if (!registered) {
      // eslint-disable-next-line no-console
      console.log(formData[1]);
      authorityNotRegistered();
    } else {
      setHappyPathTemplate();
    }

    if (isUnhappyPath && pageNumber === 3) {
      const refinedData = getRegisterLocalAuthorityFormData(formData);
      refinedData &&
        setFormDataForSubmission(getFormDataForSubmission(refinedData, FormNames.AUTHORITY));
    }
  }, [pageNumber, formData, authorityNotRegistered, setHappyPathTemplate, isUnhappyPath]);

  useEffect(() => {
    if (!localAuthorityOptions?.length) {
      return;
    }
    if (
      !formTemplate?.length ||
      (!formTemplate[pageNumber]?.isUnhappyPath && formTemplate[pageNumber + 1]?.isUnhappyPath)
    ) {
      setHappyPathTemplate();
    }
  }, [setHappyPathTemplate, formTemplate, localAuthorityOptions, pageNumber]);

  useEffect(() => {
    if (pageNumber === 6) {
      const refinedData = checkYourAnswersDataMap(FormNames.CHARITY, formData);
      refinedData &&
        setFormDataForSubmission(getFormDataForSubmission(refinedData, FormNames.CHARITY));
    }
    formData[1]?.value && setSelectedLocalAuthority(String(formData[1].value));
  }, [pageNumber, formData]);

  return (
    <div className={styles.container}>
      {formTemplate.length > 0 && (
        <MultiStepForm
          formTemplate={formTemplate}
          formData={formData}
          isLoading={isLoading}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          onChange={onChange}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default SignUpCharity;
