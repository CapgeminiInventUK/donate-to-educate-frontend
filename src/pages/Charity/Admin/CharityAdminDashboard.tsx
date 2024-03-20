import { FC, useEffect, useState } from 'react';

import InstitutionAdminDashboard from '@/components/InstitutionAdminDashboard/InstitutionAdminDashboard';
import Spinner from '@/components/Spinner/Spinner';
import { CustomAttributes, getUserType } from '@/hooks/useCheckCurrentUser';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetCharityProfileQuery } from '@/types/api';
import { getCharityProfile } from '@/graphql/queries';

const CharityAdminDashboard: FC = () => {
  const [attributes, setAttributes] = useState<CustomAttributes>();

  // TODO need to make the query key unique for each charity
  const { isLoading, data } = useQuery({
    queryKey: ['profile'],
    enabled: attributes !== undefined,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetCharityProfileQuery>>({
        query: getCharityProfile,
        variables: {
          name: attributes?.['custom:institution'],
          id: attributes?.['custom:institutionId'],
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
        // eslint-disable-next-line no-console
        .catch(console.log);
    }
  });

  if (!attributes || isLoading) {
    return <Spinner />;
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
      name={attributes?.['custom:institution']}
    />
  );
};

export default CharityAdminDashboard;
