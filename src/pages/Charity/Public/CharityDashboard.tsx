import BackButton from '@/components/BackButton/BackButton';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import PublicDashboard from '@/components/PublicDashboard/PublicDashboard';
import Spinner from '@/components/Spinner/Spinner';
import Paths from '@/config/paths';
import { getCharityProfile } from '@/graphql/queries';
import { client } from '@/graphqlClient';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import type { GetCharityProfileQuery } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import type { GraphQLQuery } from 'aws-amplify/api';
import type { FC } from 'react';
import styles from './CharityDashboard.module.scss';

const CharityDashboard: FC = () => {
  const { state, hasState } = useLocationStateOrRedirect<{ name: string; id: string }>(
    Paths.FIND_YOUR_COMMUNITY
  );

  const { isLoading, data, isError } = useQuery({
    queryKey: [`get-charity-profile-${state.name}-${state.id}`],
    enabled: hasState,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetCharityProfileQuery>>({
        query: getCharityProfile,
        variables: {
          name: state.name,
          id: state.id,
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
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <BackButton theme="blue" />
        <PublicDashboard type="charity" profile={data?.getCharityProfile ?? undefined} />
      </div>
    </div>
  );
};

export default CharityDashboard;
