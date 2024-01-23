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
import { getSchools } from '@/graphql/queries';

const SignUpSchool: FC = () => {
  const [formData, setFormData] = useState<FormDataItem[]>([]);
  const [formTemplate, setFormTemplate] = useState<FormTemplate[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [schoolOptions, setSchoolOptions] = useState<DropdownOption[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['la'],
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
    const options = data?.getSchools.map(({ urn, name, localAuthority, postcode, registered }) => ({
      value: urn,
      label: name,
      localAuthority,
      postcode,
      registered,
    }));
    setSchoolOptions(options ?? []);
  }, [data]);

  const onChange = useCallback(
    (
      value: string | number | boolean,
      formMeta: FormMeta | undefined,
      fullValue?: Record<string, unknown>
    ): void => {
      const { page = 0, field = '', section } = formMeta ?? {};
      const removeOldValue = formData.filter(({ field: oldField }) => oldField !== field);
      setFormData([...removeOldValue, { field, value, section, page, fullValue }]);
    },
    [formData]
  );

  const cannotFindSchool = useCallback((): void => {
    setFormTemplate(getCannotFindSchoolPath(onChange, schoolOptions, cannotFindSchool));
  }, [onChange, schoolOptions]);

  const setHappyPathTemplate = useCallback((): void => {
    setFormTemplate(getHappyPath(onChange, schoolOptions, cannotFindSchool));
  }, [cannotFindSchool, onChange, schoolOptions]);

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
        />
      )}
    </div>
  );
};

export default SignUpSchool;
