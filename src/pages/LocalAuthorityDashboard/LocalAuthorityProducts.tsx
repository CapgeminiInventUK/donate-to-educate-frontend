import { FC } from 'react';
import styles from './LocalAuthorityProducts.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import Paths from '@/config/paths';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/Card/Card';
import { useStore } from '@/stores/useStore';
import Hanger from '@/assets/tiles/Hanger';
import { useQuery } from '@tanstack/react-query';
import { getCharitiesByLa, getSchoolsByLa } from '@/graphql/queries';
import { GraphQLQuery } from 'aws-amplify/api';
import { Charity, GetCharitiesByLaQuery, GetSchoolsByLaQuery } from '@/types/api';
import { client } from '@/graphqlClient';
import { InstitutionType } from '@/types/data';
import SimpleProductsTable from '@/components/SimpleProductsTable/SimpleProductsTable';
import Spinner from '@/components/Spinner/Spinner';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import { mapCharityToSimpleSearchResult, mapSchoolToSimpleSearchResult } from '@/utils/mapper';

const LocalAuthorityProducts: FC = () => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);

  const { name } = user ?? {};

  const { data: schoolData, isError: schoolDataError } = useQuery({
    queryKey: [`getSchoolsByLa-${name}`],
    enabled: true,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetSchoolsByLaQuery>>({
        query: getSchoolsByLa,
        variables: {
          name,
        },
      });
      return data;
    },
  });

  const { data: charityData, isError: charityDataError } = useQuery({
    queryKey: [`getCharitiesByLa-${name}`],
    enabled: true,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetCharitiesByLaQuery>>({
        query: getCharitiesByLa,
        variables: {
          name,
        },
      });
      return data;
    },
  });

  if (schoolDataError || charityDataError) {
    return <ErrorBanner />;
  }

  const schoolMappedData = (schoolData?.getSchoolsByLa ?? []).map((school, index) => {
    return {
      ...mapSchoolToSimpleSearchResult(school),
      key: index,
    };
  });

  const charityMappedData = (charityData?.getCharitiesByLa ?? []).map((charity, index) => {
    return {
      ...mapCharityToSimpleSearchResult(charity as Charity),
      key: index,
    };
  });

  return (
    <div className={styles.container}>
      <BackButton theme="blue" onClick={() => navigate(Paths.LOCAL_AUTHORITY_DASHBOARD)} />
      <Card>
        <Hanger />
        <h1>Available products in {name}</h1>

        <div>
          <h2>Schools</h2>
          {schoolData ? (
            <SimpleProductsTable
              tableData={schoolMappedData}
              productsDataIndex={['request', 'productTypes']}
              type={InstitutionType.SCHOOL}
              iconColour="#97C8EB"
              productsColumnHeader="Product types available"
              hideNotJoined
            />
          ) : (
            <Spinner />
          )}
        </div>

        <div>
          <h2>Charities and volunteer groups</h2>
          {charityData ? (
            <SimpleProductsTable
              tableData={charityMappedData}
              productsDataIndex={['request', 'productTypes']}
              type={InstitutionType.CHARITY}
              iconColour="#97C8EB"
              productsColumnHeader="Product types available"
              hideNotJoined
            />
          ) : (
            <Spinner />
          )}
        </div>
      </Card>
    </div>
  );
};

export default LocalAuthorityProducts;
