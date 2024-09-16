import { useState, useRef, FC, Key } from 'react';
import { InputRef, Popover, Table } from 'antd';
import { FilterFilled } from '@ant-design/icons';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import BackButton from '@/components/BackButton/BackButton';
import Spinner from '@/components/Spinner/Spinner';
import minusIcon from '@/assets/icons/minusIcon.svg';
import tickIcon from '@/assets/icons/tickIcon.svg';
import { GetLocalAuthoritiesQuery, LocalAuthority } from '@/types/api';
import dashboardStyles from '../AdminDashboard.module.scss';
import styles from './ManageLocalAuthorities.module.scss';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Card from '@/components/Card/Card';
import getColumnSearch from '@/utils/tableUtils';
import Crown from '@/assets/icons/Crown';
import Paths from '@/config/paths';
import { getLocalAuthorities } from '@/graphql/queries';
import { useNavigate } from 'react-router-dom';

const ManageLocalAuthorities: FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const dashboardLink = Paths.ADMIN_DASHBOARD_LA_VIEW_USERS;

  const columnSearchProps = {
    dataIndex: 'name' as keyof LocalAuthority,
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn,
    searchInput,
    filterClassName: styles.filterIcon,
    dashboardLink,
    buttonClassName: styles.nameBtn,
    navigate,
    isLocalAuthority: true,
  };

  const {
    data: localAuthoritiesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['las'],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetLocalAuthoritiesQuery>>({
        query: getLocalAuthorities,
      });
      return data;
    },
  });

  if (isError) {
    return <ErrorBanner />;
  }

  const localAuthorities =
    localAuthoritiesData?.getLocalAuthorities.map((la) => ({
      ...la,
      id: la.code,
      registeredSchools: la?.registeredSchools,
      registeredCharities: la?.registeredCharities,
    })) ?? [];

  const { registered, notRegistered } =
    localAuthoritiesData?.getLocalAuthorities?.reduce(
      (acc, { registered }) => {
        registered ? acc.registered++ : acc.notRegistered++;
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
      onFilter: (value: boolean | Key, { registered }: LocalAuthority): boolean =>
        registered === value,
      filterIcon: (): JSX.Element => <FilterFilled className={styles.filterIcon} />,
      render: (registered: boolean): JSX.Element =>
        registered ? (
          <Popover
            content={'Joined'}
            trigger="hover"
            className={`${styles.status} ${styles.joined}`}
          >
            <span>
              <img src={tickIcon} alt="Joined" />
            </span>
          </Popover>
        ) : (
          <Popover content={'Not joined'} trigger="hover" className={styles.status}>
            <span>
              <img src={minusIcon} alt="Not joined" />
            </span>
          </Popover>
        ),
    },
    {
      title: 'Schools',
      align: 'center' as const,
      render: ({ registeredSchools, registered }: LocalAuthority): JSX.Element | null => {
        return registered ? (
          <div className={styles.actionsContainer}>{registeredSchools}</div>
        ) : null;
      },
    },
    {
      title: 'Charities',
      align: 'center' as const,
      render: ({ registered, registeredCharities }: LocalAuthority): JSX.Element | null => {
        return registered ? (
          <div className={styles.actionsContainer}>{registeredCharities}</div>
        ) : null;
      },
    },
  ];

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
                <Crown />
                <h2>View, add and edit your local authorities</h2>
                <div className={styles.numberJoinedArea}>
                  <h4>
                    <span className={styles.amount}>{registered}</span>{' '}
                    {notRegistered && `out of ${notRegistered}`}
                  </h4>
                  <div className={styles.subBody}>
                    local authorities have joined Donate to Educate.
                  </div>
                </div>
                <br />
                <Table
                  className={styles.lasTable}
                  dataSource={localAuthorities}
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
