import { GetCharityJoinRequestsByLaQuery } from '@/types/api';
import { FC } from 'react';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import { getCharityJoinRequestsByLa } from '@/graphql/queries';
import Spinner from '@/components/Spinner/Spinner';
import CharitiesTable from './CharitiesTable';
import { CharitiesTablesProps } from '@/types/props';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';

const PendingCharities: FC<CharitiesTablesProps> = ({
  localAuthority,
  setCharitiesNumber,
  setStage,
  setCharityProperties,
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [`charity-pending-${localAuthority}`],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetCharityJoinRequestsByLaQuery>>({
        query: getCharityJoinRequestsByLa,
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

  setCharitiesNumber(data?.getCharityJoinRequestsByLa?.length ?? 0);

  const pendingCharitiesData = data?.getCharityJoinRequestsByLa.map(
    ({ charityName, email, jobTitle, name, phone, id }) => {
      return {
        name: charityName ?? '',
        status: 'Pending',
        key: charityName,
        joinRequestName: name,
        jobTitle,
        email,
        phone,
        id,
      };
    }
  );

  return (
    <CharitiesTable
      data={pendingCharitiesData ?? []}
      setStage={setStage}
      setProperties={setCharityProperties}
    />
  );
};
export default PendingCharities;
