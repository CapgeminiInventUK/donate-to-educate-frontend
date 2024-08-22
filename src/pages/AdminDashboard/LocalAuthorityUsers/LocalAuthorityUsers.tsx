import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Spinner from '@/components/Spinner/Spinner';
import Paths from '@/config/paths';
import { getLocalAuthorityUsers } from '@/graphql/queries';
import { client } from '@/graphqlClient';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import { GetLocalAuthorityUsersQuery } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import { GraphQLQuery } from 'aws-amplify/api';
import { FC } from 'react';

const LocalAuthorityUsers: FC = () => {
  const {
    state: { id, name },
  } = useLocationStateOrRedirect<{ id: string; name: string }>(Paths.ADMIN_DASHBOARD_LA_VIEW_USERS);

  const { data, isLoading, isError } = useQuery({
    queryKey: [`la-users-${name}`],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetLocalAuthorityUsersQuery>>({
        query: getLocalAuthorityUsers,
        variables: {
          id,
          name,
        },
      });
      return data;
    },
  });

  if (isError) {
    return <ErrorBanner />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  // eslint-disable-next-line no-console
  console.log(data);
  return <div>{name}</div>;
};
export default LocalAuthorityUsers;
