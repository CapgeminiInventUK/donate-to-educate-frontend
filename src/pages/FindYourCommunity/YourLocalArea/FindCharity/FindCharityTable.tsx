import { FC, useEffect } from 'react';
import { convertMilesToMetres } from '@/utils/distance';
import { GetCharitiesNearbyWithProfileQuery } from '@/types/api';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/Spinner/Spinner';
import { getCharitiesNearbyWithProfile } from '@/graphql/queries';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import ProductsTable from '@/components/ProductsTable/ProductsTable';
import { FindCharityTableProps } from '@/types/props';
import Map from '@components/Map/Map';
import { SEARCH_RADIUS_IN_MILES } from '@/utils/globals';
import { useLocation } from 'react-router-dom';

const maxDistance = convertMilesToMetres(SEARCH_RADIUS_IN_MILES);

const FindCharityTable: FC<FindCharityTableProps> = ({ title, postcode, type }) => {
  const location = useLocation();

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

  const charitiesRows = (data?.getCharitiesNearbyWithProfile?.results ?? []).map(
    (charity, key) => ({
      ...charity,
      key,
    })
  );

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
        iconColour="#97C8EB"
        productsColumnHeader="Product types available"
        postcode={postcode}
      />
      {location.pathname.includes('your-local-area') && (
        <>
          <h3>Charity map</h3>
          <Map
            initialCoordinates={
              data?.getCharitiesNearbyWithProfile?.searchLocation?.coordinates ?? [0, 0]
            }
            markers={charitiesRows.map(({ location: { coordinates }, name }) => ({
              coordinates,
              name,
              colour: '#11356F',
            }))}
          />
        </>
      )}
    </>
  );
};

export default FindCharityTable;
