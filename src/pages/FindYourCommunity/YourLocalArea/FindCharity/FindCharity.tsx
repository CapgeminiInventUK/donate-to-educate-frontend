import { FC } from 'react';
import styles from './FindCharity.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { convertMetersToMiles, convertMilesToMeters } from '@/utils/distance';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import { GetCharitiesNearbyWithProfileQuery, InstituteSearchResult } from '@/types/api';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/Spinner/Spinner';
import Button from '@/components/Button/Button';
import { getCharitiesNearbyWithProfile } from '@/graphql/queries';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import ProductTypeIcon from '@/components/ProductTypeIcon/ProductTypeIcon';
import Card from '@/components/Card/Card';
import NoLocalOrganisations from '@/components/NoLocalOrganisations/NoLocalOrganisations';
import { convertNumberToCategory } from '@/components/ItemList/getFullItemList';

const maxDistance = convertMilesToMeters(10);

const FindCharity: FC = () => {
  const { state, hasState } = useLocationStateOrRedirect<{ postcode: string }>(
    Paths.FIND_YOUR_COMMUNITY
  );
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: [`getCharitiesNearby-${state.postcode}-${maxDistance}-request`],
    enabled: hasState,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetCharitiesNearbyWithProfileQuery>>({
        query: getCharitiesNearbyWithProfile,
        variables: {
          postcode: state.postcode,
          distance: maxDistance,
          type: 'request',
        },
      });

      return data;
    },
  });

  if (isLoading || !hasState) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorBanner />;
  }

  const columns: ColumnsType<InstituteSearchResult> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string, { id, name }: InstituteSearchResult) => (
        <Button
          key={id}
          className={styles.nameBtn}
          theme="link-blue-bold"
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
      title: 'Product types available',
      dataIndex: 'productTypes',
      render: (text: number[]) =>
        text.map((productType) => <ProductTypeIcon key={productType} productType={productType} />),
      filters: Array.from(Array(5)).map((_, index) => ({
        text: convertNumberToCategory(index),
        value: index,
      })),
      onFilter: (value, record): boolean => record.productTypes.includes(Number(value)),
    },
  ];

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <Card>
        <h2>Find charities near {state.postcode.toUpperCase()}</h2>
        <Table
          dataSource={data?.getCharitiesNearbyWithProfile ?? []}
          columns={columns}
          scroll={{ x: 'max-content' }}
          rowKey="id"
          locale={{
            emptyText: <NoLocalOrganisations />,
          }}
        />
      </Card>
    </div>
  );
};

export default FindCharity;
