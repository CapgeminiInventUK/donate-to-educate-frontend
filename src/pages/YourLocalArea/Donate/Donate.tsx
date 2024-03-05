import { FC } from 'react';
import styles from './Donate.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { Navigate, useLocation } from 'react-router-dom';
import Paths from '@/config/paths';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

const Donate: FC = () => {
  const location = useLocation() as { state: { postcode: string } };

  if (!(location.state && 'postcode' in location.state)) {
    return <Navigate to={Paths.FIND_YOUR_COMMUNITY} />;
  }

  const columns: ColumnsType<{ name: string; distance: string; productTypes: string[] }> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
    },
    {
      title: 'Product Types Needed',
      dataIndex: 'productTypes',
    },
  ];

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <div className={styles.subContainer}>
        <h2>Donate to schools and charities near {location.state.postcode.toUpperCase()}</h2>

        <h3>Schools</h3>
        <Table dataSource={[]} columns={columns} scroll={{ x: 'max-content' }} />

        <h3>Charities</h3>
        <Table dataSource={[]} columns={columns} scroll={{ x: 'max-content' }} />
      </div>
    </div>
  );
};

export default Donate;
