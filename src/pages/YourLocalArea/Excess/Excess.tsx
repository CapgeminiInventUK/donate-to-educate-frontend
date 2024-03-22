import { FC } from 'react';
import styles from './Excess.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { convertMetersToMiles, convertMilesToMeters } from '@/utils/distance';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { Charity, GetCharitiesNearbyQuery, GetSchoolsNearbyQuery, School } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/Spinner/Spinner';
import Button from '@/components/Button/Button';

const maxDistance = convertMilesToMeters(10);

const Excess: FC = () => {
  const { state, hasState } = useLocationStateOrRedirect<{ postcode: string }>(
    Paths.FIND_YOUR_COMMUNITY
  );
  const navigate = useNavigate();

  const { data: charityData, isLoading: charityLoading } = useQuery({
    queryKey: [`getCharitiesNearby-${state.postcode}-${maxDistance}`],
    enabled: hasState,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetCharitiesNearbyQuery>>({
        query: `query GetCharitiesNearby($postcode: String!, $distance: Float!) {
          getCharitiesNearby(postcode: $postcode, distance: $distance) {
            name
            distance
            id
          }
        }
        `,
        variables: {
          postcode: state.postcode,
          distance: maxDistance,
        },
      });

      return data;
    },
  });

  const { data: schoolData, isLoading: schoolLoading } = useQuery({
    queryKey: [`getSchoolsNearby-${state.postcode}-${maxDistance}`],
    enabled: hasState,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetSchoolsNearbyQuery>>({
        query: `query GetSchoolsNearby($postcode: String!, $distance: Float!) {
          getSchoolsNearby(postcode: $postcode, distance: $distance) {
            name
            distance
            urn
            registered
          }
        }
        `,
        variables: {
          postcode: state.postcode,
          distance: maxDistance,
        },
      });

      return data;
    },
  });

  if (charityLoading || schoolLoading || !hasState) {
    return <Spinner />;
  }

  const charityColumns: ColumnsType<Charity> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string, { id, name }: Charity) => (
        <Button
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
      title: 'Product Types Available',
      dataIndex: 'productTypes',
    },
  ];

  const schoolColumns: ColumnsType<School> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string, { urn, name, registered }: School) =>
        registered ? (
          <Button
            theme="link-blue"
            text={text}
            ariaLabel={`name-${text}`}
            onClick={() => navigate(Paths.SCHOOLS_DASHBOARD, { state: { urn, name } })}
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
  ];

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <div className={styles.subContainer}>
        <h2>Schools and charities with excess stock near {state.postcode.toUpperCase()}</h2>

        <h3>Schools</h3>
        <Table
          dataSource={schoolData?.getSchoolsNearby ?? []}
          columns={schoolColumns}
          scroll={{ x: 'max-content' }}
        />

        <h3>Charities</h3>
        <Table
          dataSource={charityData?.getCharitiesNearby ?? []}
          columns={charityColumns}
          scroll={{ x: 'max-content' }}
        />
      </div>
    </div>
  );
};

export default Excess;
