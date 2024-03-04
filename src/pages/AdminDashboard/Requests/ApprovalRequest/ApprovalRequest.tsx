import { FC, useEffect, useState } from 'react';
import styles from './ApprovalRequest.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import Phone from '@/assets/admin/Phone';
import ToolTip from '@/assets/admin/ToolTip';
import DeclineModal from './DeclineModal/DeclineModal';
import ResultBanner from './ResultBanner/ResultBanner';
import FormButton from '@/components/FormButton/FormButton';
import { Pill } from '@/components/Pill/Pill';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from '@aws-amplify/api-graphql';
import {
  DeleteDeniedJoinRequestMutation,
  GetSchoolByNameQuery,
  UpdateJoinRequestMutation,
} from '@/types/api';
import { deleteDeniedJoinRequest, updateJoinRequest } from '@/graphql/mutations';
import { RequestUser } from '../../AdminDashboard';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import { getSchoolByName } from '@/graphql/queries';
import Spinner from '@/components/Spinner/Spinner';
import Globe from '@/assets/tiles/Globe';

interface ApprovalRequestProps {
  setStage: React.Dispatch<React.SetStateAction<string>>;
  type: 'school' | 'charity';
  name: string;
  la: string;
  user: RequestUser;
  charity?: { mainAddress: string; about: string };
}

type myStageType = 'deciding' | 'approved' | 'denied';

const ApprovalRequest: FC<ApprovalRequestProps> = ({ setStage, name, type, la, user, charity }) => {
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

  const { isLoading, data } = useQuery({
    queryKey: [`school-details-${name}`],
    enabled: type === 'school',
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetSchoolByNameQuery>>({
        query: getSchoolByName,
        variables: {
          name: name.split('-')[0].trim(),
        },
      });

      return data;
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

  if (isLoading && type === 'school') {
    return <Spinner />;
  }

  return (
    <>
      <BackButton onClick={(): void => setStage('view_requests')} theme="blue" />
      <div className={styles.card}>
        <>
          <Pill
            color={type == 'school' ? 'blue' : 'lightBlue'}
            text={type == 'school' ? 'SCHOOL' : 'CHARITY OR VOLUNTEER GROUP'}
          />
          {type === 'school' && (
            <>
              <h1>{data?.getSchoolByName.name}</h1>
              <div className={styles.contactInfo}>
                <Phone />
                <div>{data?.getSchoolByName.phone}</div>
              </div>
              <div className={styles.contactInfo}>
                <Globe />
                <div>{data?.getSchoolByName.website}</div>
              </div>
              <div className={styles.detailsCard}>
                <p>{data?.getSchoolByName.street}</p>
                <p>{data?.getSchoolByName.locality}</p>
                <p>{data?.getSchoolByName.address3}</p>
                <p>{data?.getSchoolByName.town}</p>
                <p>{data?.getSchoolByName.county}</p>
                <p>{data?.getSchoolByName.postcode}</p>
                <p>England</p>
              </div>{' '}
            </>
          )}
          {type === 'charity' && <h1>{name}</h1>}
          <hr />
          {myStage === 'deciding' && type === 'school' && (
            <>
              <p>
                To confirm this connection, check that they&apos;re senior staff or a senior contact
                at the school.
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
                    ariaLabel="confirm request"
                  />
                  <FormButton
                    theme="formButtonGrey"
                    text="Decline request"
                    onClick={(): void => setShowModal(true)}
                    ariaLabel="decline request"
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
          {myStage === 'deciding' && type === 'charity' && (
            <>
              <p>
                To confirm this connection, check that they&apos;re working at the charity or
                volunteer group and have somewhere to store products.
              </p>
              <div className={styles.contactInfo}>
                <ToolTip className={styles.infoToolTip} />
                <b>The local authority may also review, confirm or decline this request.</b>
              </div>
              <div className={styles.requestDecisionCard}>
                <h3>Details</h3>
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
                <h3>Charity or volunteer group</h3>
                <div className={styles.informationLine}>
                  <b>Name</b>
                  <span>{name}</span>
                </div>
                <hr />
                <div className={styles.informationLine}>
                  <b>Local Authority</b>
                  <span>{la}</span>
                </div>
                <hr />
                <div className={styles.informationLine}>
                  <b>Main Address</b>
                  <span>{charity?.mainAddress}</span>
                </div>
                <hr />
                <div className={styles.informationLine}>
                  <b>About</b>
                  <span>{charity?.about}</span>
                </div>
                <hr />
                <div className={styles.actionButtons}>
                  <FormButton
                    theme="formButtonMidBlue"
                    text="Confirm request"
                    onClick={(): void => {
                      setMyStage('approved');
                    }}
                    ariaLabel="confirm request"
                  />
                  <FormButton
                    theme="formButtonGrey"
                    text="Decline request"
                    onClick={(): void => setShowModal(true)}
                    ariaLabel="decline request"
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
