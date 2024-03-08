import { useState, useRef, FC } from 'react';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import { Button as SearchButton, Input, InputRef, Space, Table } from 'antd';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { ColumnType } from 'antd/es/table';
import { SearchOutlined, FilterFilled } from '@ant-design/icons';
import { GraphQLQuery } from 'aws-amplify/api';
import { signOut } from 'aws-amplify/auth';
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

const ManageLocalAuthorities: FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['la'],
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

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: string
  ): void => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void): void => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: keyof LocalAuthority): ColumnType<LocalAuthority> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
          aria-label="search input"
        />
        <Space>
          <SearchButton
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            aria-label="search"
          >
            Search
          </SearchButton>
          <SearchButton
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
            aria-label="reset"
          >
            Reset
          </SearchButton>
          <SearchButton
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
            aria-label="close"
          >
            Close
          </SearchButton>
        </Space>
      </div>
    ),
    filterIcon: () => <SearchOutlined className={styles.filterIcon} />,
    onFilter: (value, record): boolean => {
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase());
    },
    onFilterDropdownOpenChange: (visible): void => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Local authority',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
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
      filterIcon: () => <FilterFilled className={styles.filterIcon} />,
      render: (registered: boolean) =>
        registered ? <Pill color="blue" text="Joined" /> : <Pill color="red" text="Not Joined" />,
    },
    {
      title: 'Action',
      render: (_: unknown, la: LocalAuthority) =>
        la.registered ? (
          <div className={styles.actionsContainer}>
            <Button
              theme="link-blue"
              className={styles.actionButtons}
              text="View profile"
              onClick={(): void => {
                navigate(`${Paths.ADMIN_DASHBOARD_LA_VIEW}?la=${la.name}`);
              }}
              ariaLabel="view profile"
            />
            <Button
              theme="link-blue"
              className={styles.actionButtons}
              text="Edit users"
              onClick={(): void => {
                navigate(Paths.ADMIN_DASHBOARD);
              }}
              ariaLabel="edit users"
            />
          </div>
        ) : (
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

  return (
    <div className={dashboardStyles.container}>
      <div className={dashboardStyles.adminCard}>
        <div className={dashboardStyles.header}>
          <h1>Manage local authorities</h1>
          <Button
            theme="link"
            text="Sign out"
            className={dashboardStyles.actionButtons}
            onClick={(): void => {
              void signOut()
                .then(() => navigate(Paths.SIGN_IN))
                // eslint-disable-next-line no-console
                .catch(console.error);
            }}
            ariaLabel="sign out"
          />
        </div>
        <div className={dashboardStyles.body}>
          <BackButton theme="white" />
          {isLoading && <Spinner />}
          {!isLoading && (
            <div className={styles.cardContainer}>
              <div className={styles.lasCard}>
                <div className={styles.laBorder}>{registered} joined</div>
                <div className={styles.laBorder}>{notRegistered} to join</div>
                <br />

                <Table
                  className={styles.lasTable}
                  dataSource={data?.getLocalAuthorities}
                  columns={columns}
                  scroll={{ x: 'max-content' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageLocalAuthorities;
