import { FC } from 'react';
import PublicDashboard from '@/components/PublicDashboard/PublicDashboard';
import BackButton from '@/components/BackButton/BackButton';
import styles from './CharityDashboard.module.scss';
import { getCharityProfile } from '@/graphql/queries';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetCharityProfileQuery } from '@/types/api';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import Paths from '@/config/paths';
import Spinner from '@/components/Spinner/Spinner';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';

const CharityDashboard: FC = () => {
  const { state, hasState } = useLocationStateOrRedirect<{ name: string; id: string }>(
    Paths.FIND_YOUR_COMMUNITY
  );

  const { isLoading, data } = useQuery({
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

  const { excess, donate, request, about, header } = data?.getCharityProfile ?? {};

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <BackButton theme="blue" />
        <PublicDashboard
          type="charity"
          name={state.name}
          about={about}
          header={header}
          excess={excess}
          donate={donate}
          request={request}
        />
      </div>
    </div>
  );
};

export default CharityDashboard;
