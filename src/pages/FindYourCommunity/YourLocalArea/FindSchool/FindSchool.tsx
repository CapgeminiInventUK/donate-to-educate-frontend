import Chevron from '@/assets/yourLocalArea/Chevron';
import BackButton from '@/components/BackButton/BackButton';
import Card from '@/components/Card/Card';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import ProductsTable from '@/components/ProductsTable/ProductsTable';
import Spinner from '@/components/Spinner/Spinner';
import Paths from '@/config/paths';
import { getSchoolsNearbyWithProfile } from '@/graphql/queries';
import { client } from '@/graphqlClient';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import type { GetSchoolsNearbyWithProfileQuery } from '@/types/api';
import { convertMilesToMetres } from '@/utils/distance';
import { SEARCH_RADIUS_IN_MILES, SEARCH_RESULT_LIMIT } from '@/utils/globals';
import LocationMap from '@components/LocationMap/LocationMap';
import { useQuery } from '@tanstack/react-query';
import type { GraphQLQuery } from 'aws-amplify/api';
import { type FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './FindSchool.module.scss';

const maxDistance = convertMilesToMetres(SEARCH_RADIUS_IN_MILES);

const FindSchool: FC = () => {
  const [showDescription, toggleDescription] = useState(false);
  const { state, hasState } = useLocationStateOrRedirect<{ postcode: string }>(
    Paths.FIND_YOUR_COMMUNITY
  );

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`getSchoolsNearby-${state.postcode}-${maxDistance}-request`],
    enabled: true,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetSchoolsNearbyWithProfileQuery>>({
        query: getSchoolsNearbyWithProfile,
        variables: {
          postcode: state.postcode,
          distance: maxDistance,
          limit: SEARCH_RESULT_LIMIT,
          type: 'request',
        },
      });

      return data;
    },
  });

  useEffect(() => {
    void refetch();
  }, [refetch]);

  if (isLoading || !hasState) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorBanner />;
  }

  const schoolData = (data?.getSchoolsNearbyWithProfile?.results ?? []).map((school, index) => ({
    ...school,
    key: index,
  }));

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <Card className={styles.subContainer}>
        <h1>Find a school near {state.postcode.toUpperCase()}</h1>
        <ProductsTable
          tableData={schoolData}
          type="school"
          iconColour="#97C8EB"
          productsColumnHeader="Product types available"
          postcode={state.postcode}
        />

        <h3>School map</h3>
        <LocationMap
          initialCoordinates={
            data?.getSchoolsNearbyWithProfile?.searchLocation?.coordinates ?? [0, 0]
          }
          markers={schoolData.map(({ location: { coordinates }, name }) => ({
            coordinates,
            name,
            colour: '#97C8EB',
          }))}
        />
        <span
          className={styles.expander}
          onClick={() => toggleDescription((previous) => !previous)}
        >
          <Chevron direction={showDescription ? 'down' : 'up'} />
          The school I am looking for has not joined
        </span>
        {showDescription && (
          <div className={styles.missingSchoolDescription}>
            If the school you are looking for has not joined Donate to Educate,{' '}
            <Link to={Paths.LOCAL_CHARITIES} state={{ postcode: state.postcode }}>
              find nearby charities who may be able to help.
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FindSchool;
