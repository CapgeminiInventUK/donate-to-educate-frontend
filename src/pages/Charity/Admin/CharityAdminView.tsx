import { FC } from 'react';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Spinner from '@/components/Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetCharityProfileQuery } from '@/types/api';
import { getCharityProfile } from '@/graphql/queries';
import { useStore } from '@/stores/useStore';
import InstitutionAdminView from '@/components/InstitutionAdmin/InstitutionAdminView/InstitutionAdminView';
import { InstitutionType } from '@/types/data';

const CharityView: FC = () => {
  const user = useStore((state) => state.user);
  const { name, id } = user ?? {};

  const { isLoading, data, isError } = useQuery({
    queryKey: [`getProfile-${name}-${id}`],
    enabled: user !== undefined,
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

  return isLoading ? (
    <Spinner />
  ) : isError ? (
    <ErrorBanner />
  ) : (
    <InstitutionAdminView
      name={name ?? ''}
      postcode={data?.getCharityProfile?.postcode ?? ''}
      localAuthority={data?.getCharityProfile?.localAuthority}
      type={InstitutionType.CHARITY}
    />
  );
};

export default CharityView;
