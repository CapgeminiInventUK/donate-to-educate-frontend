import { FC, useEffect } from 'react';
import styles from './FindSchool.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { Link } from 'react-router-dom';
import Paths from '@/config/paths';
import Spinner from '@/components/Spinner/Spinner';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetSchoolsNearbyWithProfileQuery } from '@/types/api';
import { convertMilesToMetres } from '@/utils/distance';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import { getSchoolsNearbyWithProfile } from '@/graphql/queries';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Card from '@/components/Card/Card';
import ProductsTable from '@/components/ProductsTable/ProductsTable';
import Map from '@components/Map/Map';
import { SEARCH_RADIUS_IN_MILES, SEARCH_RESULT_LIMIT } from '@/utils/globals';
import { InstitutionType } from '@/types/data';

const maxDistance = convertMilesToMetres(SEARCH_RADIUS_IN_MILES);

const FindSchool: FC = () => {
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

  const schoolData = (data?.getSchoolsNearbyWithProfile?.results ?? []).map((school, index) => {
    return {
      ...school,
      key: index,
    };
  });

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <Card className={styles.subContainer}>
        <h1>Find a school near {state.postcode.toUpperCase()}</h1>

        <div className={styles.subText}>
          <p>
            If the school you are looking for has not joined Donate to Educate yet,{' '}
            <Link to={Paths.LOCAL_CHARITIES} state={{ postcode: state.postcode }}>
              you can also find nearby charities who may be able to help.
            </Link>
          </p>
        </div>

        <ProductsTable
          tableData={schoolData}
          type={InstitutionType.SCHOOL}
          iconColour="#97C8EB"
          productsColumnHeader="Product types available"
          postcode={state.postcode}
          hideNotJoined
        />

        <h3>School map</h3>
        <Map
          initialCoordinates={
            data?.getSchoolsNearbyWithProfile?.searchLocation?.coordinates ?? [0, 0]
          }
          markers={schoolData.map(({ location: { coordinates }, name }) => ({
            coordinates,
            name,
            colour: '#97C8EB',
          }))}
        />
      </Card>
    </div>
  );
};

export default FindSchool;
