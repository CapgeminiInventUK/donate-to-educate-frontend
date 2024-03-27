import { FC, useEffect, useState } from 'react';
import styles from './ManageSchools.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import { useLocation, useNavigate } from 'react-router-dom';
import RegisteredSchools from './SchoolsTables/RegisteredSchools';
import PendingSchools from './SchoolsTables/PendingSchools';
import ApprovalRequest from '@/pages/AdminDashboard/Requests/ApprovalRequest/ApprovalRequest';
import DeleteModal from './DeleteModal/DeleteModal';
import { SchoolOrCharityProperties, StageState } from '@/types/data';
import { useQuery } from '@tanstack/react-query';
import { DeleteSchoolProfileMutation } from '@/types/api';
import { deleteSchoolProfile } from '@/graphql/mutations';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';

const ManageSchools: FC = () => {
  const { localAuthority } = useLocation().state as { localAuthority: string };
  const navigate = useNavigate();
  const [schoolsJoined, setSchoolsJoined] = useState(0);
  const [schoolsPending, setSchoolsPending] = useState(0);
  const [stage, setStage] = useState<StageState>(StageState.VIEW);
  const [schoolProperties, setSchoolProperties] = useState<SchoolOrCharityProperties>({
    id: '',
    name: '',
    la: localAuthority,
    user: { name: '', title: '', email: '', phone: '' },
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (stage === StageState.REMOVE) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [stage]);

  const { refetch: removeSchool } = useQuery({
    queryKey: ['removeSchool'],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<DeleteSchoolProfileMutation>>({
        query: deleteSchoolProfile,
        variables: {
          name: schoolProperties?.name,
          id: schoolProperties?.id,
        },
      });

      return result;
    },
  });

  useEffect(() => {
    if (stage === StageState.REMOVED) {
      removeSchool()
        .then(() => navigate(0))
        // eslint-disable-next-line no-console
        .catch(console.error);
    }
  }, [stage, removeSchool, navigate]);

  return (
    <div className={styles.container}>
      {stage === StageState.VIEW && (
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
                  setSchoolProperties={setSchoolProperties}
                  setStage={setStage}
                  stage={stage}
                />
                <PendingSchools
                  localAuthority={localAuthority}
                  setSchoolsNumber={setSchoolsPending}
                  setStage={setStage}
                  setSchoolProperties={setSchoolProperties}
                  stage={stage}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {stage === StageState.APPROVE_SCHOOL && (
        <ApprovalRequest
          id={schoolProperties.id}
          setStage={setStage}
          type="school"
          name={schoolProperties.name}
          la={schoolProperties.la}
          user={schoolProperties.user}
        />
      )}
      <DeleteModal
        setShowModal={() => {
          setShowModal(false);
          setStage(StageState.VIEW);
        }}
        showModal={showModal}
        onConfirm={() => setStage(StageState.REMOVED)}
      />
    </div>
  );
};

export default ManageSchools;
