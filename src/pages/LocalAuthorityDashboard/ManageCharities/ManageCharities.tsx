import { FC, useEffect, useState } from 'react';
import styles from './ManageCharities.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import Paths from '@/config/paths';
import { useNavigate } from 'react-router-dom';
import { SchoolOrCharityProperties, StageState } from '@/types/data';
import { useQuery } from '@tanstack/react-query';
import { deleteCharityProfile } from '@/graphql/mutations';
import { DeleteCharityProfileMutation } from '@/types/api';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import RegisteredCharities from './CharitiesTables/RegisteredCharities';

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
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(stage === StageState.REMOVE);
  }, [stage]);

  const { refetch: removeSchool } = useQuery({
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
    stage === StageState.REMOVED && void removeSchool().then(() => navigate(0));
  }, [stage, removeSchool, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <BackButton theme="blue" />
        <LogoutButton />
      </div>
      <div className={styles.adminCard}>
        <h1>{localAuthority}</h1>
        <div className={styles.body}>
          <div className={styles.card}>
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCharities;
