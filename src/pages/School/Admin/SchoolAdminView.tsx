import { FC } from 'react';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Spinner from '@/components/Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetSchoolProfileQuery } from '@/types/api';
import { getSchoolProfile } from '@/graphql/queries';
import { useStore } from '@/stores/useStore';
import InstitutionAdminView from '@/components/InstitutionAdminDashboard/InstitutionAdminView/InstitutionAdminView';

const SchoolAdminView: FC = () => {
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

  return isLoading ? (
    <Spinner />
  ) : isError ? (
    <ErrorBanner />
  ) : (
    <InstitutionAdminView
      name={name ?? ''}
      postcode={data?.getSchoolProfile?.postcode ?? ''}
      type="school"
    />
  );
};

export default SchoolAdminView;
