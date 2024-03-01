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
import getHappyPath from './happyPath';
import getCannotFindSchoolPath from './cannotFindSchoolPath';
import { useQuery } from '@tanstack/react-query';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetSchoolsQuery, InsertJoinRequestMutationVariables } from '@/types/api';
import { client } from '@/graphqlClient';
import getAuthorityNotRegisteredPath from './authorityNotRegistered';
import { getSchools } from '@/graphql/queries';
import { insertJoinRequest } from '@/graphql/mutations';
import { checkYourAnswersDataMap, getFormDataForSubmission } from '@/utils/formUtils';

const SignUpSchool: FC = () => {
  const [formData, setFormData] = useState<FormDataItem[]>([]);
  const [formTemplate, setFormTemplate] = useState<FormTemplate[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [schoolOptions, setSchoolOptions] = useState<DropdownOption[]>([]);
  const [isSchoolRegistered, setIsSchoolRegistered] = useState(false);
  const [selectedLocalAuthority, setSelectedLocalAuthority] = useState('');
  const [formDataForSubmission, setFormDataForSubmission] = useState<SubmittedFormData>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['sc'],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetSchoolsQuery>>({
        query: getSchools,
      });

      return data;
    },
  });

  if (error) {
    throw new Error('Failed to fetch Schools data.');
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
          type: 'school',
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

  useEffect(() => {
    const options = data?.getSchools.map(
      ({ urn, name, localAuthority, isLocalAuthorityRegistered, postcode, registered }) => ({
        value: urn,
        label: `${name} - ${postcode}`,
        name,
        localAuthority,
        isLocalAuthorityRegistered,
        postcode,
        registered,
      })
    );
    setSchoolOptions(options ?? []);
  }, [data]);

  const onChange = (
    value: string | number | boolean,
    formMeta: FormMeta | undefined,
    fullValue?: Record<string, unknown>
  ): void => {
    const { page = 0, field = '', section } = formMeta ?? {};
    const removeOldValue = formData.filter(({ field: oldField }) => oldField !== field);
    setFormData([...removeOldValue, { field, value, section, page, fullValue }]);
  };

  const cannotFindSchool = useCallback((): void => {
    setFormTemplate(getCannotFindSchoolPath(schoolOptions, cannotFindSchool));
  }, [schoolOptions]);

  const authorityNotRegistered = useCallback((): void => {
    setFormTemplate(getAuthorityNotRegisteredPath(schoolOptions, cannotFindSchool, setPageNumber));
  }, [schoolOptions, cannotFindSchool]);

  const setHappyPathTemplate = useCallback((): void => {
    setFormTemplate(getHappyPath(schoolOptions, cannotFindSchool));
  }, [cannotFindSchool, schoolOptions]);

  useEffect(() => {
    if (!formData[0]?.fullValue) {
      return;
    }
    const {
      fullValue: { isLocalAuthorityRegistered, registered, localAuthority },
    } = formData[0];
    if (!isLocalAuthorityRegistered) {
      authorityNotRegistered();
    } else {
      setHappyPathTemplate();
    }
    if (localAuthority) {
      setSelectedLocalAuthority(String(localAuthority));
    }
    if (pageNumber === 4) {
      const refinedData = checkYourAnswersDataMap(FormNames.SCHOOL, formData);
      refinedData &&
        setFormDataForSubmission(getFormDataForSubmission(refinedData, FormNames.SCHOOL));
    }
    setIsSchoolRegistered(!!registered);
  }, [pageNumber, formData, authorityNotRegistered, setHappyPathTemplate]);

  useEffect(() => {
    if (!schoolOptions.length) {
      return;
    }
    if (
      !formTemplate?.length ||
      (!formTemplate[pageNumber]?.isUnhappyPath && formTemplate[pageNumber + 1]?.isUnhappyPath)
    ) {
      setHappyPathTemplate();
    }
  }, [setHappyPathTemplate, pageNumber, formTemplate, schoolOptions]);

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
        />
      )}
    </div>
  );
};

export default SignUpSchool;
