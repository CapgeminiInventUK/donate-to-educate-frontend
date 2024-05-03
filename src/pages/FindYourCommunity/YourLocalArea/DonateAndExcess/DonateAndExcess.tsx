import { FC } from 'react';
import styles from './DonateAndExcess.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { convertMilesToMeters } from '@/utils/distance';
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

const maxDistance = convertMilesToMeters(10);

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
  } = useQuery({
    queryKey: [`getCharitiesNearby-${postcode}-${maxDistance}-${type}`],
    enabled: hasState,
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
  } = useQuery({
    queryKey: [`getSchoolsNearby-${postcode}-${maxDistance}-${type}`],
    enabled: hasState,
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

  if (charityLoading || schoolLoading || !hasState) {
    return <Spinner />;
  }

  if (isErrorCharity || isErrorSchool) {
    return <ErrorBanner />;
  }

  const schoolRows = (schoolData?.getSchoolsNearbyWithProfile ?? []).map((school, index) => ({
    ...school,
    key: index,
  }));

  const charityRows = (charityData?.getCharitiesNearbyWithProfile ?? []).map((charity, index) => ({
    ...charity,
    key: index,
  }));

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <Card>
        <h2>
          {heading} {postcode.toUpperCase()}
        </h2>

        <h3>Schools</h3>
        <ProductsTable
          tableData={schoolRows}
          type="school"
          productsColumnHeader={productsColumnHeader}
        />

        <h3>Charities</h3>
        <ProductsTable
          tableData={charityRows}
          type="charity"
          productsColumnHeader={productsColumnHeader}
        />
      </Card>
    </div>
  );
};

export default DonateAndExcess;
