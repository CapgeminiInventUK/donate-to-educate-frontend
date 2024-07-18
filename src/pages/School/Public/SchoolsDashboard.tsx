import BackButton from '@/components/BackButton/BackButton';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import PublicDashboard from '@/components/PublicDashboard/PublicDashboard';
import Spinner from '@/components/Spinner/Spinner';
import Paths from '@/config/paths';
import { getSchoolProfile } from '@/graphql/queries';
import { client } from '@/graphqlClient';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import type { GetSchoolProfileQuery } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import type { GraphQLQuery } from 'aws-amplify/api';
import type { FC } from 'react';
import styles from './SchoolDashboard.module.scss';

const SchoolsDashboard: FC = () => {
  const { state, hasState } = useLocationStateOrRedirect<{ name: string; urn: string }>(
    Paths.FIND_YOUR_COMMUNITY
  );
  const { name, urn } = state;

  const { isLoading, data, isError } = useQuery({
    queryKey: [`school-profile-${name}-${urn}`],
    enabled: hasState,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetSchoolProfileQuery>>({
        query: getSchoolProfile,
        variables: {
          name,
          id: urn,
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
        <PublicDashboard type="school" profile={data?.getSchoolProfile ?? undefined} />
      </div>
    </div>
  );
};

export default SchoolsDashboard;
