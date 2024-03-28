import { FC } from 'react';

import InstitutionAdminDashboard from '@/components/InstitutionAdminDashboard/InstitutionAdminDashboard';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GetSchoolProfileQuery } from '@/types/api';
import { GraphQLQuery } from 'aws-amplify/api';
import { getSchoolProfile } from '@/graphql/queries';
import Spinner from '@/components/Spinner/Spinner';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import { useStore } from '@/stores/useStore';

const SchoolAdminDashboard: FC = () => {
  const user = useStore((state) => state.user);
  const { name, id } = user ?? {};

  const { isLoading, data, isError } = useQuery({
    queryKey: [`getProfile-${name}-${id}`],
    enabled: user !== undefined,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetSchoolProfileQuery>>({
        query: getSchoolProfile,
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
      type="school"
      profile={
        data?.getSchoolProfile ?? {
          __typename: 'SchoolProfile',
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

export default SchoolAdminDashboard;
