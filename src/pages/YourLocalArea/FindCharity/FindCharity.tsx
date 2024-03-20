import { FC } from 'react';
import styles from './FindCharity.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { convertMetersToMiles, convertMilesToMeters } from '@/utils/distance';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import { Charity, GetCharitiesNearbyQuery } from '@/types/api';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/Spinner/Spinner';
import Button from '@/components/Button/Button';

const maxDistance = convertMilesToMeters(10);

const FindCharity: FC = () => {
  const { state, hasState } = useLocationStateOrRedirect<{ postcode: string }>(
    Paths.FIND_YOUR_COMMUNITY
  );
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
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

  if (isLoading || !hasState) {
    return <Spinner />;
  }

  const columns: ColumnsType<Charity> = [
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

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <div className={styles.subContainer}>
        <h2>Find charities near {state.postcode.toUpperCase()}</h2>

        <Table
          dataSource={data?.getCharitiesNearby ?? []}
          columns={columns}
          scroll={{ x: 'max-content' }}
        />
      </div>
    </div>
  );
};

export default FindCharity;
