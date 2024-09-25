import { FC } from 'react';
import styles from './LocalAuthorityDonate.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import Paths from '@/config/paths';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/Card/Card';
import { useStore } from '@/stores/useStore';
import { useQuery } from '@tanstack/react-query';
import { getCharitiesByLa, getSchoolsByLa } from '@/graphql/queries';
import { GraphQLQuery } from 'aws-amplify/api';
import { Charity, GetCharitiesByLaQuery, GetSchoolsByLaQuery } from '@/types/api';
import { client } from '@/graphqlClient';
import { InstitutionType } from '@/types/data';
import SimpleProductsTable from '@/components/SimpleProductsTable/SimpleProductsTable';
import Spinner from '@/components/Spinner/Spinner';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Heart from '@/assets/LocalAuthorityDashboard/Heart';
import { mapCharityToSimpleSearchResult, mapSchoolToSimpleSearchResult } from '@/utils/mapper';

const LocalAuthorityDonate: FC = () => {
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

  const schoolMappedData = (schoolData?.getSchoolsByLa ?? []).map((school) => {
    return mapSchoolToSimpleSearchResult(school);
  });

  const charityMappedData = (charityData?.getCharitiesByLa ?? []).map((charity) => {
    return mapCharityToSimpleSearchResult(charity as Charity);
  });

  return (
    <div className={styles.container}>
      <BackButton theme="blue" onClick={() => navigate(Paths.LOCAL_AUTHORITY_DASHBOARD)} />
      <Card>
        <Heart />
        <h1>Donations needed in {name}</h1>

        <div>
          <h2>Schools</h2>
          {schoolData ? (
            <SimpleProductsTable
              tableData={schoolMappedData}
              productsDataIndex={['donate', 'productTypes']}
              type={InstitutionType.SCHOOL}
              iconColour="#32739E"
              productsColumnHeader="Product types needed"
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
              productsDataIndex={['donate', 'productTypes']}
              type={InstitutionType.CHARITY}
              iconColour="#32739E"
              productsColumnHeader="Product types needed"
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

export default LocalAuthorityDonate;
