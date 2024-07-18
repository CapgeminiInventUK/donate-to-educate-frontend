import BackButton from '@/components/BackButton/BackButton';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import { Pill } from '@/components/Pill/Pill';
import Spinner from '@/components/Spinner/Spinner';
import Paths from '@/config/paths';
import { getAdminPageRequests } from '@/graphql/composite';
import { client } from '@/graphqlClient';
import type { GetJoinRequestsQuery, GetLocalAuthoritiesQuery, LocalAuthority } from '@/types/api';
import { PillColours } from '@/types/data';
import getColumnSearch from '@/utils/tableUtils';
import { FilterFilled } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { type InputRef, Table } from 'antd';
import type { GraphQLQuery } from 'aws-amplify/api';
import { type FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardStyles from '../AdminDashboard.module.scss';
import styles from './ManageLocalAuthorities.module.scss';

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
        registered ? (
          <Pill colour={PillColours.BLUE} text="Joined" />
        ) : (
          <Pill colour={PillColours.RED} text="Not Joined" />
        ),
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
