import { FC } from 'react';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import { GetRegisteredSchoolsQuery } from '@/types/api';
import { getRegisteredSchools } from '@/graphql/queries';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import ManageInstitutionsTable from '../ManageInstitutions/ManageInstitutionsTable';
import { InstitutionType } from '@/types/data';

const ManageSchools: FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['registeredSchools'],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetRegisteredSchoolsQuery>>({
        query: getRegisteredSchools,
      });

      return data;
    },
  });

  if (isError) {
    return <ErrorBanner />;
  }

  const tableData =
    data?.getRegisteredSchools?.map((school) => ({
      id: school.urn,
      ...school,
    })) ?? [];

  return (
    <ManageInstitutionsTable data={tableData} type={InstitutionType.SCHOOL} isLoading={isLoading} />
  );
};

export default ManageSchools;
