import { FC } from 'react';
import styles from './LocalAuthorityDashboard.module.scss';
import { useQuery } from '@tanstack/react-query';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetLocalAuthorityUserQuery } from '@/types/api';
import { client } from '@/graphqlClient';
import { getLocalAuthorityUser } from '@/graphql/queries';
import { useCheckCurrentUser } from '@/hooks/useCheckCurrentUser';

// Need to make this a protected route only for logged in users of type la.
const LocalAuthorityDashboard: FC = () => {
  const { user } = useCheckCurrentUser();

  const { data } = useQuery({
    queryKey: [`la-dashboard-${user?.username}`],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetLocalAuthorityUserQuery>>({
        query: getLocalAuthorityUser,
        variables: {
          email: user?.username,
        },
      });

      return data;
    },
    enabled: user?.username !== undefined,
  });

  return (
    <div className={styles.container}>
      <div className={styles.adminCard}>
        <h1>{data?.getLocalAuthorityUser.name}</h1>
        <div className={styles.body}>
          <h2>Manage your community</h2>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default LocalAuthorityDashboard;
