import { JoinRequest, GetJoinRequestsQuery } from '@/types/api';
import styles from './JoinRequests.module.scss';
import Button from '@/components/Button/Button';
import { Table } from 'antd';
import { FC } from 'react';

interface JoinRequestsProps {
  name: string;
  setStage: React.Dispatch<React.SetStateAction<string>>;
  setSchoolOrCharityName: React.Dispatch<React.SetStateAction<string>>;
  data?: GetJoinRequestsQuery;
  setSelectedLa: React.Dispatch<React.SetStateAction<string>>;
}

const JoinRequests: FC<JoinRequestsProps> = ({ data, setStage, setSchoolOrCharityName }) => {
  const schools = data?.getJoinRequests.filter(({ type }) => type === 'school');
  const charities = data?.getJoinRequests.filter(({ type }) => type === 'charity');

  const baseColumns = [
    {
      title: 'Local authority',
      dataIndex: 'localAuthority',
    },
    {
      title: 'Request time',
      dataIndex: 'requestTime',
    },
    {
      title: 'Action',
      render: (_: unknown, joinRequest: JoinRequest) => (
        <div className={styles.actionsContainer}>
          <Button
            theme="link-blue"
            className={styles.actionButtons}
            text={`View request`}
            onClick={(): void => {
              setSchoolOrCharityName(joinRequest.name);
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
      dataIndex: 'name',
      key: 'name',
    },
    ...baseColumns,
  ];
  const charityColumns = [
    {
      title: 'Charity',
      dataIndex: 'name',
      key: 'name',
    },
    ...baseColumns,
  ];

  return (
    <>
      <Table
        className={styles.schoolsTable}
        dataSource={schools}
        columns={schoolColumns}
        scroll={{ x: 'max-content' }}
      />

      <Table
        className={styles.schoolsTable}
        dataSource={charities}
        columns={charityColumns}
        scroll={{ x: 'max-content' }}
      />
    </>
  );
};

export default JoinRequests;
