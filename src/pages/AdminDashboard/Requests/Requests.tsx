import BackButton from '@/components/BackButton/BackButton';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Spinner from '@/components/Spinner/Spinner';
import { getAdminPageRequests } from '@/graphql/composite';
import { client } from '@/graphqlClient';
import type { GetJoinRequestsQuery, GetLocalAuthoritiesQuery } from '@/types/api';
import { type SchoolOrCharityProperties, StageState } from '@/types/data';
import { useQuery } from '@tanstack/react-query';
import type { GraphQLQuery } from 'aws-amplify/api';
import { type FC, useState } from 'react';
import ApprovalRequest from '../../../components/ApprovalRequest/ApprovalRequest';
import JoinRequests from '../../../components/JoinRequests/JoinRequests';
import dashboardStyles from '../AdminDashboard.module.scss';

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
    <div className={dashboardStyles.subContainer}>
      <BackButton theme="blue" />
      <div className={dashboardStyles.adminCard}>
        <div className={dashboardStyles.header}>
          <h1>Requests to join</h1>
        </div>
        <div className={dashboardStyles.subBody}>
          {isLoading && <Spinner />}
          {!isLoading && stage === StageState.VIEW && (
            <JoinRequests
              setStage={setStage}
              data={data}
              setSchoolOrCharityProperties={setSchoolOrCharityProperties}
            />
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
