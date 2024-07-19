import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Spinner from '@/components/Spinner/Spinner';
import { getRegisteredSchoolsByLa } from '@/graphql/queries';
import { client } from '@/graphqlClient';
import type { GetRegisteredSchoolsByLaQuery } from '@/types/api';
import type { SchoolsTablesProps } from '@/types/props';
import { useQuery } from '@tanstack/react-query';
import type { GraphQLQuery } from 'aws-amplify/api';
import type { FC } from 'react';
import SchoolsTable from './SchoolsTable';

const RegisteredSchools: FC<SchoolsTablesProps> = ({
  localAuthority,
  setSchoolsNumber,
  setStage,
  setSchoolProperties,
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['school-registered'],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetRegisteredSchoolsByLaQuery>>({
        query: getRegisteredSchoolsByLa,
        variables: {
          localAuthority,
        },
      });

      return data;
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorBanner />;
  }

  setSchoolsNumber(data?.getRegisteredSchoolsByLa?.length ?? 0);

  const registeredSchoolData = data?.getRegisteredSchoolsByLa.map(({ name, urn }) => {
    return {
      name,
      urn,
      status: 'Joined',
      key: name,
    };
  });

  return (
    <SchoolsTable
      data={registeredSchoolData ?? []}
      setStage={setStage}
      setProperties={setSchoolProperties}
    />
  );
};
export default RegisteredSchools;
