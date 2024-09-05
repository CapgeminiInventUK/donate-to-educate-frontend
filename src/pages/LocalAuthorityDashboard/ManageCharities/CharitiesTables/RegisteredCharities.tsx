import { GetCharitiesByLaQuery } from '@/types/api';
import { FC } from 'react';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import { getCharitiesByLa } from '@/graphql/queries';
import Spinner from '@/components/Spinner/Spinner';
import CharitiesTable from './CharitiesTable';
import { CharitiesTablesProps } from '@/types/props';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';

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
      localAuthority,
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
