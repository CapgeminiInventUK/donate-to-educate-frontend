import { useState, useRef, FC } from 'react';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import { Button as SearchButton, Input, InputRef, Space, Table } from 'antd';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { ColumnType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import { GraphQLQuery } from 'aws-amplify/api';
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
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import Card from '@/components/Card/Card';

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
      ...getColumnSearchProps('localAuthority'),
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
    <div className={dashboardStyles.container}>
      <BackButton theme="blue" />
      <div className={dashboardStyles.adminCard}>
        <div className={dashboardStyles.header}>
          <h1>Manage Schools</h1>
          <LogoutButton />
        </div>
        <div className={dashboardStyles.body}>
          {isLoading && <Spinner />}
          {!isLoading && (
            <div className={styles.cardContainer}>
              <Card className={styles.schoolsCard}>
                <h1>Registered Schools</h1>
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
