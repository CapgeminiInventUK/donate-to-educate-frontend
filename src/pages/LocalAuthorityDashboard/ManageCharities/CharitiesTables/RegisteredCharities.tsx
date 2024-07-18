import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Spinner from '@/components/Spinner/Spinner';
import { getCharitiesByLa } from '@/graphql/queries';
import { client } from '@/graphqlClient';
import type { GetCharitiesByLaQuery } from '@/types/api';
import type { CharitiesTablesProps } from '@/types/props';
import { useQuery } from '@tanstack/react-query';
import type { GraphQLQuery } from 'aws-amplify/api';
import type { FC } from 'react';
import CharitiesTable from './CharitiesTable';

const RegisteredCharities: FC<CharitiesTablesProps> = ({
  localAuthority,
  setCharitiesNumber,
  setStage,
  setCharityProperties,
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['charity-by-la'],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetCharitiesByLaQuery>>({
        query: getCharitiesByLa,
        variables: {
          name: localAuthority,
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

  setCharitiesNumber(data?.getCharitiesByLa?.length ?? 0);

  const charitiesData = data?.getCharitiesByLa.map((charity, index) => {
    return {
      ...charity,
      name: charity!.name,
      key: index,
      status: 'Joined',
    };
  });

  return (
    <CharitiesTable
      data={charitiesData ?? []}
      setStage={setStage}
      setProperties={setCharityProperties}
    />
  );
};
export default RegisteredCharities;
