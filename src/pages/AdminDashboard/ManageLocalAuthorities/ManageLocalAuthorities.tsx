import { useState, useRef, FC } from 'react';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import { Button as SearchButton, Input, InputRef, Space, Table } from 'antd';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { ColumnType } from 'antd/es/table';
import { SearchOutlined, FilterFilled } from '@ant-design/icons';
import { GraphQLQuery } from 'aws-amplify/api';
import { Pill } from '@/components/Pill/Pill';
import Button from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
import { GetJoinRequestsQuery, GetLocalAuthoritiesQuery, LocalAuthority } from '@/types/api';
import dashboardStyles from '../AdminDashboard.module.scss';
import styles from './ManageLocalAuthorities.module.scss';
import Paths from '@/config/paths';

interface ManageLocalAuthoritiesProps {
  data?: GraphQLQuery<GetLocalAuthoritiesQuery & GetJoinRequestsQuery>;
  registered?: number;
  notRegistered?: number;
}

const ManageLocalAuthorities: FC<ManageLocalAuthoritiesProps> = ({
  registered,
  notRegistered,
  data,
}) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const navigate = useNavigate();

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
        />
        <Space>
          <SearchButton
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </SearchButton>
          <SearchButton
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </SearchButton>
          <SearchButton
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
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
            />
            <Button
              theme="link-blue"
              className={styles.actionButtons}
              text="Edit users"
              onClick={(): void => {
                navigate(Paths.ADMIN_DASHBOARD);
              }}
            />
          </div>
        ) : (
          <div className={styles.actionsContainer}>
            <Button
              theme="link-blue"
              className={styles.actionButtons}
              text="Add user"
              onClick={(): void => {
                navigate(`${Paths.ADMIN_DASHBOARD_SIGN_UP}?la=${la.name}`);
              }}
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
              return;
            }} // setShouldSignOut(true)}
          />
        </div>
      </div>
      <div className={dashboardStyles.body}>
        <BackButton onClick={(): void => navigate(Paths.ADMIN_DASHBOARD)} theme="white" />
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
      </div>
    </div>
  );
};

export default ManageLocalAuthorities;
