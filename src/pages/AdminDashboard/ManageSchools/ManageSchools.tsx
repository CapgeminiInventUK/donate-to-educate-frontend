import BackButton from '@/components/BackButton/BackButton';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Spinner from '@/components/Spinner/Spinner';
import Paths from '@/config/paths';
import { getRegisteredSchools } from '@/graphql/queries';
import { client } from '@/graphqlClient';
import type { GetRegisteredSchoolsQuery, School } from '@/types/api';
import getColumnSearch from '@/utils/tableUtils';
import { useQuery } from '@tanstack/react-query';
import { type InputRef, Table } from 'antd';
import type { GraphQLQuery } from 'aws-amplify/api';
import { type FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardStyles from '../AdminDashboard.module.scss';
import styles from './ManageSchools.module.scss';

const ManageSchools: FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['registeredSchools'],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetRegisteredSchoolsQuery>>({
        query: getRegisteredSchools,
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

  const schoolColumnSearchProps = {
    dataIndex: 'school' as keyof School,
    ...columnSearchProps,
  };

  const laColumnSearchProps = {
    dataIndex: 'localAuthority' as keyof School,
    ...columnSearchProps,
  };

  const columns = [
    {
      title: 'School',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearch<School>(schoolColumnSearchProps),
      render: (text: string, { urn, name }: School): JSX.Element => (
        <Button
          theme="link-blue-bold"
          text={text}
          ariaLabel={`name-${text}`}
          onClick={() => navigate(Paths.SCHOOLS_DASHBOARD, { state: { urn, name } })}
        />
      ),
    },
    {
      title: 'Local Authority',
      dataIndex: 'localAuthority',
      ...getColumnSearch<School>(laColumnSearchProps),
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
          <h1>Manage Schools</h1>
        </div>
        <div className={dashboardStyles.subBody}>
          {isLoading && <Spinner />}
          {!isLoading && (
            <div className={styles.cardContainer}>
              <Card className={styles.schoolsCard}>
                <h2>Registered Schools</h2>
                <div className={styles.schoolBorder}>
                  {(data?.getRegisteredSchools ?? []).length} joined
                </div>
                <br />

                <Table
                  dataSource={data?.getRegisteredSchools ?? []}
                  columns={columns}
                  scroll={{ x: 'max-content' }}
                  rowKey="urn"
                />
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageSchools;
