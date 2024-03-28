import { FC } from 'react';
import InstitutionAdminDashboard from '@/components/InstitutionAdminDashboard/InstitutionAdminDashboard';
import Spinner from '@/components/Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetCharityProfileQuery } from '@/types/api';
import { getCharityProfile } from '@/graphql/queries';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import { useStore } from '@/stores/useStore';

const CharityAdminDashboard: FC = () => {
  const user = useStore((state) => state.user);
  const { name, id } = user ?? {};

  const { isLoading, data, isError } = useQuery({
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
      name={name ?? ''}
    />
  );
};

export default CharityAdminDashboard;
