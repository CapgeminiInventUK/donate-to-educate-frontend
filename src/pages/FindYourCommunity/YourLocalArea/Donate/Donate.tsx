import { FC } from 'react';
import styles from './Donate.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { convertMetersToMiles, convertMilesToMeters } from '@/utils/distance';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import {
  GetCharitiesNearbyWithProfileQuery,
  GetSchoolsNearbyWithProfileQuery,
  InstituteSearchResult,
} from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/Spinner/Spinner';
import Button from '@/components/Button/Button';
import { getCharitiesNearbyWithProfile, getSchoolsNearbyWithProfile } from '@/graphql/queries';
import ProductTypes from '@/assets/icons/ProductTypes';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';

const maxDistance = convertMilesToMeters(10);

const Donate: FC = () => {
  const { state, hasState } = useLocationStateOrRedirect<{ postcode: string }>(
    Paths.FIND_YOUR_COMMUNITY
  );
  const navigate = useNavigate();

  const {
    data: charityData,
    isLoading: charityLoading,
    isError: isErrorCharity,
  } = useQuery({
    queryKey: [`getCharitiesNearby-${state.postcode}-${maxDistance}-donate`],
    enabled: hasState,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetCharitiesNearbyWithProfileQuery>>({
        query: getCharitiesNearbyWithProfile,
        variables: {
          postcode: state.postcode,
          distance: maxDistance,
          type: 'donate',
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
    queryKey: [`getSchoolsNearby-${state.postcode}-${maxDistance}-donate`],
    enabled: hasState,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetSchoolsNearbyWithProfileQuery>>({
        query: getSchoolsNearbyWithProfile,
        variables: {
          postcode: state.postcode,
          distance: maxDistance,
          type: 'donate',
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

  const charityColumns: ColumnsType<InstituteSearchResult> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string, { id, name }: InstituteSearchResult) => (
        <Button
          key={id}
          theme="link-blue"
          text={text}
          ariaLabel={`name-${text}`}
          onClick={() => navigate(Paths.CHARITY_DASHBOARD, { state: { id, name } })}
        />
      ),
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      render: (text: string) => `${convertMetersToMiles(text)} miles`,
    },
    {
      title: 'Product types needed',
      dataIndex: 'productTypes',
      render: (text: number[]) =>
        text.map((productType) => (
          <ProductTypes key={productType} type={productType} className={styles.productType} />
        )),
    },
  ];

  const schoolColumns: ColumnsType<InstituteSearchResult> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string, { id, name, registered }: InstituteSearchResult) =>
        registered ? (
          <Button
            theme="link-blue"
            text={text}
            ariaLabel={`name-${text}`}
            onClick={() => navigate(Paths.SCHOOLS_DASHBOARD, { state: { id, name } })}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      render: (text: string) => `${convertMetersToMiles(text)} miles`,
    },
    {
      title: 'Product types needed',
      dataIndex: 'productTypes',
      render: (text: number[]) =>
        text.map((productType) => (
          <ProductTypes key={productType} type={productType} className={styles.productType} />
        )),
    },
  ];

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <div className={styles.subContainer}>
        <h2>Donate to schools and charities near {state.postcode.toUpperCase()}</h2>

        <h3>Schools</h3>
        <Table
          dataSource={schoolData?.getSchoolsNearbyWithProfile ?? []}
          columns={schoolColumns}
          scroll={{ x: 'max-content' }}
          rowKey="id"
        />

        <h3>Charities</h3>
        <Table
          dataSource={charityData?.getCharitiesNearbyWithProfile ?? []}
          columns={charityColumns}
          scroll={{ x: 'max-content' }}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default Donate;
