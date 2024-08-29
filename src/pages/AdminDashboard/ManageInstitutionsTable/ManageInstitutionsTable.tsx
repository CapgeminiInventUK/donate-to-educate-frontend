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
import School from '@/assets/icons/School';
import Donate from '@/assets/icons/Donate';

const ManageInstitutionsTable: FC<ManageInstitutionsTableProps> = ({ data, type, isLoading }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const navigate = useNavigate();

  /* eslint-disable no-console */
  console.log(data, 'OOOO');

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
      align: 'center' as const,
    },
    {
      title: 'Local Authority',
      dataIndex: 'localAuthority',
      align: 'center' as const,
    },
    {
      title: 'Action',
      dataIndex: 'localAuthority',
      align: 'center' as const,
      render: (text: string): JSX.Element => (
        <Button
          theme="link-blue-bold"
          text="details"
          ariaLabel={`name-${text}`}
          onClick={() => window.alert('This is in development')}
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
                {type === InstitutionType.SCHOOL ? (
                  <>
                    <School />
                    <h2>View and edit the details of your schools</h2>
                    <div className={styles.numberJoinedArea}>
                      <h4>
                        <span className={styles.amount} aria-label="total-joined">
                          {useZeroIfUndefined(data.length)}
                        </span>
                      </h4>
                      <div className={styles.subBody}>schools have joined Donate to Educate</div>
                    </div>
                  </>
                ) : (
                  <>
                    <Donate />
                    <h2>View and edit the details of your charities</h2>
                    <div className={styles.numberJoinedArea}>
                      <h4>
                        <span className={styles.amount} aria-label="total-joined">
                          {useZeroIfUndefined(data.length)}
                        </span>
                      </h4>
                      <div className={styles.subBody}>
                        charities and volunteer groups have joined Donate to Educate
                      </div>
                    </div>
                  </>
                )}
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
