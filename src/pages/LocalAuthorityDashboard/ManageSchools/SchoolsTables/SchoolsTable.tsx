import { FC } from 'react';
import { Table } from 'antd';
import Button from '@/components/Button/Button';
import styles from '../ManageSchools.module.scss';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import { SchoolTableData, SchoolsTableProps } from '@/types/data';
import { Pill } from '@/components/Pill/Pill';

const SchoolsTable: FC<SchoolsTableProps> = ({ data }) => {
  const navigate = useNavigate();
  const columns = [
    {
      title: 'School',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, { urn, name, status }: SchoolTableData): JSX.Element => {
        return status.toLowerCase() === 'joined' ? (
          <Button
            theme="link-blue"
            text={text}
            ariaLabel={`name-${text}`}
            onClick={() => navigate(Paths.SCHOOLS_DASHBOARD, { state: { urn, name } })}
          />
        ) : (
          <>{text}</>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text: string) => (
        <Pill text={text} color={text.toLowerCase() === 'pending' ? 'green' : 'blue'} />
      ),
    },
    {
      title: 'Action',
      render: (_: string, { status }: SchoolTableData): JSX.Element => {
        return status.toLowerCase() === 'joined' ? (
          <div className={styles.actionsContainer}>
            <Button
              theme="link-blue"
              className={styles.actionButtons}
              text="Remove"
              onClick={(): void => undefined}
              ariaLabel="remove"
            />
          </div>
        ) : (
          <Button
            theme="link-blue"
            className={styles.actionButtons}
            text="View request"
            onClick={(): void => undefined}
            ariaLabel="view"
          />
        );
      },
    },
  ];
  return (
    <>
      <Table dataSource={data} columns={columns} scroll={{ x: 'max-content' }} />
    </>
  );
};
export default SchoolsTable;
