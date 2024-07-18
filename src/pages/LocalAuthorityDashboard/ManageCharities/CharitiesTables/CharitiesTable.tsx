import pendingIcon from '@/assets/icons/pendingIcon.svg';
import tickIcon from '@/assets/icons/tickIcon.svg';
import Button from '@/components/Button/Button';
import Paths from '@/config/paths';
import { type SchoolOrCharityTableData, StageState } from '@/types/data';
import type { SchoolsOrCharityTableProps } from '@/types/props';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';
import { Popover, Table } from 'antd';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../ManageCharities.module.scss';

const CharitiesTable: FC<SchoolsOrCharityTableProps> = ({ data, setStage, setProperties }) => {
  const navigate = useNavigate();
  const columns = [
    {
      title: 'Charity',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, { id, name, status }: SchoolOrCharityTableData): JSX.Element => {
        return status.toLowerCase() === 'joined' ? (
          <Button
            theme="link-blue-bold"
            text={text}
            ariaLabel={`name-${text}`}
            onClick={() => navigate(Paths.CHARITY_DASHBOARD, { state: { id, name } })}
          />
        ) : (
          <>{text}</>
        );
      },
    },
    {
      title: 'Status',
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
        {
          status,
          name,
          id,
          joinRequestName,
          phone,
          email,
          jobTitle,
          charityAddress,
          aboutCharity,
        }: SchoolOrCharityTableData
      ): JSX.Element => {
        return status.toLowerCase() === 'joined' ? (
          <div className={styles.actionsContainer}>
            <Button
              theme="link-blue"
              className={styles.actionButtons}
              text="Remove"
              onClick={(): void => {
                setProperties?.((charityProperties) => ({
                  ...charityProperties,
                  name,
                  id: String(id),
                  user: {
                    name: checkForStringAndReturnEmptyIfFalsy(joinRequestName),
                    title: checkForStringAndReturnEmptyIfFalsy(jobTitle),
                    email: checkForStringAndReturnEmptyIfFalsy(email),
                    phone: checkForStringAndReturnEmptyIfFalsy(phone),
                  },
                  charity: {
                    charityAddress: checkForStringAndReturnEmptyIfFalsy(charityAddress),
                    aboutCharity: checkForStringAndReturnEmptyIfFalsy(aboutCharity),
                  },
                }));
                setStage?.(StageState.REMOVE);
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
                setProperties?.((properties) => ({
                  ...properties,
                  name,
                  id: String(id),
                  user: {
                    name: checkForStringAndReturnEmptyIfFalsy(joinRequestName),
                    title: checkForStringAndReturnEmptyIfFalsy(jobTitle),
                    email: checkForStringAndReturnEmptyIfFalsy(email),
                    phone: checkForStringAndReturnEmptyIfFalsy(phone),
                  },
                  charity: {
                    charityAddress: checkForStringAndReturnEmptyIfFalsy(charityAddress),
                    aboutCharity: checkForStringAndReturnEmptyIfFalsy(aboutCharity),
                  },
                }));
                setStage?.(StageState.APPROVE_CHARITY);
              }}
              ariaLabel="view"
            />
          </div>
        );
      },
    },
  ];
  return <Table dataSource={data} columns={columns} scroll={{ x: 'max-content' }} rowKey="id" />;
};
export default CharitiesTable;
