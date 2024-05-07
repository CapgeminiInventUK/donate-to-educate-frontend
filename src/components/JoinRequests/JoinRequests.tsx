import { FC, useRef, useState } from 'react';
import { InputRef, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CaretUpFilled, CaretDownFilled } from '@ant-design/icons';
import { JoinRequest } from '@/types/api';
import Button from '@/components/Button/Button';
import styles from './JoinRequests.module.scss';
import dayjs from 'dayjs';
import { StageState } from '@/types/data';
import { JoinRequestsProps } from '@/types/props';
import getColumnSearch from '@/utils/tableUtils';

const JoinRequests: FC<JoinRequestsProps> = ({ data, setStage, setSchoolOrCharityProperties }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const schools = data?.getJoinRequests.filter(({ type }) => type === 'school');
  const charities = data?.getJoinRequests.filter(({ type }) => type === 'charity');

  const columnSearchProps = {
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn,
    searchInput,
    filterClassName: styles.filterIcon,
  };

  const schoolColumnSearchProps = {
    dataIndex: 'school' as keyof JoinRequest,
    ...columnSearchProps,
  };

  const charityColumnSearchProps = {
    dataIndex: 'charityName' as keyof JoinRequest,
    ...columnSearchProps,
  };

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
      align: 'center' as const,
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
                ...(joinRequest.urn && { urn: joinRequest.urn }),
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
                  ? StageState.APPROVE_SCHOOL
                  : StageState.APPROVE_CHARITY
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
      ...getColumnSearch<JoinRequest>(schoolColumnSearchProps),
    },
    ...baseColumns,
  ];
  const charityColumns = [
    {
      title: 'Charity',
      dataIndex: 'charityName',
      key: 'charityName',
      ...getColumnSearch<JoinRequest>(charityColumnSearchProps),
    },
    ...baseColumns,
  ];

  return (
    <>
      <p className={styles.info}>
        View who has asked their local authorities to join Donate to Educate. You may give the local
        authority two working days to review a request before you do.
      </p>
      <Table
        title={() => (
          <div className={styles.titleContainer}>
            <h2 className={styles.tableTitle}>School</h2>
            {schools && getRequestsFromData<JoinRequest>(schools)}
          </div>
        )}
        className={styles.schoolsTable}
        dataSource={schools}
        columns={schoolColumns}
        scroll={{ x: 'max-content' }}
        rowKey="id"
      />
      <br />
      <Table
        title={() => (
          <div className={styles.titleContainer}>
            <h2 className={styles.tableTitle}>Charities and volunteer groups</h2>
            {charities && getRequestsFromData<JoinRequest>(charities)}
          </div>
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
