import { FC, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Input, InputRef, Space, Table, Button as SearchButton } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ColumnType, FilterConfirmProps } from 'antd/es/table/interface';
import { SearchOutlined, CaretUpFilled, CaretDownFilled } from '@ant-design/icons';
import { JoinRequest, GetJoinRequestsQuery } from '@/types/api';
import Button from '@/components/Button/Button';
import styles from './JoinRequests.module.scss';
import { SchoolOrCharityProperties } from '../../AdminDashboard';
import dayjs from 'dayjs';

interface JoinRequestsProps {
  setStage: React.Dispatch<React.SetStateAction<string>>;
  setSchoolOrCharityProperties: React.Dispatch<React.SetStateAction<SchoolOrCharityProperties>>;
  data?: GetJoinRequestsQuery;
}

const JoinRequests: FC<JoinRequestsProps> = ({ data, setStage, setSchoolOrCharityProperties }) => {
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
        return <>{dayjs(text).format('HH:MM DD MMMM YYYY')}</>;
      },
    },
    {
      title: 'Action',
      render: (_: unknown, joinRequest: JoinRequest) => (
        <div className={styles.actionsContainer}>
          <Button
            ariaLabel="view request"
            theme="link-blue"
            className={styles.actionButtons}
            text={`View request`}
            onClick={(): void => {
              setSchoolOrCharityProperties({
                id: joinRequest.id,
                name:
                  (joinRequest.type === 'school' ? joinRequest.school : joinRequest.charityName) ??
                  '',
                la: joinRequest.localAuthority,
                user: {
                  name: joinRequest.name,
                  title: joinRequest.jobTitle ?? '',
                  email: joinRequest.email,
                  phone: joinRequest.phone ?? '',
                },
                ...(joinRequest.charityName && {
                  charity: {
                    mainAddress: joinRequest.charityAddress ?? '',
                    about: joinRequest.aboutCharity ?? '',
                  },
                }),
              });
              setStage(
                joinRequest.type === 'school'
                  ? 'request_approval_school'
                  : 'request_approval_charity'
              );
            }}
          />
        </div>
      ),
    },
  ];
  const schoolColumns = [
    {
      title: 'School',
      dataIndex: 'school',
      key: 'school',
      ...getColumnSearchProps('school'),
    },
    ...baseColumns,
  ];
  const charityColumns = [
    {
      title: 'Charity',
      dataIndex: 'charityName',
      key: 'charityName',
      ...getColumnSearchProps('charityName'),
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
        rowKey="id"
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
        rowKey="id"
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
