import { FC } from 'react';
import { Table } from 'antd';
import Button from '@/components/Button/Button';
import styles from '../ManageSchools.module.scss';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import { StageState, SchoolOrCharityTableData } from '@/types/data';
import { Pill } from '@/components/Pill/Pill';
import { SchoolsOrCharityTableProps } from '@/types/props';

const SchoolsTable: FC<SchoolsOrCharityTableProps> = ({ data, setStage, setProperties }) => {
  const navigate = useNavigate();
  const columns = [
    {
      title: 'School',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, { urn, name, status }: SchoolOrCharityTableData): JSX.Element => {
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
      align: 'center' as const,
      render: (
        _: string,
        { status, name, id, joinRequestName, phone, email, jobTitle, urn }: SchoolOrCharityTableData
      ): JSX.Element => {
        return status.toLowerCase() === 'joined' ? (
          <div className={styles.actionsContainer}>
            <Button
              theme="link-blue"
              className={styles.actionButtons}
              text="Remove"
              onClick={(): void => {
                setProperties &&
                  setProperties((schoolProperties) => ({
                    ...schoolProperties,
                    name,
                    id: String(urn),
                    user: {
                      name: joinRequestName ?? '',
                      title: jobTitle ?? '',
                      email: email ?? '',
                      phone: phone ?? '',
                    },
                  }));
                setStage && setStage(StageState.REMOVE);
              }}
              ariaLabel="remove"
            />
          </div>
        ) : (
          <Button
            theme="link-blue"
            className={styles.actionButtons}
            text="View request"
            onClick={(): void => {
              setProperties &&
                setProperties((schoolProperties) => ({
                  ...schoolProperties,
                  name,
                  id: String(id),
                  user: {
                    name: joinRequestName ?? '',
                    title: jobTitle ?? '',
                    email: email ?? '',
                    phone: phone ?? '',
                  },
                }));
              setStage && setStage(StageState.APPROVE_SCHOOL);
            }}
            ariaLabel="view"
          />
        );
      },
    },
  ];

  return (
    <>
      <Table dataSource={data} columns={columns} scroll={{ x: 'max-content' }} rowKey="urn" />
    </>
  );
};
export default SchoolsTable;
