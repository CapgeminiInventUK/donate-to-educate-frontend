import { FC, useEffect, useState } from 'react';
import styles from './ManageCharities.module.scss';
import dashboardStyles from '../LocalAuthorityDashboard.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import Paths from '@/config/paths';
import { useNavigate } from 'react-router-dom';
import { InstitutionType, PillColours, SchoolOrCharityProperties, StageState } from '@/types/data';
import { useQuery } from '@tanstack/react-query';
import { deleteCharityProfile } from '@/graphql/mutations';
import { DeleteCharityProfileMutation } from '@/types/api';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import RegisteredCharities from './CharitiesTables/RegisteredCharities';
import PendingCharities from './CharitiesTables/PendingCharities';
import ApprovalRequest from '@/components/ApprovalRequest/ApprovalRequest';
import DeclineDeleteModal from '@/components/DeclineDeleteModal/DeclineDeleteModal';
import Card from '@/components/Card/Card';
import Donate from '@/assets/icons/Donate';
import { Pill } from '@/components/Pill/Pill';
import { pluraliseString } from '@/utils/globals';

const ManageCharities: FC = () => {
  const {
    state: { localAuthority },
  } = useLocationStateOrRedirect<{ localAuthority: string }>(Paths.LOCAL_AUTHORITY_DASHBOARD);

  const navigate = useNavigate();
  const [charitiesJoined, setCharitiesJoined] = useState(0);
  const [charitiesPending, setCharitiesPending] = useState(0);
  const [stage, setStage] = useState<StageState>(StageState.VIEW);
  const [charityProperties, setCharityProperties] = useState<SchoolOrCharityProperties>({
    id: '',
    name: '',
    la: localAuthority,
    user: { name: '', title: '', email: '', phone: '' },
    charity: { charityAddress: '', aboutCharity: '' },
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(stage === StageState.REMOVE);
  }, [stage]);

  const { refetch: removeCharity } = useQuery({
    queryKey: ['removeCharity'],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<DeleteCharityProfileMutation>>({
        query: deleteCharityProfile,
        variables: {
          name: charityProperties?.name,
          id: charityProperties?.id,
        },
      });
      return result;
    },
  });

  useEffect(() => {
    stage === StageState.REMOVED && void removeCharity().then(() => navigate(0));
  }, [stage, removeCharity, navigate, charityProperties]);

  return (
    <div className={dashboardStyles.subContainer}>
      {stage === StageState.VIEW && (
        <>
          <div className={styles.actionButtons}>
            <BackButton theme="blue" />
          </div>
          <div className={dashboardStyles.adminCard}>
            <div className={dashboardStyles.header}>
              <h1>Manage your charities</h1>
            </div>
            <div className={dashboardStyles.subBody}>
              <Card className={styles.charitiesCard}>
                <div>
                  <Donate />
                </div>
                <h2 className={styles.subHeader}>Review join requests and manage your charities</h2>
                <h3 className={styles.tableHeader}>Join requests</h3>
                <div className={styles.pillContainer}>
                  <Pill
                    colour={PillColours.GREEN}
                    text={`${charitiesPending} live ${pluraliseString('request', charitiesPending)}`}
                  />
                </div>
                <PendingCharities
                  localAuthority={localAuthority}
                  setCharitiesNumber={setCharitiesPending}
                  setCharityProperties={setCharityProperties}
                  setStage={setStage}
                  stage={stage}
                />
                <h3 className={styles.tableHeader}>Manage your charities</h3>
                <div className={styles.registeredCharities}>
                  <h3>{charitiesJoined}</h3>
                  <p>charities have joined Donate to Educate in {localAuthority}.</p>
                </div>
                <RegisteredCharities
                  localAuthority={localAuthority}
                  setCharitiesNumber={setCharitiesJoined}
                  setStage={setStage}
                  stage={stage}
                  setCharityProperties={setCharityProperties}
                />
              </Card>
            </div>
          </div>
        </>
      )}
      {stage === StageState.APPROVE_CHARITY && (
        <ApprovalRequest
          id={charityProperties.id}
          setStage={setStage}
          type={InstitutionType.CHARITY}
          name={charityProperties.name}
          la={charityProperties.la}
          user={charityProperties.user}
          charity={charityProperties.charity}
        />
      )}
      <DeclineDeleteModal
        setShowModal={() => {
          setShowModal(false);
          setStage(StageState.VIEW);
        }}
        showModal={showModal}
        onConfirm={() => setStage(StageState.REMOVED)}
        bodyText="This will remove the charity&aposs profile and information. They will need to resubmit an
        application to rejoin Donate to Educate."
        confirmText="Remove connection"
      />
    </div>
  );
};

export default ManageCharities;
