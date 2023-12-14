import { GetJoinRequest, GetJoinRequestsQuery } from '@/types/api';
import styles from './JoinRequests.module.scss';
import Button from '@/components/Button/Button';
import { Table } from 'antd';
import { FC } from 'react';

interface JoinRequestsProps {
  name: string;
  setStage: React.Dispatch<React.SetStateAction<string>>;
  data?: GetJoinRequestsQuery;
  setSelectedLa: React.Dispatch<React.SetStateAction<string>>;
}

const JoinRequests: FC<JoinRequestsProps> = ({ data, setStage }) => {
  const columns = [
    {
      title: 'School',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Local authority',
    },
    {
      title: 'Request time',
      dataIndex: 'requestTime',
    },
    {
      title: 'Action',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (_: unknown, _joinRequest: GetJoinRequest) => (
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

  return (
    <>
      <Table className={styles.schoolsTable} dataSource={data?.getJoinRequests} columns={columns} />
    </>
  );
};

export default JoinRequests;
