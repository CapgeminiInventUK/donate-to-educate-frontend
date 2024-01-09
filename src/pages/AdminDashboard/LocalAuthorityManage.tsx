import { FC, useRef, useState } from 'react';
import styles from './LocalAuthorityManage.module.scss';
import Button from '@/components/Button/Button';
import { GetJoinRequestsQuery, GetLocalAuthoritiesQuery, LocalAuthority } from '@/types/api';
import { GraphQLQuery } from 'aws-amplify/api';
import { Pill } from '@/components/Pill/Pill';
import Highlighter from 'react-highlight-words';
import { Button as SearchButton, Input, Space, Table, InputRef } from 'antd';
import { SearchOutlined, FilterFilled } from '@ant-design/icons';
import { ColumnType, FilterConfirmProps } from 'antd/es/table/interface';

interface LocalAuthorityManageProps {
  name: string;
  setStage: React.Dispatch<React.SetStateAction<string>>;
  data?: GraphQLQuery<GetLocalAuthoritiesQuery & GetJoinRequestsQuery>;
  registered?: number;
  notRegistered?: number;
  setSelectedLa: React.Dispatch<React.SetStateAction<string>>;
}

const LocalAuthorityManage: FC<LocalAuthorityManageProps> = ({
  registered,
  notRegistered,
  data,
  setSelectedLa,
  setStage,
}) => {
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
                setSelectedLa(la.name);
                setStage('view_la_profile');
              }}
            />
            <Button
              theme="link-blue"
              className={styles.actionButtons}
              text="Edit users"
              onClick={(): void => {
                setStage('overview');
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
                setSelectedLa(la.name);
                setStage('la_sign_up');
              }}
            />
          </div>
        ),
    },
  ];

  return (
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
  );
};

export default LocalAuthorityManage;
