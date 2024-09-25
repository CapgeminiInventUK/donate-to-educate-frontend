import { FC } from 'react';
import styles from './LocalAuthorityExcess.module.scss';
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
import { mapCharityToSimpleSearchResult, mapSchoolToSimpleSearchResult } from '@/utils/mapper';
import ExtraStock from '@/assets/LocalAuthorityDashboard/ExtraStock';

const LocalAuthorityExcess: FC = () => {
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
    return mapSchoolToSimpleSearchResult(school, 'excess');
  });

  const charityMappedData = (charityData?.getCharitiesByLa ?? []).reduce(
    (acc: SimpleSearchResult[], charity) => {
      if (charity) {
        acc = [...acc, mapCharityToSimpleSearchResult(charity, 'excess')];
      }
      return acc;
    },
    []
  );

  return (
    <div className={styles.container}>
      <BackButton theme="blue" onClick={() => navigate(Paths.LOCAL_AUTHORITY_DASHBOARD)} />
      <Card>
        <ExtraStock />
        <h1>Extra stock needing redistribution in {name}</h1>

        <div>
          <h2>Schools</h2>
          {schoolData ? (
            <SimpleProductsTable
              tableData={schoolMappedData}
              productsDataIndex={'excess'}
              type={InstitutionType.SCHOOL}
              iconColour="#51B3A8"
              productsColumnHeader="Excess stock product types"
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
              productsDataIndex={'excess'}
              type={InstitutionType.CHARITY}
              iconColour="#51B3A8"
              productsColumnHeader="Excess stock product types"
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

export default LocalAuthorityExcess;
