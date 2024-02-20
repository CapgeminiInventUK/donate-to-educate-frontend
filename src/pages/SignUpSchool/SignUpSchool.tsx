import { FC, useCallback, useEffect, useState } from 'react';
import styles from './SignUpSchool.module.scss';
import MultiStepForm from '@components/MultiStepForm/MultiStepForm';
import { DropdownOption, FormDataItem, FormMeta, FormTemplate } from '@/types/data';
import getHappyPath from './happyPath';
import getCannotFindSchoolPath from './cannotFindSchoolPath';
import { useQuery } from '@tanstack/react-query';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetSchoolsQuery } from '@/types/api';
import { client } from '@/graphqlClient';
import getAuthorityNotRegisteredPath from './authorityNotRegistered';
import { getSchools } from '@/graphql/queries';

const SignUpSchool: FC = () => {
  const [formData, setFormData] = useState<FormDataItem[]>([]);
  const [formTemplate, setFormTemplate] = useState<FormTemplate[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [schoolOptions, setSchoolOptions] = useState<DropdownOption[]>([]);

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
    if (!formData[0]?.fullValue?.isLocalAuthorityRegistered) {
      authorityNotRegistered();
    } else {
      setHappyPathTemplate();
    }
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
        />
      )}
    </div>
  );
};

export default SignUpSchool;
