import { FC, useEffect } from 'react';
import styles from './DonateAndExcess.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { convertMilesToMetres } from '@/utils/distance';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetCharitiesNearbyWithProfileQuery, GetSchoolsNearbyWithProfileQuery } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/Spinner/Spinner';
import { getCharitiesNearbyWithProfile, getSchoolsNearbyWithProfile } from '@/graphql/queries';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Card from '@/components/Card/Card';
import ProductsTable from '@/components/ProductsTable/ProductsTable';
import { DonateAndExcessProps } from '@/types/props';
import Map from '@components/Map/Map';

const maxDistance = convertMilesToMetres(10);

const DonateAndExcess: FC<DonateAndExcessProps> = ({ type, postcode, hasState }) => {
  const heading =
    type === 'excess'
      ? 'Schools and charities with excess stock near'
      : 'Donate to schools and charities near';

  const productsColumnHeader =
    type === 'excess' ? 'Excess stock product types' : 'Product types needed';

  const {
    data: charityData,
    isLoading: charityLoading,
    isError: isErrorCharity,
    refetch: charityRefetch,
  } = useQuery({
    queryKey: [`getCharitiesNearby-${postcode}-${maxDistance}-${type}`],
    enabled: hasState,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetCharitiesNearbyWithProfileQuery>>({
        query: getCharitiesNearbyWithProfile,
        variables: {
          postcode,
          distance: maxDistance,
          type,
        },
      });

      return data;
    },
  });

  const {
    data: schoolData,
    isLoading: schoolLoading,
    isError: isErrorSchool,
    refetch: schoolRefetch,
  } = useQuery({
    queryKey: [`getSchoolsNearby-${postcode}-${maxDistance}-${type}`],
    enabled: hasState,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetSchoolsNearbyWithProfileQuery>>({
        query: getSchoolsNearbyWithProfile,
        variables: {
          postcode,
          distance: maxDistance,
          type,
        },
      });

      return data;
    },
  });

  useEffect(() => {
    void charityRefetch();
    void schoolRefetch();
  }, [schoolRefetch, charityRefetch]);

  if (charityLoading || schoolLoading || !hasState) {
    return <Spinner />;
  }

  if (isErrorCharity || isErrorSchool) {
    return <ErrorBanner />;
  }

  const schoolRows = (schoolData?.getSchoolsNearbyWithProfile?.results ?? []).map(
    (school, index) => ({
      ...school,
      type: 'school',
      key: index,
    })
  );

  const charityRows = (charityData?.getCharitiesNearbyWithProfile?.results ?? []).map(
    (charity, index) => ({
      ...charity,
      type: 'charity',
      key: index,
    })
  );

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <Card>
        <h1>
          {heading} {postcode.toUpperCase()}
        </h1>

        <h2>Schools</h2>
        <ProductsTable
          tableData={schoolRows}
          type="school"
          iconColour={type === 'excess' ? '#00B6A8' : '#0075A2'}
          productsColumnHeader={productsColumnHeader}
          hideNotJoined={true}
          hideNoProducts={true}
          hideStatus={true}
        />

        <h2>Charities</h2>
        <ProductsTable
          tableData={charityRows}
          type="charity"
          iconColour={type === 'excess' ? '#00B6A8' : '#0075A2'}
          productsColumnHeader={productsColumnHeader}
          hideNoProducts={true}
        />

        <h3>Location map</h3>
        <Map
          initialCoordinates={
            schoolData?.getSchoolsNearbyWithProfile?.searchLocation?.coordinates ?? [0, 0]
          }
          markers={[...schoolRows, ...charityRows].map(
            ({ location: { coordinates }, name, type }) => ({
              coordinates,
              name,
              colour: type === 'school' ? '#97C8EB' : '#11356F',
            })
          )}
        />
      </Card>
    </div>
  );
};

export default DonateAndExcess;
