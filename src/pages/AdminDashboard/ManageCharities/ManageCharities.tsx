import BackButton from '@/components/BackButton/BackButton';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Spinner from '@/components/Spinner/Spinner';
import Paths from '@/config/paths';
import { getCharities } from '@/graphql/queries';
import { client } from '@/graphqlClient';
import type { Charity, GetCharitiesQuery } from '@/types/api';
import getColumnSearch from '@/utils/tableUtils';
import { useQuery } from '@tanstack/react-query';
import { type InputRef, Table } from 'antd';
import type { GraphQLQuery } from 'aws-amplify/api';
import { type FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardStyles from '../AdminDashboard.module.scss';
import styles from './ManageCharities.module.scss';

const ManageCharities: FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['registeredCharities'],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetCharitiesQuery>>({
        query: getCharities,
      });

      return data;
    },
  });

  const columnSearchProps = {
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn,
    searchInput,
    filterClassName: styles.filterIcon,
  };

  const charityColumnSearchProps = {
    dataIndex: 'name' as keyof Charity,
    ...columnSearchProps,
  };

  const laColumnSearchProps = {
    dataIndex: 'localAuthority' as keyof Charity,
    ...columnSearchProps,
  };

  const columns = [
    {
      title: 'Charity',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearch<Charity>(charityColumnSearchProps),
      render: (text: string, { id, name }: Charity): JSX.Element => (
        <Button
          theme="link-blue-bold"
          text={text}
          ariaLabel={`name-${text}`}
          onClick={() => navigate(Paths.CHARITY_DASHBOARD, { state: { id, name } })}
        />
      ),
    },
    {
      title: 'Local Authority',
      dataIndex: 'localAuthority',
      ...getColumnSearch<Charity>(laColumnSearchProps),
    },
    // {
    //   title: 'Action',
    //   align: 'center' as const,
    //   render: () => (
    //     <div className={styles.actionsContainer}>
    //       <Button
    //         theme="link-blue"
    //         className={styles.actionButtons}
    //         text="Remove"
    //         onClick={(): void => undefined}
    //         ariaLabel="remove"
    //       />
    //     </div>
    //   ),
    // },
  ];

  if (isError) {
    return <ErrorBanner />;
  }

  return (
    <div className={dashboardStyles.subContainer}>
      <BackButton theme="blue" />
      <div className={dashboardStyles.adminCard}>
        <div className={dashboardStyles.header}>
          <h1>Manage Charities</h1>
        </div>
        <div className={dashboardStyles.subBody}>
          {isLoading && <Spinner />}
          {!isLoading && (
            <div className={styles.cardContainer}>
              <Card className={styles.manageCard}>
                <h2>Registered charities and volunteer groups</h2>
                <div className={styles.border}>{(data?.getCharities ?? []).length} joined</div>
                <br />

                <Table
                  dataSource={data?.getCharities ?? []}
                  columns={columns}
                  scroll={{ x: 'max-content' }}
                  rowKey="id"
                />
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCharities;
