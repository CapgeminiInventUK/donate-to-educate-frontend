import { FC, useEffect, useState } from 'react';

import InstitutionAdminDashboard from '@/components/InstitutionAdminDashboard/InstitutionAdminDashboard';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GetSchoolProfileQuery } from '@/types/api';
import { GraphQLQuery } from 'aws-amplify/api';
import { getSchoolProfile } from '@/graphql/queries';
import { CustomAttributes, getUserType } from '@/hooks/useCheckCurrentUser';
import Spinner from '@/components/Spinner/Spinner';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';

const SchoolAdminDashboard: FC = () => {
  const [attributes, setAttributes] = useState<CustomAttributes>();
  const name = attributes?.['custom:institution'];
  const id = attributes?.['custom:institutionId'];
  const [userError, setUserError] = useState<string>();

  const { isLoading, data, isError } = useQuery({
    queryKey: [`getProfile-${name}-${id}`],
    enabled: attributes !== undefined,
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

  useEffect(() => {
    if (!attributes) {
      getUserType()
        .then((attributes) => {
          setAttributes(attributes);
        })
        .catch((err: string) => setUserError(err));
    }
  });

  if (!attributes || isLoading) {
    return <Spinner />;
  }

  if (isError || userError) {
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
