import { FC } from 'react';
import styles from './ManageCharities.module.scss';
import { Table } from 'antd';
import Button from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';

// Need to make this a protected route only for logged in users of type la.
const ManageCharities: FC = () => {
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
      <BackButton theme="blue" />
      <div className={styles.adminCard}>
        <h1>West Sussex</h1>
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
