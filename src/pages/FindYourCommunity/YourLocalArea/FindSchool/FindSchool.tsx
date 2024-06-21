import { FC, useEffect, useState } from 'react';
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
import Chevron from '@/assets/yourLocalArea/Chevron';
import Card from '@/components/Card/Card';
import ProductsTable from '@/components/ProductsTable/ProductsTable';
import Map from '@components/Map/Map';

const maxDistance = convertMilesToMetres(10);

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

  const schoolData = (data?.getSchoolsNearbyWithProfile ?? []).map((school, index) => ({
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
        <Map
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
