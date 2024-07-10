import { FC } from 'react';
import { Table, Popover } from 'antd';
import Button from '@/components/Button/Button';
import styles from '../ManageSchools.module.scss';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import { StageState, SchoolOrCharityTableData } from '@/types/data';
import { SchoolsOrCharityTableProps } from '@/types/props';
import tickIcon from '@/assets/icons/tickIcon.svg';
import pendingIcon from '@/assets/icons/pendingIcon.svg';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';

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
            theme="link-blue-bold"
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
      align: 'center' as const,
      dataIndex: 'status',
      render: (text: string): JSX.Element => (
        <div className={styles.statusDiv}>
          <Popover
            content={text.toLowerCase() !== 'pending' ? 'Registered' : 'Pending'}
            trigger="hover"
            className={`${styles.status} ${text.toLowerCase() !== 'pending' ? styles.joined : ''}`}
          >
            <span>
              {text.toLowerCase() !== 'pending' ? (
                <img src={tickIcon} alt="Registered" />
              ) : (
                <img src={pendingIcon} alt="Pending" />
              )}
            </span>
          </Popover>
        </div>
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
                    urn,
                    user: {
                      name: checkForStringAndReturnEmptyIfFalsy(joinRequestName),
                      title: checkForStringAndReturnEmptyIfFalsy(jobTitle),
                      email: checkForStringAndReturnEmptyIfFalsy(email),
                      phone: checkForStringAndReturnEmptyIfFalsy(phone),
                    },
                  }));
                setStage && setStage(StageState.REMOVE);
              }}
              ariaLabel="remove"
            />
          </div>
        ) : (
          <div className={styles.actionsContainer}>
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
                    urn,
                    user: {
                      name: checkForStringAndReturnEmptyIfFalsy(joinRequestName),
                      title: checkForStringAndReturnEmptyIfFalsy(jobTitle),
                      email: checkForStringAndReturnEmptyIfFalsy(email),
                      phone: checkForStringAndReturnEmptyIfFalsy(phone),
                    },
                  }));
                setStage && setStage(StageState.APPROVE_SCHOOL);
              }}
              ariaLabel="view"
            />
          </div>
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
