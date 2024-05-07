import { FC } from 'react';
import Paths from '@/config/paths';
import { convertMilesToMeters } from '@/utils/distance';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import { GetCharitiesNearbyWithProfileQuery } from '@/types/api';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/Spinner/Spinner';
import { getCharitiesNearbyWithProfile } from '@/graphql/queries';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import ProductsTable from '@/components/ProductsTable/ProductsTable';

const maxDistance = convertMilesToMeters(10);

interface FindCharityTableProps {
  title?: string;
}

const FindCharityTable: FC<FindCharityTableProps> = ({ title }) => {
  const { state, hasState } = useLocationStateOrRedirect<{ postcode: string }>(
    Paths.FIND_YOUR_COMMUNITY
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: [`getCharitiesNearby-${state.postcode}-${maxDistance}-request`],
    enabled: hasState,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetCharitiesNearbyWithProfileQuery>>({
        query: getCharitiesNearbyWithProfile,
        variables: {
          postcode: state.postcode,
          distance: maxDistance,
          type: 'request',
        },
      });

      return data;
    },
  });

  if (isLoading || !hasState) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorBanner />;
  }

  const charitiesRows = (data?.getCharitiesNearbyWithProfile ?? []).map((charity, key) => ({
    ...charity,
    key,
  }));

  return (
    <>
      {title ? <h2>{title}</h2> : <h2>Charities near {state.postcode.toUpperCase()}</h2>}
      <ProductsTable
        tableData={charitiesRows}
        type="charity"
        productsColumnHeader="Product types available"
        postcode={state.postcode}
      />
    </>
  );
};

export default FindCharityTable;
