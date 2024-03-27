import { FC } from 'react';
import styles from './ManageCharities.module.scss';
import { Table } from 'antd';
import Button from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import Paths from '@/config/paths';

const ManageCharities: FC = () => {
  const {
    state: { localAuthority },
  } = useLocationStateOrRedirect<{ localAuthority: string }>(Paths.LOCAL_AUTHORITY_DASHBOARD);

  const columns = [
    {
      title: 'Charity',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
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
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <BackButton theme="blue" />
        <LogoutButton />
      </div>
      <div className={styles.adminCard}>
        <h1>{localAuthority}</h1>
        <div className={styles.body}>
          <div className={styles.card}>
            <h2>Charity and volunteer groups in your area</h2>
            <div className={styles.borderLeft}>
              <div>3 requests to join</div>
              <div>5 joined</div>
            </div>
            <Table dataSource={[]} columns={columns} scroll={{ x: 'max-content' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCharities;
