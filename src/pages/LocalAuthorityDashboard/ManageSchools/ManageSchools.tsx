import { FC } from 'react';
import styles from './ManageSchools.module.scss';
import { Table } from 'antd';
import Button from '@/components/Button/Button';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetRegisteredSchoolsByLaQuery } from '../../../types/api';
import { getRegisteredSchoolsByLa } from '@/graphql/queries';
import Spinner from '@/components/Spinner/Spinner';
import BackButton from '@/components/BackButton/BackButton';
import LogoutButton from '@/components/LogoutButton/LogoutButton';

const ManageSchools: FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['la-registered'],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetRegisteredSchoolsByLaQuery>>({
        query: getRegisteredSchoolsByLa,
        variables: {
          localAuthority: 'Hackney',
        },
      });

      return data;
    },
  });

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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <BackButton theme="blue" />
        <LogoutButton />
      </div>
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
            <Table
              dataSource={data?.getRegisteredSchoolsByLa ?? []}
              columns={columns}
              scroll={{ x: 'max-content' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSchools;
