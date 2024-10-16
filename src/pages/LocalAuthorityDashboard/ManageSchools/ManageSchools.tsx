import { FC, useEffect, useState } from 'react';
import styles from './ManageSchools.module.scss';
import dashboardStyles from '../LocalAuthorityDashboard.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import RegisteredSchools from './SchoolsTables/RegisteredSchools';
import PendingSchools from './SchoolsTables/PendingSchools';
import ApprovalRequest from '@/components/ApprovalRequest/ApprovalRequest';
import { InstitutionType, PillColours, SchoolOrCharityProperties, StageState } from '@/types/data';
import { useQuery } from '@tanstack/react-query';
import { DeleteSchoolProfileMutation } from '@/types/api';
import { deleteSchoolProfile } from '@/graphql/mutations';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import Paths from '@/config/paths';
import DeclineDeleteModal from '@/components/DeclineDeleteModal/DeclineDeleteModal';
import Card from '@/components/Card/Card';
import { Pill } from '@/components/Pill/Pill';
import { pluraliseString } from '@/utils/globals';
import School from '@/assets/icons/School';

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
    <div className={dashboardStyles.subContainer}>
      {stage === StageState.VIEW && (
        <>
          <div className={styles.actionButtons}>
            <BackButton theme="blue" />
          </div>
          <div className={dashboardStyles.adminCard}>
            <div className={dashboardStyles.header}>
              <h1>Manage your schools</h1>
            </div>
            <div className={dashboardStyles.subBody}>
              <Card className={styles.schoolsCard}>
                <div>
                  <School />
                </div>
                <h2 className={styles.subHeader}>Review join requests and manage your schools</h2>
                <h3 className={styles.tableHeader}>Join requests</h3>
                <div className={styles.pillContainer}>
                  <Pill
                    colour={PillColours.GREEN}
                    text={`${schoolsPending} live ${pluraliseString('request', schoolsPending)}`}
                  />
                </div>
                <PendingSchools
                  localAuthority={localAuthority}
                  setSchoolsNumber={setSchoolsPending}
                  setStage={setStage}
                  setSchoolProperties={setSchoolProperties}
                  stage={stage}
                />
                <h3 className={styles.tableHeader}>Manage your schools</h3>
                <div className={styles.registeredSchools}>
                  <h3>{schoolsJoined}</h3>
                  <p>schools have joined Donate to Educate in {localAuthority}.</p>
                </div>
                <RegisteredSchools
                  localAuthority={localAuthority}
                  setSchoolsNumber={setSchoolsJoined}
                  setSchoolProperties={setSchoolProperties}
                  setStage={setStage}
                  stage={stage}
                />
              </Card>
            </div>
          </div>
        </>
      )}
      {stage === StageState.APPROVE_SCHOOL && (
        <ApprovalRequest
          id={schoolProperties.id}
          setStage={setStage}
          type={InstitutionType.SCHOOL}
          name={schoolProperties.name}
          la={schoolProperties.la}
          user={schoolProperties.user}
          urn={schoolProperties.urn}
        />
      )}
      <DeclineDeleteModal
        setShowModal={() => {
          setShowModal(false);
          setStage(StageState.VIEW);
        }}
        showModal={showModal}
        onConfirm={() => setStage(StageState.REMOVED)}
        bodyText="This will remove the school&aposs profile and information. They will need to resubmit an
        application to rejoin Donate to Educate."
        confirmText="Remove connection"
      />
    </div>
  );
};

export default ManageSchools;
