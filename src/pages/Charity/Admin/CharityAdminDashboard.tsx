import { FC, useEffect, useState } from 'react';
import InstitutionAdminDashboard from '@/components/InstitutionAdmin/InstitutionAdminDashboard';
import Spinner from '@/components/Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetCharityProfileQuery } from '@/types/api';
import { getCharityProfile } from '@/graphql/queries';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import { useStore } from '@/stores/useStore';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';
import { InstitutionType } from '@/types/data';

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
  }, [refetch, setDataFetched, dataFetched]);

  if (isError) {
    return <ErrorBanner />;
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <InstitutionAdminDashboard
      type={InstitutionType.CHARITY}
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
