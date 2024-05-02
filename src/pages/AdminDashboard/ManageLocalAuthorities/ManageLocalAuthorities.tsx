import { useState, useRef, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputRef, Table } from 'antd';
import { FilterFilled } from '@ant-design/icons';
import { GraphQLQuery } from 'aws-amplify/api';
import { getAdminPageRequests } from '@/graphql/composite';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import { Pill } from '@/components/Pill/Pill';
import Button from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
import Spinner from '@/components/Spinner/Spinner';
import { GetJoinRequestsQuery, GetLocalAuthoritiesQuery, LocalAuthority } from '@/types/api';
import Paths from '@/config/paths';
import dashboardStyles from '../AdminDashboard.module.scss';
import styles from './ManageLocalAuthorities.module.scss';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Card from '@/components/Card/Card';
import getColumnSearch from '@/utils/tableUtils';

const ManageLocalAuthorities: FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const columnSearchProps = {
    dataIndex: 'name' as keyof LocalAuthority,
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn,
    searchInput,
    filterClassName: styles.filterIcon,
  };

  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['getLas'],
    queryFn: async () => {
      const { data } = await client.graphql<
        GraphQLQuery<GetLocalAuthoritiesQuery & GetJoinRequestsQuery>
      >({
        query: getAdminPageRequests,
      });

      return data;
    },
  });

  const { registered, notRegistered } =
    data?.getLocalAuthorities.reduce(
      (acc, la) => {
        if (la.registered) {
          acc.registered++;
        } else {
          acc.notRegistered++;
        }
        return acc;
      },
      {
        registered: 0,
        notRegistered: 0,
      }
    ) ?? {};

  const columns = [
    {
      title: 'Local authority',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearch(columnSearchProps),
    },
    {
      title: 'Status',
      dataIndex: 'registered',
      filters: [
        {
          text: 'Joined',
          value: true,
        },
        {
          text: 'Not Joined',
          value: false,
        },
      ],
      onFilter: (value: boolean | React.Key, record: LocalAuthority): boolean =>
        record.registered === value,
      filterIcon: (): JSX.Element => <FilterFilled className={styles.filterIcon} />,
      render: (registered: boolean): JSX.Element =>
        registered ? <Pill color="blue" text="Joined" /> : <Pill color="red" text="Not Joined" />,
    },
    {
      title: 'Action',
      align: 'center' as const,
      render: (_: unknown, la: LocalAuthority): JSX.Element | false =>
        !la.registered && (
          <div className={styles.actionsContainer}>
            <Button
              theme="link-blue"
              className={styles.actionButtons}
              text="Add user"
              onClick={(): void => {
                navigate(Paths.ADMIN_DASHBOARD_SIGN_UP, { state: { la: la.name, id: la.code } });
              }}
              ariaLabel="add user"
            />
          </div>
        ),
    },
  ];

  if (isError) {
    return <ErrorBanner />;
  }

  return (
    <div className={dashboardStyles.subContainer}>
      <BackButton theme="blue" />
      <div className={dashboardStyles.adminCard}>
        <div className={dashboardStyles.header}>
          <h1>Manage local authorities</h1>
        </div>
        <div className={dashboardStyles.subBody}>
          {isLoading && <Spinner />}
          {!isLoading && (
            <div className={styles.cardContainer}>
              <Card className={styles.lasCard}>
                <div className={styles.laBorder}>{registered} joined</div>
                <div className={styles.laBorder}>{notRegistered} to join</div>
                <br />

                <Table
                  className={styles.lasTable}
                  dataSource={data?.getLocalAuthorities}
                  columns={columns}
                  scroll={{ x: 'max-content' }}
                  rowKey="code"
                />
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageLocalAuthorities;
