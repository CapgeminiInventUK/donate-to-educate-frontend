import { JoinRequest, GetJoinRequestsQuery } from '@/types/api';
import styles from './JoinRequests.module.scss';
import Button from '@/components/Button/Button';
import { Input, InputRef, Space, Table, Button as SearchButton } from 'antd';
import { FC, useRef, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import Highlighter from 'react-highlight-words';
import { ColumnType, FilterConfirmProps } from 'antd/es/table/interface';
import { SearchOutlined, CaretUpFilled, CaretDownFilled } from '@ant-design/icons';

interface JoinRequestsProps {
  name: string;
  setStage: React.Dispatch<React.SetStateAction<string>>;
  data?: GetJoinRequestsQuery;
  setSelectedLa: React.Dispatch<React.SetStateAction<string>>;
}

const JoinRequests: FC<JoinRequestsProps> = ({ data, setStage }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

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

  const schools = data?.getJoinRequests.filter(({ type }) => type === 'school');
  const charities = data?.getJoinRequests.filter(({ type }) => type === 'charity');

  const getColumnSearchProps = (dataIndex: keyof JoinRequest): ColumnType<JoinRequest> => ({
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
  const baseColumns: ColumnsType<JoinRequest> = [
    {
      title: 'Local authority',
      dataIndex: 'localAuthority',
      sorter: (a, b) => a.localAuthority.localeCompare(b.localAuthority),
      sortIcon: ({ sortOrder }): JSX.Element => {
        return (
          <div className={styles.sorters}>
            <CaretUpFilled className={sortOrder === 'ascend' ? styles.sortActive : ''} />
            <CaretDownFilled className={sortOrder === 'descend' ? styles.sortActive : ''} />
          </div>
        );
      },
    },
    {
      title: 'Request time',
      dataIndex: 'requestTime',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.requestTime - b.requestTime,
      sortIcon: ({ sortOrder }): JSX.Element => {
        return (
          <div className={styles.sorters}>
            <CaretUpFilled className={sortOrder === 'ascend' ? styles.sortActive : ''} />
            <CaretDownFilled className={sortOrder === 'descend' ? styles.sortActive : ''} />
          </div>
        );
      },
      render: (text: number): JSX.Element => {
        return <>{new Date(text).toISOString()}</>;
      },
    },
    {
      title: 'Action',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (_: unknown, _joinRequest: JoinRequest) => (
        <div className={styles.actionsContainer}>
          <Button
            theme="link-blue"
            className={styles.actionButtons}
            text="View request"
            onClick={(): void => {
              setStage('overview');
            }}
          />
        </div>
      ),
    },
  ];
  const schoolColumns = [
    {
      title: 'School',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    ...baseColumns,
  ];
  const charityColumns = [
    {
      title: 'Charity',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    ...baseColumns,
  ];

  return (
    <>
      <p>
        View who has asked their local authorities to join Donate to Educate. You may give the local
        authority two working days to review a request before you do.
      </p>
      <Table
        title={() => (
          <>
            <h2 className={styles.tableTitle}>School</h2>
            {schools && getRequestsFromData<JoinRequest>(schools)}
          </>
        )}
        className={styles.schoolsTable}
        dataSource={schools}
        columns={schoolColumns}
        scroll={{ x: 'max-content' }}
      />

      <Table
        title={() => (
          <>
            <h2 className={styles.tableTitle}>Charities and volunteer groups</h2>
            {charities && getRequestsFromData<JoinRequest>(charities)}
          </>
        )}
        className={styles.schoolsTable}
        dataSource={charities}
        columns={charityColumns}
        scroll={{ x: 'max-content' }}
      />
    </>
  );
};

const getRequestsFromData = <T,>(data: T[]): JSX.Element => {
  const items = data.length;
  const text = items === 1 ? ' request' : ' requests';
  return (
    <span className={styles.requestsLeftBorder}>
      {items}
      {text}
    </span>
  );
};

export default JoinRequests;
