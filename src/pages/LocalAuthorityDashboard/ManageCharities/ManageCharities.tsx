import ApprovalRequest from '@/components/ApprovalRequest/ApprovalRequest';
import BackButton from '@/components/BackButton/BackButton';
import Card from '@/components/Card/Card';
import DeclineDeleteModal from '@/components/DeclineDeleteModal/DeclineDeleteModal';
import Paths from '@/config/paths';
import { deleteCharityProfile } from '@/graphql/mutations';
import { client } from '@/graphqlClient';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import type { DeleteCharityProfileMutation } from '@/types/api';
import { type SchoolOrCharityProperties, StageState } from '@/types/data';
import { useQuery } from '@tanstack/react-query';
import type { GraphQLQuery } from 'aws-amplify/api';
import { type FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardStyles from '../LocalAuthorityDashboard.module.scss';
import PendingCharities from './CharitiesTables/PendingCharities';
import RegisteredCharities from './CharitiesTables/RegisteredCharities';
import styles from './ManageCharities.module.scss';

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
  }, [stage, removeCharity, navigate]);

  return (
    <div className={dashboardStyles.subContainer}>
      {stage === StageState.VIEW && (
        <>
          <div className={styles.actionButtons}>
            <BackButton theme="blue" />
          </div>
          <div className={dashboardStyles.adminCard}>
            <div className={dashboardStyles.header}>
              <h1>{localAuthority}</h1>
            </div>
            <div className={dashboardStyles.subBody}>
              <Card className={styles.charitiesCard}>
                <h2>Charity and volunteer groups in your area</h2>
                <div className={styles.borderLeft}>
                  <div>{charitiesPending} requests to join</div>
                  <div>{charitiesJoined} joined</div>
                </div>
                <RegisteredCharities
                  localAuthority={localAuthority}
                  setCharitiesNumber={setCharitiesJoined}
                  setStage={setStage}
                  stage={stage}
                  setCharityProperties={setCharityProperties}
                />
                <PendingCharities
                  localAuthority={localAuthority}
                  setCharitiesNumber={setCharitiesPending}
                  setCharityProperties={setCharityProperties}
                  setStage={setStage}
                  stage={stage}
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
          type="charity"
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
        bodyText="This will remove the school&aposs profile and information. They will need to resubmit an
        application to rejoin Donate to Educate."
        confirmText="Remove connection"
      />
    </div>
  );
};

export default ManageCharities;
