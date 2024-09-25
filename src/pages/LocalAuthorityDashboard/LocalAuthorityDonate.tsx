import { FC } from 'react';
import styles from './LocalAuthorityDonate.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import Paths from '@/config/paths';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/Card/Card';
import { useStore } from '@/stores/useStore';
import { useQuery } from '@tanstack/react-query';
import { getCharitiesByLa, getRegisteredSchoolsByLa } from '@/graphql/queries';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetCharitiesByLaQuery, GetRegisteredSchoolsByLaQuery } from '@/types/api';
import { client } from '@/graphqlClient';
import { InstitutionType, SimpleSearchResult } from '@/types/data';
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
    queryKey: [`getRegisteredSchoolsByLa-${name}`],
    enabled: true,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetRegisteredSchoolsByLaQuery>>({
        query: getRegisteredSchoolsByLa,
        variables: {
          localAuthority: name,
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

  const schoolMappedData = (schoolData?.getRegisteredSchoolsByLa ?? []).map((school) => {
    return mapSchoolToSimpleSearchResult(school, 'donate');
  });

  const charityMappedData = (charityData?.getCharitiesByLa ?? []).reduce(
    (acc: SimpleSearchResult[], charity) => {
      if (charity) {
        acc = [...acc, mapCharityToSimpleSearchResult(charity, 'donate')];
      }
      return acc;
    },
    []
  );

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
              productsDataIndex={'productTypes'}
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
              productsDataIndex={'productTypes'}
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
