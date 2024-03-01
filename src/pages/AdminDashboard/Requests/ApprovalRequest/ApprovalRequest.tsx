import { FC, useEffect, useState } from 'react';
import styles from './ApprovalRequest.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import Email from '@/assets/tiles/Email';
import Phone from '@/assets/admin/Phone';
import ToolTip from '@/assets/admin/ToolTip';
import DeclineModal from './DeclineModal/DeclineModal';
import ResultBanner from './ResultBanner/ResultBanner';
import FormButton from '@/components/FormButton/FormButton';
import { Pill } from '@/components/Pill/Pill';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from '@aws-amplify/api-graphql';
import { DeleteDeniedJoinRequestMutation, UpdateJoinRequestMutation } from '@/types/api';
import { deleteDeniedJoinRequest, updateJoinRequest } from '@/graphql/mutations';
import { RequestUser } from '../../AdminDashboard';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';

interface ApprovalRequestProps {
  setStage: React.Dispatch<React.SetStateAction<string>>;
  type: 'school' | 'charity';
  name: string;
  la: string;
  user: RequestUser;
}

type myStageType = 'deciding' | 'approved' | 'denied';

const ApprovalRequest: FC<ApprovalRequestProps> = ({ setStage, name, type, la, user }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [myStage, setMyStage] = useState<myStageType>('deciding');

  const { refetch } = useQuery({
    queryKey: ['saveProfile'],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<UpdateJoinRequestMutation>>({
        query: updateJoinRequest,
        variables: {
          localAuthority: la,
          name: user.name,
          status: myStage === 'approved' ? 'APPROVED' : 'DENIED',
        },
      });

      return result;
    },
  });

  const { refetch: deleteProfile } = useQuery({
    queryKey: ['deleteProfile'],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<DeleteDeniedJoinRequestMutation>>({
        query: deleteDeniedJoinRequest,
        variables: {
          name: user.name,
        },
      });

      return result;
    },
  });

  useEffect(() => {
    if (myStage === 'approved') {
      // eslint-disable-next-line no-console
      refetch().then(console.log).catch(console.error);
    }
    if (myStage === 'denied') {
      deleteProfile()
        .then(() => navigate(Paths.DELETE_CONFIRMATION))
        // eslint-disable-next-line no-console
        .catch(console.error);
    }
  }, [myStage, refetch, deleteProfile, navigate]);

  return (
    <>
      <BackButton onClick={(): void => setStage('view_requests')} theme="blue" />
      <div className={styles.card}>
        <>
          <Pill
            color={type == 'school' ? 'blue' : 'lightBlue'}
            text={type == 'school' ? 'SCHOOL' : 'CHARITY OR VOLUNTEER GROUP'}
          />
          <h1>{name}</h1>
          {type === 'school' && (
            <>
              <div className={styles.contactInfo}>
                <Phone />
                <div>01243 546800</div>
              </div>
              <div className={styles.contactInfo}>
                <Email />
                <div>email@ormiston.edu.ac.uk</div>
              </div>
              <div className={styles.detailsCard}>
                <p>Ormiston Six Villages Academy</p>
                <p>Lime Avenue</p>
                <p>Westergate</p>
                <p>West Sussex</p>
                <p>PO20 3UE</p>
                <p>England</p>
              </div>{' '}
            </>
          )}
          <hr />
          {myStage === 'deciding' && (
            <>
              <p>
                {' '}
                {type == 'school'
                  ? "To confirm this connection, check that they're senior staff or a senior contact at the school."
                  : "To confirm this connection, check that they're working at the charity or volunteer group and have somewhere to store products."}
              </p>
              <div className={styles.contactInfo}>
                <ToolTip className={styles.infoToolTip} />
                <b>The local authority may also review, confirm or decline this request.</b>
              </div>
              <div className={styles.requestDecisionCard}>
                <div className={styles.informationLine}>
                  <b>Name</b>
                  <span>{user.name}</span>
                </div>
                <hr />
                <div className={styles.informationLine}>
                  <b>Job title or role</b>
                  <span>{user.title}</span>
                </div>
                <hr />
                <div className={styles.informationLine}>
                  <b>Email</b>
                  <span>{user.email}</span>
                </div>
                <hr />
                <div className={styles.informationLine}>
                  <b>Phone</b>
                  <span>{user.phone}</span>
                </div>
                <hr />
                <div className={styles.actionButtons}>
                  <FormButton
                    theme="formButtonMidBlue"
                    text="Confirm request"
                    onClick={(): void => {
                      setMyStage('approved');
                    }}
                  />
                  <FormButton
                    theme="formButtonGrey"
                    text="Decline request"
                    onClick={(): void => setShowModal(true)}
                  />
                </div>
              </div>
              <DeclineModal
                setShowModal={setShowModal}
                showModal={showModal}
                doSomething={() => setMyStage('denied')}
              />
            </>
          )}
        </>
        {myStage === 'approved' && <ResultBanner name={user.name} type="approved" />}
      </div>
    </>
  );
};

export default ApprovalRequest;
