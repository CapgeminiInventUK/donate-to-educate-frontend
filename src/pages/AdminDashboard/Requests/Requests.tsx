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
import { SchoolOrCharityProperties } from '../AdminDashboard';

const Requests: FC = () => {
  const [stage, setStage] = useState('view_requests');
  const [schoolOrCharityProperties, setSchoolOrCharityProperties] =
    useState<SchoolOrCharityProperties>({
      name: '',
      la: '',
      user: { name: '', title: '', email: '', phone: '' },
    });
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
        <div className={dashboardStyles.body}>
          {isLoading && <Spinner />}
          {!isLoading && stage === 'view_requests' && (
            <>
              <BackButton theme="white" />
              <JoinRequests
                setStage={setStage}
                data={data}
                setSchoolOrCharityProperties={setSchoolOrCharityProperties}
              />
            </>
          )}
          {!isLoading && stage === 'request_approval_school' && (
            <ApprovalRequest
              setStage={setStage}
              type="school"
              name={schoolOrCharityProperties.name}
              la={schoolOrCharityProperties.la}
              user={schoolOrCharityProperties.user}
            />
          )}
          {!isLoading && stage === 'request_approval_charity' && (
            <ApprovalRequest
              setStage={setStage}
              type="charity"
              name={schoolOrCharityProperties.name}
              la={schoolOrCharityProperties.la}
              user={schoolOrCharityProperties.user}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;
