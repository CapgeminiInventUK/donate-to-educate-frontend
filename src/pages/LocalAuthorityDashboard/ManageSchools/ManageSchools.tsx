import { FC } from 'react';
import styles from './ManageSchools.module.scss';
import { Table } from 'antd';
import Button from '@/components/Button/Button';

const ManageSchools: FC = () => {
  const columns = [
    {
      title: 'School',
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
      <div className={styles.adminCard}>
        <h1>West Sussex</h1>
        <div className={styles.body}>
          <div className={styles.card}>
            <h2>Schools in your area</h2>
            <div className={styles.borderLeft}>
              <div>1 pending request</div>
              <div>5 joined</div>
              <div>147 to join</div>
            </div>
            <Table dataSource={[]} columns={columns} scroll={{ x: 'max-content' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSchools;
