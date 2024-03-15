import { FC } from 'react';
import PublicDashboard from '@/components/PublicDashboard/PublicDashboard';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { Navigate, useLocation } from 'react-router-dom';
import { GetSchoolProfileQuery } from '@/types/api';
import { getSchoolProfile } from '@/graphql/queries';
import Spinner from '@/components/Spinner/Spinner';
import Paths from '@/config/paths';

const SchoolsDashboard: FC = () => {
  const location = useLocation();
  const { name, urn } = (location?.state as { name: string; urn: string }) || {};

  const { isLoading, data } = useQuery({
    queryKey: [`school-profile-${name}-${urn}`],
    enabled: location?.state !== undefined,
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

  if (!name || !urn) {
    return <Navigate to={Paths.FIND_YOUR_COMMUNITY} />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  const { excess, donate, request } = data?.getSchoolProfile ?? {};

  return (
    <PublicDashboard type="school" name={name} excess={excess} donate={donate} request={request} />
  );
};

export default SchoolsDashboard;
