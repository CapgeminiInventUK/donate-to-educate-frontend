import Paths from '@/config/paths';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import { InstitutionProfile, InstitutionType } from '@/types/data';
import { FC } from 'react';
import ManageInstitution from '@/components/ManageInstitutions/ManageInstitution';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetSchoolProfileQuery, SchoolProfile } from '@/types/api';
import { getSchoolProfile } from '@/graphql/queries';
import Spinner from '@/components/Spinner/Spinner';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import { getDataValuesFromQueryObject } from '@/utils/api';

const CharityUsers: FC = () => {
  const { state } = useLocationStateOrRedirect<{ institution: InstitutionProfile }>(
    Paths.LOCAL_AUTHORITY_DASHBOARD
  );

  const {
    institution: { name, id },
  } = state;

  const { data, isLoading, isError } = useQuery({
    queryKey: [`get-charity-profile=${id}`],
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

  const { header } =
    getDataValuesFromQueryObject<SchoolProfile>(data as GraphQLQuery<SchoolProfile>) ?? {};

  return (
    <ManageInstitution
      type={InstitutionType.CHARITY}
      institutionProfile={state.institution}
      header={header ?? undefined}
    />
  );
};
export default CharityUsers;
