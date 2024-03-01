import { useState, useRef, FC } from 'react';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import { Button as SearchButton, Input, InputRef, Space, Table } from 'antd';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { ColumnType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import { GraphQLQuery } from 'aws-amplify/api';
import { signOut } from 'aws-amplify/auth';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import Button from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
import Spinner from '@/components/Spinner/Spinner';
import { GetRegisteredSchoolsQuery, School } from '@/types/api';
import Paths from '@/config/paths';
import dashboardStyles from '../AdminDashboard.module.scss';
import styles from './ManageSchools.module.scss';
import { getRegisteredSchools } from '@/graphql/queries';

const ManageSchools: FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['registeredSchools'],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetRegisteredSchoolsQuery>>({
        query: getRegisteredSchools,
      });

      return data;
    },
  });

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

  const getColumnSearchProps = (dataIndex: keyof School): ColumnType<School> => ({
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
      return (record[dataIndex] ?? '')
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
      title: 'School',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Local Authority',
      dataIndex: 'localAuthority',
      ...getColumnSearchProps('localAuthority'),
    },
    {
      title: 'Action',
      render: () => (
        <div className={styles.actionsContainer}>
          <Button
            theme="link-blue"
            className={styles.actionButtons}
            text="Remove"
            onClick={(): void => undefined}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={dashboardStyles.container}>
      <div className={dashboardStyles.adminCard}>
        <div className={dashboardStyles.header}>
          <h1>Manage Schools</h1>
          <Button
            theme="link"
            text="Sign out"
            className={dashboardStyles.actionButtons}
            onClick={(): void => {
              void signOut()
                .then(() => navigate(Paths.LOGIN))
                // eslint-disable-next-line no-console
                .catch(console.error);
            }}
          />
        </div>
        <div className={dashboardStyles.body}>
          <BackButton theme="white" />
          {isLoading && <Spinner />}
          {!isLoading && (
            <div className={styles.cardContainer}>
              <div className={styles.schoolsCard}>
                <h1>Registered Schools</h1>
                <div className={styles.schoolBorder}>
                  {(data?.getRegisteredSchools ?? []).length} joined
                </div>
                <br />

                <Table
                  dataSource={data?.getRegisteredSchools ?? []}
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

export default ManageSchools;
