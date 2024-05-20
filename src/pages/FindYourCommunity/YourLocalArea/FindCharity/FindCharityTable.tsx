import { FC, useEffect } from 'react';
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

const FindCharityTable: FC<FindCharityTableProps> = ({ title, postcode, type }) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`getCharitiesNearby-${postcode}-${maxDistance}-request`],
    enabled: true,
    refetchOnWindowFocus: true,
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

  useEffect(() => {
    void refetch();
  }, [refetch]);

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
      {title ? (
        <h1>{title}</h1>
      ) : type === 'school' ? (
        <h2>Nearby charities who can also help</h2>
      ) : (
        <h2>Other nearby charities who can also help</h2>
      )}
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
