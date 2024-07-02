import { FC, useRef, useState } from 'react';
import { InputRef, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { JoinRequest } from '@/types/api';
import Button from '@/components/Button/Button';
import styles from '../JoinRequests.module.scss';
import './antDesignOverrides.scss';
import dayjs from 'dayjs';
import { StageState } from '@/types/data';
import { JoinRequestsTableProps } from '@/types/props';
import getColumnSearch from '@/utils/tableUtils';
import { getRequestsFromData, getSortIcon } from './utils';
import {
  checkForStringAndReturnEmptyIfFalsy,
  sortAlphabetically,
  sortByNumber,
} from '@/utils/globals';

const JoinRequestsTable: FC<JoinRequestsTableProps> = ({
  setStage,
  setSchoolOrCharityProperties,
  title,
  dataIndex,
  data,
  h2,
}) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const columnSearchProps = {
    dataIndex: dataIndex as keyof JoinRequest,
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn,
    searchInput,
    filterClassName: styles.filterIcon,
  };

  const columns: ColumnsType<JoinRequest> = [
    {
      title,
      dataIndex,
      key: dataIndex,
      ...getColumnSearch<JoinRequest>(columnSearchProps),
    },
    {
      title: 'Local authority',
      dataIndex: 'localAuthority',
      sorter: (a, b) => sortAlphabetically(a.localAuthority, b.localAuthority),
      sortIcon: getSortIcon,
    },
    {
      title: 'Request time',
      dataIndex: 'requestTime',
      defaultSortOrder: 'descend',
      sorter: (a, b) => sortByNumber(a.requestTime, b.requestTime),
      sortIcon: getSortIcon,
      render: (text: number): JSX.Element => {
        return <>{dayjs(text).format('HH:mm DD MMMM YYYY')}</>;
      },
    },
    {
      title: 'Action',
      align: 'center',
      render: (
        _: unknown,
        {
          id,
          type,
          school,
          charityName,
          localAuthority,
          urn,
          name,
          jobTitle,
          email,
          phone,
          charityAddress,
          aboutCharity,
        }: JoinRequest
      ) => (
        <div className={styles.actionsContainer}>
          <Button
            ariaLabel="view request"
            theme="link-blue"
            className={styles.actionButtons}
            text={`View request`}
            onClick={(): void => {
              setSchoolOrCharityProperties({
                id: id,
                name: checkForStringAndReturnEmptyIfFalsy(type === 'school' ? school : charityName),
                la: localAuthority,
                ...(urn && { urn: urn }),
                user: {
                  name: name,
                  title: checkForStringAndReturnEmptyIfFalsy(jobTitle),
                  email: email,
                  phone: checkForStringAndReturnEmptyIfFalsy(phone),
                },
                ...(charityName && {
                  charity: {
                    charityAddress: checkForStringAndReturnEmptyIfFalsy(charityAddress),
                    aboutCharity: checkForStringAndReturnEmptyIfFalsy(aboutCharity),
                  },
                }),
              });
              setStage(type === 'school' ? StageState.APPROVE_SCHOOL : StageState.APPROVE_CHARITY);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        title={() => (
          <div className={styles.titleContainer}>
            <h2 className={styles.tableTitle}>{h2}</h2>
            {data && getRequestsFromData<JoinRequest>(data)}
          </div>
        )}
        className={styles.schoolsTable}
        dataSource={data}
        columns={columns}
        scroll={{ x: 'max-content' }}
        rowKey="id"
      />
      {title === 'School' && <br />}
    </>
  );
};

export default JoinRequestsTable;