import BackButton from '@/components/BackButton/BackButton';
import Card from '@/components/Card/Card';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import { Pill } from '@/components/Pill/Pill';
import Spinner from '@/components/Spinner/Spinner';
import Paths from '@/config/paths';
import { deleteDeniedJoinRequest, updateJoinRequest } from '@/graphql/mutations';
import { getSchool } from '@/graphql/queries';
import { client } from '@/graphqlClient';
import type {
  DeleteDeniedJoinRequestMutation,
  GetSchoolQuery,
  UpdateJoinRequestMutation,
} from '@/types/api';
import { PillColours, StageState, type myStageType } from '@/types/data';
import type { ApprovalRequestProps } from '@/types/props';
import type { GraphQLQuery } from '@aws-amplify/api-graphql';
import { useQuery } from '@tanstack/react-query';
import { type FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ApprovalRequest.module.scss';
import ResultBanner from './ResultBanner/ResultBanner';
import SchoolDetails from './SchoolDetails/SchoolDetails';
import UserRequestDetails from './UserRequestDetails/UserRequestDetails';

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
      <Card className={styles.approvalRequestCard}>
        <>
          <Pill
            colour={type == 'school' ? PillColours.BLUE : PillColours.LIGHTBLUE}
            text={type == 'school' ? 'SCHOOL' : 'CHARITY OR VOLUNTEER GROUP'}
          />
          {type === 'school' && data !== undefined && <SchoolDetails data={data} />}
          {type === 'charity' && <h1>{name}</h1>}
          <hr />
          {myStage === 'deciding' && (
            <UserRequestDetails
              type={type}
              user={user}
              setMyStage={setMyStage}
              charity={charity}
              charityName={name}
              la={la}
            />
          )}
        </>
        {myStage === 'approved' && <ResultBanner name={user.name} type="approved" />}
      </Card>
    </>
  );
};

export default ApprovalRequest;
