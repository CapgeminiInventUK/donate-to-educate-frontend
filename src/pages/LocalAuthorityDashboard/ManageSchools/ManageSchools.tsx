import { FC, useState } from 'react';
import styles from './ManageSchools.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import { useLocation } from 'react-router-dom';
import RegisteredSchools from './SchoolsTables/RegisteredSchools';
import PendingSchools from './SchoolsTables/PendingSchools';
import ApprovalRequest from '@/pages/AdminDashboard/Requests/ApprovalRequest/ApprovalRequest';
import { SchoolOrCharityProperties } from '@/pages/AdminDashboard/AdminDashboard';

const ManageSchools: FC = () => {
  const { localAuthority } = useLocation().state as { localAuthority: string };
  const [schoolsJoined, setSchoolsJoined] = useState(0);
  const [schoolsPending, setSchoolsPending] = useState(0);
  const [stage, setStage] = useState('view_requests');
  const [schoolProperties, setSchoolProperties] = useState<SchoolOrCharityProperties>({
    id: '',
    name: '',
    la: localAuthority,
    user: { name: '', title: '', email: '', phone: '' },
  });

  return (
    <div className={styles.container}>
      {stage === 'view_requests' && (
        <>
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
                  <div>{schoolsPending} pending request</div>
                  <div>{schoolsJoined} joined</div>
                </div>
                <RegisteredSchools
                  localAuthority={localAuthority}
                  setSchoolsNumber={setSchoolsJoined}
                  setStage={setStage}
                />
                <PendingSchools
                  localAuthority={localAuthority}
                  setSchoolsNumber={setSchoolsPending}
                  setStage={setStage}
                  setSchoolProperties={setSchoolProperties}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {stage === 'request_approval_school' && (
        <ApprovalRequest
          id={schoolProperties.id}
          setStage={setStage}
          type="school"
          name={schoolProperties.name}
          la={schoolProperties.la}
          user={schoolProperties.user}
        />
      )}
    </div>
  );
};

export default ManageSchools;
