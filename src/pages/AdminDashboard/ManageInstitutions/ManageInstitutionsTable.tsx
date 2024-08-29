import { useState, useRef, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputRef, Table } from 'antd';
import Button from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
import Spinner from '@/components/Spinner/Spinner';
import Paths from '@/config/paths';
import dashboardStyles from '../AdminDashboard.module.scss';
import styles from './ManageInstitutionsTable.module.scss';
import Card from '@/components/Card/Card';
import getColumnSearch from '@/utils/tableUtils';
import { capitaliseFirstLetter, pluraliseString, useZeroIfUndefined } from '@/utils/globals';
import { ManageInstitutionsTableProps } from '@/types/props';
import { InstitutionProfile, InstitutionType } from '@/types/data';

const ManageInstitutionsTable: FC<ManageInstitutionsTableProps> = ({ data, type, isLoading }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const navigate = useNavigate();

  const columnSearchProps = {
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn,
    searchInput,
    filterClassName: styles.filterIcon,
  };

  const institutionColumnSearchProps = {
    dataIndex: 'name' as keyof InstitutionProfile,
    ...columnSearchProps,
  };

  const laColumnSearchProps = {
    dataIndex: 'localAuthority' as keyof InstitutionProfile,
    ...columnSearchProps,
  };

  const postcodeColumnSearchProps = {
    dataIndex: 'postcode' as keyof InstitutionProfile,
    ...columnSearchProps,
  };

  const columns = [
    {
      title: capitaliseFirstLetter(type),
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearch<InstitutionProfile>(institutionColumnSearchProps),
      render: (text: string, { id, name }: InstitutionProfile): JSX.Element => (
        <Button
          theme="link-blue-bold"
          text={text}
          ariaLabel={`name-${text}`}
          onClick={() =>
            navigate(
              type === InstitutionType.CHARITY ? Paths.CHARITY_DASHBOARD : Paths.SCHOOLS_DASHBOARD,
              {
                state: { id, name, urn: id },
              }
            )
          }
        />
      ),
    },
    {
      title: 'Postcode',
      dataIndex: 'postcode',
      ...getColumnSearch<InstitutionProfile>(postcodeColumnSearchProps),
    },
    {
      title: 'Local Authority',
      dataIndex: 'localAuthority',
      ...getColumnSearch<InstitutionProfile>(laColumnSearchProps),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: string, institution: InstitutionProfile): JSX.Element => (
        <Button
          theme="link-blue-bold"
          text="Details"
          ariaLabel={`${institution.name}-details`}
          onClick={() =>
            navigate(
              type === InstitutionType.CHARITY
                ? Paths.ADMIN_DASHBOARD_MANAGE_CHARITY
                : Paths.ADMIN_DASHBOARD_MANAGE_SCHOOL,
              {
                state: { institution },
              }
            )
          }
        />
      ),
    },
  ];

  return (
    <div className={dashboardStyles.subContainer}>
      <BackButton theme="blue" />
      <div className={dashboardStyles.adminCard}>
        <div className={dashboardStyles.header}>
          <h1>Manage {capitaliseFirstLetter(pluraliseString(type))}</h1>
        </div>
        <div className={dashboardStyles.subBody}>
          {isLoading ? (
            <Spinner />
          ) : (
            <div className={styles.cardContainer}>
              <Card className={styles.manageCard}>
                <h2>
                  Registered{' '}
                  {type === InstitutionType.SCHOOL ? 'schools' : 'charities and volunteer groups'}
                </h2>
                <div aria-label="total-joined" className={styles.border}>
                  {useZeroIfUndefined(data.length)} joined
                </div>
                <br />
                <Table
                  dataSource={data}
                  columns={columns}
                  scroll={{ x: 'max-content' }}
                  rowKey="id"
                />
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageInstitutionsTable;
