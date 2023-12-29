import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { GraphQLQuery } from 'aws-amplify/api';
import { signOut } from 'aws-amplify/auth';
import { getAdminPageRequests } from '@/graphql/composite';
import { client } from '@/graphqlClient';
import Spinner from '@/components/Spinner/Spinner';
import Button from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
import Paths from '@/config/paths';
import { GetLocalAuthoritiesQuery, GetJoinRequestsQuery } from '@/types/api';
import JoinRequests from './JoinRequests/JoinRequests';
import ApprovalRequest from './ApprovalRequest/ApprovalRequest';
import dashboardStyles from '../AdminDashboard.module.scss';

const Requests: FC = () => {
  const [stage, setStage] = useState('view_requests');
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['la'],
    queryFn: async () => {
      const { data } = await client.graphql<
        GraphQLQuery<GetLocalAuthoritiesQuery & GetJoinRequestsQuery>
      >({
        query: getAdminPageRequests,
      });

      return data;
    },
  });

  return (
    <div className={dashboardStyles.container}>
      <div className={dashboardStyles.adminCard}>
        <div className={dashboardStyles.header}>
          <h1>Requests to join</h1>
          <Button
            theme="link"
            text="Sign out"
            className={dashboardStyles.actionButtons}
            onClick={(): void => {
              void signOut()
                .then(() => navigate(Paths.LOGIN))
                // eslint-disable-next-line no-console
                .catch(console.error);
            }}
          />
        </div>
      </div>
      <div className={dashboardStyles.body}>
        {isLoading && <Spinner />}
        {!isLoading && stage === 'view_requests' && (
          <>
            <BackButton
              onClick={(): void => navigate(Paths.ADMIN_DASHBOARD_LA_MANAGE)}
              theme="white"
            />
            <Button
              theme="midBlue"
              text="Approve request school"
              onClick={(): void => {
                setStage('request_approval_school');
              }}
            />
            <Button
              theme="midBlue"
              text="Approve request charity"
              onClick={(): void => {
                setStage('request_approval_charity');
              }}
            />
            <JoinRequests setStage={setStage} data={data} />
          </>
        )}
        {!isLoading && stage === 'request_approval_school' && (
          <ApprovalRequest setStage={setStage} type="school" />
        )}
        {!isLoading && stage === 'request_approval_charity' && (
          <ApprovalRequest setStage={setStage} type="charity" />
        )}
      </div>
    </div>
  );
};

export default Requests;
