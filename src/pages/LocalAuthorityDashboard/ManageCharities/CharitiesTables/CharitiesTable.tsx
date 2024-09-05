import { FC } from 'react';
import { Table, Popover } from 'antd';
import Button from '@/components/Button/Button';
import styles from '../ManageCharities.module.scss';
import { SchoolsOrCharityTableProps } from '@/types/props';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import { SchoolOrCharityTableData, StageState } from '@/types/data';
import tickIcon from '@/assets/icons/tickIcon.svg';
import pendingIcon from '@/assets/icons/pendingIcon.svg';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';

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
          localAuthority,
        }: SchoolOrCharityTableData
      ): JSX.Element => {
        return status.toLowerCase() === 'joined' ? (
          <div className={styles.actionsContainer}>
            <Button
              theme="link-blue-bold"
              text="Details"
              ariaLabel={`${name}-details`}
              onClick={() =>
                navigate(Paths.LOCAL_AUTHORITY_DASHBOARD_MANAGE_CHARITY, {
                  state: { institution: { name, id, localAuthority } },
                })
              }
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
                  setProperties((properties) => ({
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
                setStage && setStage(StageState.APPROVE_CHARITY);
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
