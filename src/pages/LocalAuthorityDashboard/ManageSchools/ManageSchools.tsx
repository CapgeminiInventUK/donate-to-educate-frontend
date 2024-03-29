import { FC, useEffect, useState } from 'react';
import styles from './ManageSchools.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import { useNavigate } from 'react-router-dom';
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
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import Paths from '@/config/paths';

const ManageSchools: FC = () => {
  const {
    state: { localAuthority },
  } = useLocationStateOrRedirect<{ localAuthority: string }>(Paths.LOCAL_AUTHORITY_DASHBOARD);
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
    setShowModal(stage === StageState.REMOVE);
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
    stage === StageState.REMOVED && void removeSchool().then(() => navigate(0));
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
            <h1>{localAuthority}</h1>
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
