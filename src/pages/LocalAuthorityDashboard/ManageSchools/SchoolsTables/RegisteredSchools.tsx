import { GetRegisteredSchoolsByLaQuery } from '@/types/api';
import { FC } from 'react';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import { getRegisteredSchoolsByLa } from '@/graphql/queries';
import Spinner from '@/components/Spinner/Spinner';
import SchoolsTable from './SchoolsTable';
import { SchoolsTablesProps } from '@/types/props';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';

const RegisteredSchools: FC<SchoolsTablesProps> = ({ localAuthority, setSchoolsNumber }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [`school-registered-by-la-${localAuthority}`],
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

  return <SchoolsTable data={registeredSchoolData ?? []} />;
};
export default RegisteredSchools;
