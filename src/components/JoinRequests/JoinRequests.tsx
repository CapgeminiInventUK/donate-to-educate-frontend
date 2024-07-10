import { FC } from 'react';
import styles from './JoinRequests.module.scss';
import { JoinRequestsProps } from '@/types/props';
import JoinRequestsTable from './JoinRequestsTable/JoinRequestsTable';

const JoinRequests: FC<JoinRequestsProps> = ({ data, setStage, setSchoolOrCharityProperties }) => {
  const schools = data?.getJoinRequests.filter(({ type }) => type === 'school');
  const charities = data?.getJoinRequests.filter(({ type }) => type === 'charity');

  const tablesData = [
    { title: 'School', dataIndex: 'school', dataSource: schools, h2: 'Schools' },
    {
      title: 'Charity',
      dataIndex: 'charityName',
      dataSource: charities,
      h2: 'Charities and volunteer groups',
    },
  ];

  return (
    <>
      <p className={styles.info}>
        View who has asked their local authorities to join Donate to Educate. You may give the local
        authority two working days to review a request before you do.
      </p>
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
    </>
  );
};

export default JoinRequests;
