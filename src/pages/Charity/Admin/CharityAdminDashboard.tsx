import { FC, useEffect, useState } from 'react';

import InstitutionAdminDashboard from '@/components/InstitutionAdminDashboard/InstitutionAdminDashboard';
import Spinner from '@/components/Spinner/Spinner';
import { CustomAttributes, getUserType } from '@/hooks/useCheckCurrentUser';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetCharityProfileQuery } from '@/types/api';
import { getCharityProfile } from '@/graphql/queries';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';

const CharityAdminDashboard: FC = () => {
  const [attributes, setAttributes] = useState<CustomAttributes>();
  const name = attributes?.['custom:institution'];
  const id = attributes?.['custom:institutionId'];
  const [userError, setUserError] = useState<string>();

  const { isLoading, data, isError } = useQuery({
    queryKey: [`getProfile-${name}-${id}`],
    enabled: attributes !== undefined,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetCharityProfileQuery>>({
        query: getCharityProfile,
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
      type="charity"
      profile={
        data?.getCharityProfile ?? {
          __typename: 'CharityProfile',
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

export default CharityAdminDashboard;
