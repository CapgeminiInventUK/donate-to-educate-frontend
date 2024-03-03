import { FC, useState } from 'react';
import styles from './FindSchool.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { Link, Navigate, useLocation } from 'react-router-dom';
import Paths from '@/config/paths';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

const FindSchool: FC = () => {
  const location = useLocation() as { state: { postcode: string } };
  const [showDescription, toggleDescription] = useState(false);

  if (!(location.state && 'postcode' in location.state)) {
    return <Navigate to={Paths.FIND_YOUR_COMMUNITY} />;
  }

  const columns: ColumnsType<{ name: string; distance: string }> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
    },
  ];

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <div className={styles.subContainer}>
        <h2>Find your child&apos;s school near {location.state.postcode.toUpperCase()}</h2>

        <Table dataSource={[]} columns={columns} scroll={{ x: 'max-content' }} />

        <span
          className={styles.expander}
          onClick={() => toggleDescription((previous) => !previous)}
        >
          I cannot find my child&apos;s school
        </span>
        {showDescription && (
          <div className={styles.missingSchoolDescription}>
            If your child&apos;s school is not on the list they have not joined Donate to Educate
            yet. Find nearby charities who may have the products you need.{' '}
            <Link to={Paths.LOCAL_CHARITIES} state={{ postcode: location.state.postcode }}>
              Find nearby charities.
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindSchool;
