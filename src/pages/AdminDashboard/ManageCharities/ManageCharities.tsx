import { FC } from 'react';
// import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
// import { FilterConfirmProps } from 'antd/es/table/interface';
// import { ColumnType } from 'antd/es/table';
// import { SearchOutlined, FilterFilled } from '@ant-design/icons';
// import { GraphQLQuery } from 'aws-amplify/api';
import { signOut } from 'aws-amplify/auth';
// import { getAdminPageRequests } from '@/graphql/composite';
// import { client } from '@/graphqlClient';
// import { useQuery } from '@tanstack/react-query';
// import { Pill } from '@/components/Pill/Pill';
import Button from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
import Spinner from '@/components/Spinner/Spinner';
// import { GetJoinRequestsQuery, GetLocalAuthoritiesQuery, LocalAuthority } from '@/types/api';
import Paths from '@/config/paths';
import dashboardStyles from '../AdminDashboard.module.scss';
import styles from './ManageCharities.module.scss';

const ManageCharities: FC = () => {
  // const [searchText, setSearchText] = useState('');
  // const [searchedColumn, setSearchedColumn] = useState('');
  // const searchInput = useRef<InputRef>(null);

  const navigate = useNavigate();

  // const { data, isLoading } = useQuery({
  //   queryKey: ['charities'],
  //   queryFn: async () => {
  //     const { data } = await client.graphql<
  //       GraphQLQuery<GetLocalAuthoritiesQuery & GetJoinRequestsQuery>
  //     >({
  //       query: getAdminPageRequests,
  //     });

  //     return data;
  //   },
  // });

  // const handleSearch = (
  //   selectedKeys: string[],
  //   confirm: (param?: FilterConfirmProps) => void,
  //   dataIndex: string
  // ): void => {
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex);
  // };

  // const handleReset = (clearFilters: () => void): void => {
  //   clearFilters();
  //   setSearchText('');
  // };

  // const getColumnSearchProps = (dataIndex: keyof LocalAuthority): ColumnType<LocalAuthority> => ({
  //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
  //     <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
  //       <Input
  //         ref={searchInput}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
  //         onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
  //         style={{ marginBottom: 8, display: 'block' }}
  //       />
  //       <Space>
  //         <SearchButton
  //           type="primary"
  //           onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Search
  //         </SearchButton>
  //         <SearchButton
  //           onClick={() => clearFilters && handleReset(clearFilters)}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Reset
  //         </SearchButton>
  //         <SearchButton
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             close();
  //           }}
  //         >
  //           Close
  //         </SearchButton>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: () => <SearchOutlined className={styles.filterIcon} />,
  //   onFilter: (value, record): boolean => {
  //     return record[dataIndex]
  //       .toString()
  //       .toLowerCase()
  //       .includes((value as string).toLowerCase());
  //   },
  //   onFilterDropdownOpenChange: (visible): void => {
  //     if (visible) {
  //       setTimeout(() => searchInput.current?.select(), 100);
  //     }
  //   },
  //   render: (text: string) =>
  //     searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ''}
  //       />
  //     ) : (
  //       text
  //     ),
  // });

  const columns = [
    {
      title: 'Charity',
      dataIndex: 'name',
      key: 'name',
      // ...getColumnSearchProps('name'),
    },
    {
      title: 'Local Authority',
      dataIndex: 'localAuthority',
      // ...getColumnSearchProps('localAuthority'),
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
            ariaLabel="remove"
          />
        </div>
      ),
    },
  ];

  return (
    <div className={dashboardStyles.container}>
      <div className={dashboardStyles.adminCard}>
        <div className={dashboardStyles.header}>
          <h1>Manage charities</h1>
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
            ariaLabel="sign out"
          />
        </div>
        <div className={dashboardStyles.body}>
          <BackButton theme="white" />
          {false && <Spinner />}
          {true && (
            <div className={styles.cardContainer}>
              <h1>Registered charities and volunteer groups</h1>
              <div className={styles.charitiesCard}>
                <div className={styles.charitiesBorder}>0 joined</div>
                <br />

                <Table dataSource={[]} columns={columns} scroll={{ x: 'max-content' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCharities;
