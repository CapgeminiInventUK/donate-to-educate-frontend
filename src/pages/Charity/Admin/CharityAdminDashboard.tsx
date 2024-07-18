import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import InstitutionAdminDashboard from '@/components/InstitutionAdminDashboard/InstitutionAdminDashboard';
import Spinner from '@/components/Spinner/Spinner';
import { getCharityProfile } from '@/graphql/queries';
import { client } from '@/graphqlClient';
import { useStore } from '@/stores/useStore';
import type { GetCharityProfileQuery } from '@/types/api';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';
import { useQuery } from '@tanstack/react-query';
import type { GraphQLQuery } from 'aws-amplify/api';
import { type FC, useEffect, useState } from 'react';

const CharityAdminDashboard: FC = () => {
  const user = useStore((state) => state.user);
  const { name, id } = user ?? {};
  const [dataFetched, setDataFetched] = useState(false);

  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: [`getProfile-${name}-${id}`],
    enabled: user !== undefined,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetCharityProfileQuery>>({
        query: getCharityProfile,
        variables: {
          name,
          id,
        },
      });

      return data;
    },
  });

  useEffect(() => {
    if (!dataFetched) {
      void refetch();
      setDataFetched(true);
    }
  }, [refetch, dataFetched]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorBanner />;
  }

  return (
    <InstitutionAdminDashboard
      type="charity"
      profile={
        data?.getCharityProfile ?? {
          __typename: 'CharityProfile',
          name: '',
          id: '',
          localAuthority: '',
          postcode: '',
        }
      }
      name={checkForStringAndReturnEmptyIfFalsy(name)}
    />
  );
};

export default CharityAdminDashboard;
