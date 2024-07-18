import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Spinner from '@/components/Spinner/Spinner';
import { getCharityJoinRequestsByLa } from '@/graphql/queries';
import { client } from '@/graphqlClient';
import type { GetCharityJoinRequestsByLaQuery } from '@/types/api';
import type { CharitiesTablesProps } from '@/types/props';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';
import { useQuery } from '@tanstack/react-query';
import type { GraphQLQuery } from 'aws-amplify/api';
import type { FC } from 'react';
import CharitiesTable from './CharitiesTable';

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
    ({ charityName, email, jobTitle, name, phone, id, aboutCharity, charityAddress }) => {
      return {
        name: checkForStringAndReturnEmptyIfFalsy(charityName),
        status: 'Pending',
        key: charityName,
        joinRequestName: name,
        jobTitle,
        email,
        phone,
        id,
        aboutCharity,
        charityAddress,
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
