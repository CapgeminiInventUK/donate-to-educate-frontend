import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GraphQLQuery } from 'aws-amplify/api';
import { getAdminPageRequests } from '@/graphql/composite';
import { client } from '@/graphqlClient';
import Spinner from '@/components/Spinner/Spinner';
import BackButton from '@/components/BackButton/BackButton';
import { GetLocalAuthoritiesQuery, GetJoinRequestsQuery } from '@/types/api';
import JoinRequests from '../../../components/JoinRequests/JoinRequests';
import ApprovalRequest from '../../../components/ApprovalRequest/ApprovalRequest';
import dashboardStyles from '../AdminDashboard.module.scss';
import { SchoolOrCharityProperties, StageState } from '@/types/data';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import LogoutButton from '@/components/LogoutButton/LogoutButton';

const Requests: FC = () => {
  const [stage, setStage] = useState<StageState>(StageState.VIEW);
  const [schoolOrCharityProperties, setSchoolOrCharityProperties] =
    useState<SchoolOrCharityProperties>({
      id: '',
      name: '',
      la: '',
      user: { name: '', title: '', email: '', phone: '' },
    });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['getJoinRequests'],
    queryFn: async () => {
      const { data } = await client.graphql<
        GraphQLQuery<GetLocalAuthoritiesQuery & GetJoinRequestsQuery>
      >({
        query: getAdminPageRequests,
      });

      return data;
    },
  });

  if (isError) {
    return <ErrorBanner />;
  }

  return (
    <div className={dashboardStyles.container}>
      <BackButton theme="blue" />
      <div className={dashboardStyles.adminCard}>
        <div className={dashboardStyles.header}>
          <h1>Requests to join</h1>
          <LogoutButton />
        </div>
        <div className={dashboardStyles.body}>
          {isLoading && <Spinner />}
          {!isLoading && stage === StageState.VIEW && (
            <>
              <BackButton theme="white" />
              <JoinRequests
                setStage={setStage}
                data={data}
                setSchoolOrCharityProperties={setSchoolOrCharityProperties}
              />
            </>
          )}
          {!isLoading && stage === StageState.APPROVE_SCHOOL && (
            <ApprovalRequest
              id={schoolOrCharityProperties.id}
              setStage={setStage}
              type="school"
              name={schoolOrCharityProperties.name}
              la={schoolOrCharityProperties.la}
              user={schoolOrCharityProperties.user}
              urn={schoolOrCharityProperties.urn}
            />
          )}
          {!isLoading && stage === StageState.APPROVE_CHARITY && (
            <ApprovalRequest
              id={schoolOrCharityProperties.id}
              setStage={setStage}
              type="charity"
              name={schoolOrCharityProperties.name}
              la={schoolOrCharityProperties.la}
              user={schoolOrCharityProperties.user}
              charity={schoolOrCharityProperties.charity}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;
