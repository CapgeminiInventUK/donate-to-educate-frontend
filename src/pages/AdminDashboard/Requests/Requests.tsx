import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import Spinner from '@/components/Spinner/Spinner';
import BackButton from '@/components/BackButton/BackButton';
import { GetJoinRequestsQuery } from '@/types/api';
import JoinRequests from '@/components/JoinRequests/JoinRequests';
import ApprovalRequest from '@/components/ApprovalRequest/ApprovalRequest';
import dashboardStyles from '../AdminDashboard.module.scss';
import { InstitutionType, SchoolOrCharityProperties, StageState } from '@/types/data';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import { getJoinRequests } from '@/graphql/queries';

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
      const { data } = await client.graphql<GraphQLQuery<GetJoinRequestsQuery>>({
        query: getJoinRequests,
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
          <h1>Requests</h1>
        </div>
        <div className={dashboardStyles.subBody}>
          {isLoading ? (
            <Spinner />
          ) : stage === StageState.VIEW ? (
            <JoinRequests
              setStage={setStage}
              data={data}
              setSchoolOrCharityProperties={setSchoolOrCharityProperties}
            />
          ) : stage === StageState.APPROVE_SCHOOL ? (
            <ApprovalRequest
              id={schoolOrCharityProperties.id}
              setStage={setStage}
              type={InstitutionType.SCHOOL}
              name={schoolOrCharityProperties.name}
              la={schoolOrCharityProperties.la}
              user={schoolOrCharityProperties.user}
              urn={schoolOrCharityProperties.urn}
            />
          ) : (
            stage === StageState.APPROVE_CHARITY && (
              <ApprovalRequest
                id={schoolOrCharityProperties.id}
                setStage={setStage}
                type={InstitutionType.CHARITY}
                name={schoolOrCharityProperties.name}
                la={schoolOrCharityProperties.la}
                user={schoolOrCharityProperties.user}
                charity={schoolOrCharityProperties.charity}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;
