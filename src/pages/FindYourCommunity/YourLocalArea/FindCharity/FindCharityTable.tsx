import { FC } from 'react';
import { convertMilesToMeters } from '@/utils/distance';
import { GetCharitiesNearbyWithProfileQuery } from '@/types/api';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/Spinner/Spinner';
import { getCharitiesNearbyWithProfile } from '@/graphql/queries';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import ProductsTable from '@/components/ProductsTable/ProductsTable';
import { FindCharityTableProps } from '@/types/props';

const maxDistance = convertMilesToMeters(10);

const FindCharityTable: FC<FindCharityTableProps> = ({ title, postcode }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [`getCharitiesNearby-${postcode}-${maxDistance}-request`],
    enabled: true,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetCharitiesNearbyWithProfileQuery>>({
        query: getCharitiesNearbyWithProfile,
        variables: {
          postcode: postcode,
          distance: maxDistance,
          type: 'request',
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

  const charitiesRows = (data?.getCharitiesNearbyWithProfile ?? []).map((charity, key) => ({
    ...charity,
    key,
  }));

  return (
    <>
      {title ? <h2>{title}</h2> : <h2>Charities near {postcode.toUpperCase()}</h2>}
      <ProductsTable
        tableData={charitiesRows}
        type="charity"
        productsColumnHeader="Product types available"
        postcode={postcode}
      />
    </>
  );
};

export default FindCharityTable;
