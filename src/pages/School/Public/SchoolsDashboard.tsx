import { FC } from 'react';
import PublicDashboard from '@/components/PublicDashboard/PublicDashboard';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetSchoolProfileQuery } from '@/types/api';
import { getSchoolProfile } from '@/graphql/queries';
import Spinner from '@/components/Spinner/Spinner';
import Paths from '@/config/paths';
import BackButton from '@/components/BackButton/BackButton';
import styles from './SchoolDashboard.module.scss';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';

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

  const { excess, donate, request, about, header } = data?.getSchoolProfile ?? {};

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <BackButton theme="blue" />
        <PublicDashboard
          type="school"
          name={name}
          excess={excess}
          donate={donate}
          request={request}
          about={about}
          header={header}
        />
      </div>
    </div>
  );
};

export default SchoolsDashboard;
