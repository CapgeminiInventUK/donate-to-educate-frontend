import { FC, useEffect, useState } from 'react';
import styles from './ApprovalRequest.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import Phone from '@/assets/admin/Phone';
import ToolTip from '@/assets/admin/ToolTip';
import DeclineDeleteModal from '../DeclineDeleteModal/DeclineDeleteModal';
import ResultBanner from './ResultBanner/ResultBanner';
import FormButton from '@/components/FormButton/FormButton';
import { Pill } from '@/components/Pill/Pill';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from '@aws-amplify/api-graphql';
import {
  DeleteDeniedJoinRequestMutation,
  GetSchoolQuery,
  UpdateJoinRequestMutation,
} from '@/types/api';
import { deleteDeniedJoinRequest, updateJoinRequest } from '@/graphql/mutations';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import { getSchool } from '@/graphql/queries';
import Spinner from '@/components/Spinner/Spinner';
import Globe from '@/assets/tiles/Globe';
import { ApprovalRequestProps } from '@/types/props';
import { StageState, myStageType } from '@/types/data';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';

const ApprovalRequest: FC<ApprovalRequestProps> = ({
  setStage,
  name,
  type,
  la,
  user,
  charity,
  id,
  urn,
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [myStage, setMyStage] = useState<myStageType>('deciding');

  const { refetch, isError } = useQuery({
    queryKey: [`updateProfile-${id}-${la}-${user.name}-${myStage}`],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<UpdateJoinRequestMutation>>({
        query: updateJoinRequest,
        variables: {
          id,
          localAuthority: la,
          name: user.name,
          status: myStage === 'approved' ? 'APPROVED' : 'DENIED',
        },
      });

      return result;
    },
  });

  const {
    isLoading,
    data,
    isError: isErrorSchool,
  } = useQuery({
    queryKey: [`school-details-${name}-${urn}`],
    enabled: type === 'school',
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetSchoolQuery>>({
        query: getSchool,
        variables: {
          name: name.split('-')[0].trim(),
          urn,
        },
      });

      return data;
    },
  });

  const { refetch: deleteProfile, isError: isErrorDelete } = useQuery({
    queryKey: [`deleteProfile-${user.name}`],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<DeleteDeniedJoinRequestMutation>>({
        query: deleteDeniedJoinRequest,
        variables: {
          id,
        },
      });

      return result;
    },
  });

  useEffect(() => {
    if (myStage === 'approved') {
      void refetch().then(() => navigate(0));
    }
    if (myStage === 'denied') {
      void deleteProfile().then(() => navigate(Paths.DELETE_CONFIRMATION));
    }
  }, [myStage, refetch, deleteProfile, navigate]);

  if (isLoading && type === 'school') {
    return <Spinner />;
  }

  if (isError || isErrorDelete || isErrorSchool) {
    return <ErrorBanner />;
  }

  return (
    <>
      <BackButton onClick={(): void => setStage(StageState.VIEW)} theme="blue" />
      <div className={styles.card}>
        <>
          <Pill
            color={type == 'school' ? 'blue' : 'lightBlue'}
            text={type == 'school' ? 'SCHOOL' : 'CHARITY OR VOLUNTEER GROUP'}
          />
          {type === 'school' && (
            <>
              <h1>{data?.getSchool.name}</h1>
              <div className={styles.contactInfo}>
                <Phone />
                <div>{data?.getSchool.phone}</div>
              </div>
              <div className={styles.contactInfo}>
                <Globe />
                <div>{data?.getSchool.website}</div>
              </div>
              <div className={styles.detailsCard}>
                <p>{data?.getSchool.street}</p>
                <p>{data?.getSchool.locality}</p>
                <p>{data?.getSchool.address3}</p>
                <p>{data?.getSchool.town}</p>
                <p>{data?.getSchool.county}</p>
                <p>{data?.getSchool.postcode}</p>
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
              <DeclineDeleteModal
                setShowModal={setShowModal}
                showModal={showModal}
                onConfirm={() => setMyStage('denied')}
                bodyText=" If you cannot identify this connection or confirm they are connected to the school, you
                may decline them."
                confirmText="Decline request"
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
              <DeclineDeleteModal
                setShowModal={setShowModal}
                showModal={showModal}
                onConfirm={() => setMyStage('denied')}
                bodyText=" If you cannot identify this connection or confirm they are connected to the school, you
                may decline them."
                confirmText="Decline request"
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
