import { FC } from 'react';
import styles from './LocalAuthorityManage.module.scss';
import Button from '@/components/Button/Button';
import { GetJoinRequestsQuery, GetLocalAuthoritiesQuery, LocalAuthority } from '@/types/api';
import { GraphQLQuery } from 'aws-amplify/api';
import { Pill } from '@/components/Pill/Pill';
import { Table } from 'antd';

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
  const columns = [
    {
      title: 'Local authority',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'registered',
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
