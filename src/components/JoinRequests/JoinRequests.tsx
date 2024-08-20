import { FC } from 'react';
import { JoinRequestsProps } from '@/types/props';
import JoinRequestsTable from './JoinRequestsTable/JoinRequestsTable';
import styles from './JoinRequests.module.scss';

const JoinRequests: FC<JoinRequestsProps> = ({ data, setStage, setSchoolOrCharityProperties }) => {
  const schools = data?.getJoinRequests.filter(({ type }) => type === 'school');
  const charities = data?.getJoinRequests.filter(({ type }) => type === 'charity');

  const tablesData = [
    { title: 'School', dataIndex: 'school', dataSource: schools, h2: 'School requests' },
    {
      title: 'Charity',
      dataIndex: 'charityName',
      dataSource: charities,
      h2: 'Charities and volunteer groups requests',
    },
  ];

  return (
    <div className={styles.tableWrapper}>
      {tablesData.map(({ title, dataIndex, dataSource, h2 }) => (
        <JoinRequestsTable
          key={title}
          setStage={setStage}
          setSchoolOrCharityProperties={setSchoolOrCharityProperties}
          title={title}
          dataIndex={dataIndex}
          data={dataSource}
          h2={h2}
        />
      ))}
    </div>
  );
};

export default JoinRequests;
