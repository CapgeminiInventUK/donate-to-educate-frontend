import { FC } from 'react';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import { GetCharitiesQuery } from '@/types/api';
import { getCharities } from '@/graphql/queries';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import ManageInstitutionsTable from '@components/ManageInstitutions/ManageInstitutionsTable';
import { InstitutionType } from '@/types/data';

const ManageCharities: FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['registeredCharities'],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetCharitiesQuery>>({
        query: getCharities,
      });

      return data;
    },
  });

  if (isError) {
    return <ErrorBanner />;
  }

  return (
    <ManageInstitutionsTable
      data={data?.getCharities ?? []}
      type={InstitutionType.CHARITY}
      isLoading={isLoading}
    />
  );
};

export default ManageCharities;
